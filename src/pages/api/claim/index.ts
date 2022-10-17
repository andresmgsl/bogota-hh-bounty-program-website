/* eslint-disable indent */
import { AnchorProvider, Wallet } from '@heavy-duty/anchor';
import {
    bundlrStorage,
    keypairIdentity,
    Metaplex,
} from '@metaplex-foundation/js';
import { createSetAndVerifyCollectionInstruction } from '@metaplex-foundation/mpl-token-metadata';
import {
    clusterApiUrl,
    Connection,
    Keypair,
    PublicKey,
    Transaction,
} from '@solana/web3.js';
import { getBountyChallenges } from 'lib/bounties';
import { authenticateGithubApp, getCurrentUser } from 'lib/github';
import { NextApiHandler } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getNftDescription } from 'utils/bountyChallenge';

const DRILL_CLAIM_LABEL = 'claim';

// POST /api/claim
const handler: NextApiHandler = async (req, res) => {
    const session = await unstable_getServerSession(req, res, authOptions);

    const data = JSON.parse(req.body);
    const userVault = new PublicKey(data.userVault);
    const accessToken = session?.accessToken as string;
    const user = await getCurrentUser(accessToken);

    if (!user) {
        return { notFound: true };
    }

    const allBounties = await getBountyChallenges(accessToken);

    const participantsMap = allBounties.reduce((participantsMap, bounty) => ({
        ...participantsMap,
        [bounty.owner]: (participantsMap[bounty.owner] ?? 0) + bounty.reward
    }), {})

    const leaderBoard = Object.keys(participantsMap).map(participant => ({
        id: participant,
        points: participantsMap[participant]
    })).sort((a , b) => b.points - a.points);

    const participantIndex = leaderBoard.findIndex(({ id }) =>  id === user.login);

    if (participantIndex === -1) {
        return res.status(400).json({ message: 'Participant not found' });
    }

    const participant = leaderBoard[participantIndex];
    const rank = participantIndex + 1;
    const points = participant.points;

    const description = getNftDescription();
    const keypair = Keypair.fromSecretKey(
        new Uint8Array(Buffer.from(process.env.CERTIFIER_SECRET, 'base64')),
    );
    const connection = new Connection(clusterApiUrl('mainnet-beta'));
    const provider = new AnchorProvider(
        connection,
        new Wallet(keypair),
        AnchorProvider.defaultOptions(),
    );

    const metaplex = new Metaplex(connection)
        .use(keypairIdentity(keypair))
        .use(bundlrStorage());

    switch (req.method) {
        case 'POST': {
            const githuRestApi = await authenticateGithubApp();

            const issues = await githuRestApi.issues.listForRepo({
                owner: process.env.GITHUB_OWNER,
                repo: process.env.GITHUB_REPO,
                labels: `${user.login},${DRILL_CLAIM_LABEL}`,
            });

            let issue = issues.data[0];

            if (issue !== undefined) {
                return res.status(201).json({ ok: true });
            }

            issue = (
                await githuRestApi.issues.create({
                    owner: process.env.GITHUB_OWNER,
                    repo: process.env.GITHUB_REPO,
                    title: user.login + ' claim',
                    body: `${user.login} bounty claim.`,
                    labels: [DRILL_CLAIM_LABEL, user.login, 'claim:processing'],
                })
            ).data;

            try {
                const name = 'Bogotá Dev Challenge';

                const { uri } = await metaplex.nfts().uploadMetadata({
                    name,
                    description,
                    image: process.env.COLLECTION_IMAGE_URL,
                    external_url: 'https://heavyduty.builders',
                    symbol: 'DEV',
                    attributes: [
                        {
                            trait_type: 'Challenger',
                            value: user.login,
                        },
                        {
                            trait_type: 'Rank',
                            value: `#${rank}`,
                        },
                        {
                            trait_type: 'Points',
                            value: points.toString(),
                        },
                        {
                            trait_type: 'Location',
                            value: 'Bogotá, Colombia',
                        },
                        {
                            trait_type: 'Date',
                            value: 'OCT 4-8 2022',
                        },
                        {
                            trait_type: 'Made By',
                            value: 'Heavy Duty Builders',
                        },
                        {
                            trait_type: 'Powered By',
                            value: 'Solana University',
                        },
                    ],
                });

                const { nft } = await metaplex.nfts().create({
                    name,
                    sellerFeeBasisPoints: 0,
                    uri,
                    collection: new PublicKey(process.env.COLLECTION_MINT),
                    tokenOwner: userVault,
                });

                await provider.sendAndConfirm(
                    new Transaction().add(
                        createSetAndVerifyCollectionInstruction({
                            collectionMint: new PublicKey(
                                process.env.COLLECTION_MINT,
                            ),
                            collection: new PublicKey(
                                process.env.COLLECTION_METADATA,
                            ),
                            collectionAuthority: provider.wallet.publicKey,
                            collectionMasterEditionAccount: new PublicKey(
                                process.env.COLLECTION_MASTER_EDITION,
                            ),
                            metadata: nft.metadataAddress,
                            payer: provider.wallet.publicKey,
                            updateAuthority: provider.wallet.publicKey,
                        }),
                    ),
                );
            } catch (error) {
                await githuRestApi.issues.setLabels({
                    owner: process.env.GITHUB_OWNER,
                    repo: process.env.GITHUB_REPO,
                    issue_number: issue.number,
                    labels: [DRILL_CLAIM_LABEL, user.login, 'claim:failed'],
                });

                return res.status(500).json({ ok: false });
            }

            await githuRestApi.issues.setLabels({
                owner: process.env.GITHUB_OWNER,
                repo: process.env.GITHUB_REPO,
                issue_number: issue.number,
                labels: [DRILL_CLAIM_LABEL, user.login, 'claim:done'],
            });

            return res.status(200).json({ ok: true });
        }
    }
};

export default handler;
