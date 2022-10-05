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

type LeaderboardPageProps = { bounties: BountyChallenge[] };

const LeaderboardPage: NextPage<LeaderboardPageProps> = ({ bounties }) => {
    const closedBounties = useMemo(
        () =>
            bounties.filter(
                ({ state, tags }) =>
                    state === 'closed' ||
                    tags.includes({ value: DRILL_BOUNTY_CLOSED_LABEL }),
            ),
        [bounties],
    );

    const openBounties = useMemo(
        () =>
            bounties.filter(
                ({ state, tags }) =>
                    state === 'open' ||
                    tags.includes({ value: DRILL_BOUNTY_ENABLED_LABEL }),
            ),
        [bounties],
    );

    const tabs = useMemo(
        () => [
            {
                content: (
                    <BountyLeaderboardList bounties={openBounties} key="open-bounties" />
                ),
                id: 'open',
                label: 'Open',
                amount: openBounties.length,
            },
            {
                content: (
                    <BountyLeaderboardList
                        bounties={closedBounties}
                        key="closed-bounties"
                    />
                ),
                id: 'closed',
                label: 'Closed',
                amount: closedBounties.length,
            },
        ],
        [closedBounties, openBounties],
    );

    const router = useRouter();
    const currentTabId = (router.query.tab as string) || tabs[0].id;

    const currentTab = useMemo(
        () => tabs.find(tab => tab.id === currentTabId),
        [currentTabId, tabs],
    );

    const { data: session } = useSession();

    return (
        <>
            <NextSeo
                title="Leaderboard"
                description="Explore and contribute to bounties that interest you and get paid for your work"
            ></NextSeo>
            <div className="flex flex-col gap-12 pt-14">
                {/* <FeaturedSection bounties={openBounties.slice(0, 5)} /> */}
                <div className="flex flex-col gap-0">
                    <Text variant="sub-heading" className="text-center"> Bogota, Colombia </Text>
                    <div className="flex w-full flex-col gap-2 px-5 sm:px-8 md:px-16 lg:px-32 xl:px-48">
                        <Text variant="big-heading" className="text-center text-transparent text-8xl bg-clip-text bg-gradient-to-tl from-[#ef3c11] via-[#fdb735] to-[#ffeb3a]">
                                Leaderboard{' '}
                        </Text>

                        <div className="mt-6">
                            {currentTab.content}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeaderboardPage;

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
