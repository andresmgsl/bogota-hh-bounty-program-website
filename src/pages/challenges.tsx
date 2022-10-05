console.log(`LEADERBOARD..`);
import {
    DRILL_BOUNTY_CLOSED_LABEL,
    DRILL_BOUNTY_ENABLED_LABEL,
    DRILL_BOUNTY_CHALLENGE_LABEL,
    DRILL_BOUNTY_POINTS_LABEL,
} from 'lib/github';
import { GetServerSideProps, NextPage } from 'next';

import { Bounty, BountyChallenge } from 'types/bounty';
import BountyLeaderboardList from 'components/common/bounty-leaderboard-list';
import Button from 'components/common/button';
import FeaturedSection from 'components/explorer-page/featured-section';
import Link from 'next/link';
import { MdAdd } from 'react-icons/md';
import NavElement from 'components/common/layout/header/nav-element';
import { NextSeo } from 'next-seo';
import Text from 'components/common/text';
import { authOptions } from './api/auth/[...nextauth]';
import { getBountyChallenges } from 'lib/bounties';
import { unstable_getServerSession } from 'next-auth';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { mockBounties } from 'mocks/bounties';

import ChallengesSection from 'components/challenges-page/challenges-section';

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
    console.log(`getServerSideProps..Leaderboard`);
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
