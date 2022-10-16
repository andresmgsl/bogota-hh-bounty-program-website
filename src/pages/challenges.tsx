import ChallengesSection from 'components/challenges-page/challenges-section';
import { getBountyChallenges } from 'lib/bounties';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { BountyChallenge } from 'types/bounty';
import { useMemo } from 'react';

import { authOptions } from './api/auth/[...nextauth]';
import { mockChallenges } from 'mocks/challenges';

type ChallengesPageProps = { bounties: BountyChallenge[] };

const ChallengesPage: NextPage<ChallengesPageProps> = ({ bounties: challenges }) => {

    const openChallenges = useMemo(
        () =>
            challenges,
        [challenges],
    );

    console.log(`number of challenges: `, challenges.length);
    
const { data: session } = useSession();

    return (
        <>
            <NextSeo
                title="Solana Bounty Challenges"
                description="Complete the Solana bounty challenges to collect Solana rewards!">
            </NextSeo>

            <ChallengesSection challenges={openChallenges}/>
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

    // const accessToken = session?.accessToken as string;
    // const bounties = await getBountyChallenges(accessToken);

    const bounties = mockChallenges;

    return { props: { bounties } };
};
