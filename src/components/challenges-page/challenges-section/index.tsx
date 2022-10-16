import Button from 'components/common/button';
import Card from 'components/common/card';
import Text from 'components/common/text';
import Link from 'next/link';
import { BiRocket, BiVideoPlus } from 'react-icons/bi';
import { MdPlayArrow } from 'react-icons/md';
// import { FiTwitter } from 'react-icons/fi';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { TbArrowsLeftRight } from 'react-icons/tb';
import { AiOutlineDatabase } from 'react-icons/ai';

import { Bounty } from 'types/bounty';
type ChallengeListProps = { challenges: Bounty[] };

const ChallengesSection = ({ challenges: initialChallenges }: ChallengeListProps) => {

    const getIcon = (key, sz) => {
        switch (key) {
        case 1:
            return <FaTwitter size={sz}/>
        case 2:
            return <FaGithub size={sz}/>
        case 3:
            return <BiRocket size={sz} />
        case 4:
            return <BiVideoPlus size={sz} />
        case 5:
            return <TbArrowsLeftRight size={sz} />
        case 6:
            return <AiOutlineDatabase size={sz} />
        case 7:
            return <BiRocket size={sz} />
        default:
            return <BiRocket size={sz} /> // or return null if you don't have it
        }
    }

    return (
        <section className="flex w-full flex-row flex-wrap gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
            {initialChallenges.length ? (
                initialChallenges.map(challenge => (

                    // TODO: create challlenge card component
                    <Card key={challenge.key} className="flex flex-1 flex-col min-w-fit justify-between gap-10 p-12">
                        <div className="flex flex-col gap-5 ">

                            {/* Icon Key and Size */}
                            { getIcon(challenge.iconKey, challenge.iconSize) }

                            <div className="flex flex-col gap-1">
                                <Text variant="label" className="text-secondary">
                                    {' '}
                                    {challenge.type }{' '}
                                </Text>
                                {/* <Text variant="big-heading">Challenge {challenge.id}</Text> */}
                                <Text className="min-w-fit" variant="big-heading">{challenge.title}</Text>
                                <Text variant="sub-heading">Reward: {challenge.rewardValue} {challenge.rewardType}</Text>
                                {/* <Text variant="sub-heading">Reward: 25 points + NFT: {challenge.rewardValue} {challenge.rewardType}</Text> */}
                            </div>
                            <Text variant="paragraph">
                                {challenge.description}
                                {/* Join our community and be part of Heavy Duty Builders and
                                Solana University. */}
                            </Text>

                            <Text variant="paragraph" className="font text-xl text-primary">
                                {' '}
                                Difficulty: {challenge.difficulty} {' '}
                            </Text>

                            <div className="absolute bottom-12 flex flex-row gap-4">
                                <Text variant="paragraph" className="text-white">
                                    {' '}
                                    Author:{' '}
                                </Text>
                                <Link href={`https://twitter.com/${challenge.authorTwitter}`}
                                    passHref
                                >
                                    <a
                                        className="flex flex-row justify-end"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        { getIcon(1, 24) }
                                        {/* <FaTwitter size={24} /> */}
                                    </a>
                                </Link>

                                <Link
                                    href={`https://github.com/${challenge.authorGithub}`}
                                    passHref
                                >
                                    <a
                                        className="flex flex-row justify-end"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        { getIcon(2, 24) }
                                        {/* <FaGithub size={24} /> */}
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <Link href={`${challenge.challengeURL}`}
                            passHref>
                            <a className="flex flex-row justify-end">
                                <Button
                                    className="h-20 w-20 rounded-full border-2"
                                    variant="transparent"
                                >
                                    <MdPlayArrow size={40} />
                                </Button>
                            </a>
                        </Link>
                    </Card>
                ))
            ) : (
                <div className="flex h-20 items-center justify-center">
                    <p className="text-secondary">No results found.</p>
                </div>
            )}
        </section>
    );
};

export default ChallengesSection;
