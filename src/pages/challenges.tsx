import ChallengesSection from 'components/challenges-page/challenges-section';
import { getBountyChallenges } from 'lib/bounties';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { BountyChallenge } from 'types/bounty';

import { authOptions } from './api/auth/[...nextauth]';

type ChallengesPageProps = { bounties: BountyChallenge[] };

const ChallengesPage: NextPage<ChallengesPageProps> = ({ bounties }) => {

const { data: session } = useSession();

    return (
        <>
            <NextSeo
                title="Solana Bounty Challenges"
                description="Complete the Solana bounty challenges to collect Solana rewards!">
            </NextSeo>

            <ChallengesSection />
        </>
    );
};

export default ChallengesPage;

export const getServerSideProps: GetServerSideProps = async context => {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions,
    );

    const accessToken = session?.accessToken as string;

    const bounties = await getBountyChallenges(accessToken);
    // const bounties = mockBounties;

    return { props: { bounties } };
};
