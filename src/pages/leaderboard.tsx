import BountyLeaderboardList from 'components/common/bounty-leaderboard-list';
import Text from 'components/common/text';
import { getBountyChallenges } from 'lib/bounties';
import { DRILL_BOUNTY_CLOSED_LABEL, DRILL_BOUNTY_ENABLED_LABEL } from 'lib/github';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { BountyChallenge } from 'types/bounty';

import { authOptions } from './api/auth/[...nextauth]';

type LeaderboardPageProps = { bounties: BountyChallenge[] };

const LeaderboardPage: NextPage<LeaderboardPageProps> = ({ bounties }) => {
    console.log("EPA", bounties)
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
