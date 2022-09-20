import {
    DRILL_BOUNTY_CLOSED_LABEL,
    DRILL_BOUNTY_ENABLED_LABEL,
} from 'lib/github';
import { GetServerSideProps, NextPage } from 'next';

import { Bounty } from 'types/bounty';
import BountyList from 'components/common/bounty-list';
import Button from 'components/common/button';
import FeaturedSection from 'components/explorer-page/featured-section';
import Link from 'next/link';
import { MdAdd } from 'react-icons/md';
import NavElement from 'components/common/layout/header/nav-element';
import { NextSeo } from 'next-seo';
import Text from 'components/common/text';
import { authOptions } from './api/auth/[...nextauth]';
import { getBounties } from 'lib/bounties';
import { unstable_getServerSession } from 'next-auth';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

type ExplorerPageProps = { bounties: Bounty[] };

const ExplorerPage: NextPage<ExplorerPageProps> = ({ bounties }) => {
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
                    <BountyList bounties={openBounties} key="open-bounties" />
                ),
                id: 'open',
                label: 'Open',
                amount: openBounties.length,
            },
            {
                content: (
                    <BountyList
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
                title="Explorer"
                description="Explore and contribute to bounties that interest you and get paid for your work"
            ></NextSeo>
            <div className="flex flex-col gap-12 pt-14">
                {/* <FeaturedSection bounties={openBounties.slice(0, 5)} /> */}
                <div className="flex flex-col gap-0">
                    <div className="flex w-full flex-col gap-7 px-5 sm:px-8 md:px-16 lg:px-32 xl:px-48">
                        <Text variant="label"> Browse </Text>
                        <div className="flex flex-row flex-wrap items-center justify-between gap-2">
                            <Text variant="big-heading">
                                Hacker House Bounties{' '}
                            </Text>
                            {/* <div
                                className={!session && 'tooltip'}
                                data-tip="Sign in to create bounties"
                            >
                                <Link href="/explorer/new" passHref>
                                    <a>
                                        <Button
                                            variant="orange"
                                            text="Create new"
                                            icon={MdAdd}
                                            reversed={true}
                                            disabled={!session}
                                        />
                                    </a>
                                </Link>
                            </div> */}
                        </div>

                        <div className="sticky top-20 z-30 -mt-px flex h-16 flex-row gap-8 border-b-1.5 border-b-line bg-neutral bg-opacity-40 pt-4 backdrop-blur-xl">
                            {tabs.map((tab, index) => (
                                <NavElement
                                    as={index === 0 && `/explorer`}
                                    href={`/explorer?tab=${tab.id}`}
                                    key={tab.id}
                                    label={tab.label}
                                    chipLabel={tab.amount.toString()}
                                    scroll={false}
                                />
                            ))}
                        </div>

                        {currentTab.content}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExplorerPage;

export const getServerSideProps: GetServerSideProps = async context => {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions,
    );

    const accessToken = session?.accessToken as string;

    const bounties = await getBounties(accessToken);

    return { props: { bounties } };
};
