import { ChangeEvent, useState } from 'react';

import { Bounty } from 'types/bounty';
import BountyCard from 'components/explorer-page/bounty-card';
import FilterMenu from 'components/common/filter-section';
import Text from '../text';
import { filterBounties } from 'utils/bounties';

type BountyListProps = { bounties: Bounty[] };

const BountyList = ({ bounties: initialBounties }: BountyListProps) => {
    const [filterData, setFilterData] = useState({
        bounties: initialBounties,
        query: '',
    });

    let bounties = filterData.bounties;

    bounties = filterData.bounties.sort(rank_ascending);

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        const filteredBounties = initialBounties?.filter(bounty =>
            filterBounties(bounty, query),
        );
        setFilterData({ bounties: filteredBounties, query });
    };
    function rank_ascending(a, b) {
        return a.id < b.id ? -1 : (a.id < b.id ? 1 : 0);
    }
    return (
        <div className="flex flex-col gap-4">
            <FilterMenu onSearchInputChange={onSearchInputChange} />
            <div className="sticky top-36 z-30 hidden flex-row justify-between gap-5 bg-neutral bg-opacity-40 px-6 py-3 text-base-content backdrop-blur-xl 2lg:flex">
                <Text variant="label" className="w-full">
                    Basics
                </Text>
                <div className="flex w-full justify-between">
                    <Text variant="label">Participants</Text>
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

export default BountyList;
