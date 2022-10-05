import { ChangeEvent, useState } from 'react';

import { Bounty, BountyChallenge } from 'types/bounty';
import BountyCard from 'components/explorer-leaderboard-page/bounty-card';
// import FilterMenu from 'components/common/filter-section';
import Text from '../text';
import { filterBounties } from 'utils/bounties';

type BountyLeaderboardListProps = { bounties: BountyChallenge[] };

const BountyLeaderboardList = ({ bounties: initialBounties }: BountyLeaderboardListProps) => {
    const [filterData, setFilterData] = useState({
        bounties: initialBounties,
        query: '',
    });

    let bounties = filterData.bounties;

    bounties = bounties.filter(x => x.labels.some(z => z.name == 'challenge'));
    bounties = bounties.filter(x => x.labels.some(z => z.name == 'completed'));

    const totals = [];
    bounties.forEach(x => {
        const obj = totals.find(o => o.hunter === x.hunter);
        if (obj) {
            obj.total = obj.total + x.reward;
        } else {
            x.total = x.reward;
            totals.push(x);
        }
    });

    bounties = totals.sort(total_ascending);

    let index = 1;
    bounties.forEach(item => {
        item.rank = index++;
    });

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        const filteredBounties = initialBounties?.filter(bounty =>
            filterBounties(bounty, query),
        );
        setFilterData({ bounties: filteredBounties, query });
    };

    function total_ascending(a, b) {
        return a.total > b.total ? -1 : (a.total > b.total ? 1 : 0);
    }
    return (
        <div className="flex flex-col gap-4">
            {/* <FilterMenu onSearchInputChange={onSearchInputChange} /> */}
            <div className="sticky top-36 z-30 hidden flex-row justify-between gap-5 bg-neutral bg-opacity-40 px-6 py-3 text-base-content backdrop-blur-xl 2lg:flex">
                <div className="flex w-full justify-start text-amber-400">
                    <Text variant="heading">Rank</Text>
                </div>
                <div className="flex w-full justify-start text-amber-400">
                    <Text variant="heading">Player</Text>
                </div>
                <div className="flex w-full justify-end mr-2 text-amber-400">
                    <Text variant="heading">Total</Text>
                </div>
            </div>
            <div className="flex flex-col gap-6">
                {bounties.length ? (
                    bounties.map(bounty => (
                        <BountyCard key={bounty.id} {...bounty} />
                    ))
                ) : (
                    <div className="flex h-20 items-center justify-center">
                        <p className="text-secondary">No results found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BountyLeaderboardList;
