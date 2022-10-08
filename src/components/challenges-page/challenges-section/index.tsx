import Button from 'components/common/button';
import Card from 'components/common/card';
import Text from 'components/common/text';
import Link from 'next/link';
import { BiRocket } from 'react-icons/bi';
import { MdPlayArrow } from 'react-icons/md';
// import { FiTwitter } from 'react-icons/fi';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { TbArrowsLeftRight } from 'react-icons/tb';

const ChallengesSection = () => (
    <section
        className="flex w-full flex-row flex-wrap gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
        <Card className="flex flex-1 flex-col justify-between gap-10 p-12">
            <div className="flex max-w-xl flex-col gap-5">
                <FaTwitter size={35} />

                <div className="flex flex-col gap-1">
                    <Text variant="label" className="text-secondary"> Social Challenge </Text>
                    <Text variant="big-heading">Challenge 1</Text>
                    <Text variant="sub-heading">Reward: 25 points + NFT</Text>
                </div>
                <Text variant="paragraph">
                    Join our community and be part of Heavy Duty Builders and Solana University.
                </Text>
                
                <Text variant="paragraph"  className="text-primary font text-xl"> Difficulty: Easy </Text>

                <div className="flex flex-row gap-4 absolute bottom-12">
                    <Text variant="paragraph" className="text-white"> Author: </Text>
                    <Link href="https://twitter.com/HeavyDutyBuild" passHref >
                        <a className="flex flex-row justify-end" target="_blank" rel="noopener noreferrer">
                            <FaTwitter size={24} />
                        </a>
                    </Link>

                    <Link href="https://github.com/heavy-duty/platform" passHref>
                        <a className="flex flex-row justify-end"  target="_blank" rel="noopener noreferrer">
                            <FaGithub size={24} />
                        </a>
                    </Link>
                </div>                
            </div>
            <Link href="/challenges/social-challenge" passHref>
                <a className="flex flex-row justify-end">
                    <Button className='w-20 h-20 rounded-full border-2' variant="transparent" >
                        <MdPlayArrow size={40} />
                    </Button>
                </a>
            </Link>
        </Card>
        <Card className="flex flex-1 flex-col justify-between gap-10 p-12">
            <div className="flex max-w-xl flex-col gap-5">
                <BiRocket size={35} />
                <div className="flex flex-col gap-1">
                    <Text variant="label" className="text-secondary"> Deploy Challenge </Text>
                    <Text variant="big-heading">Challenge 2</Text>
                    <Text variant="sub-heading">Reward: 100 points + NFT</Text>
                </div>
                <Text variant="paragraph">
                    Publish your first smart contract in minutes with Solana Playground!
                </Text>
                <Text variant="paragraph" className="text-primary font text-xl"> Difficulty: Easy </Text>
                <div className="flex flex-row gap-4 absolute bottom-12">
                    <Text variant="paragraph" className="text-white"> Author: </Text>
                    <Link href="https://twitter.com/DonnySolana" passHref >
                        <a className="flex flex-row justify-end" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="" size={24} />
                        </a>
                    </Link>

                    <Link href="https://github.com/DonnySolana" passHref>
                        <a className="flex flex-row justify-end"  target="_blank" rel="noopener noreferrer">
                            <FaGithub size={24} />
                        </a>
                    </Link>
                </div>
            </div>
            <Link href="/challenges/deploy-challenge" passHref>
                <a className="flex flex-row justify-end">
                    <Button className='w-20 h-20 rounded-full border-2' variant="transparent" >
                        <MdPlayArrow size={40} />
                    </Button>
                </a>
            </Link>
        </Card>
        <Card className="flex flex-1 flex-col justify-between gap-10 p-12">
            <div className="flex max-w-xl flex-col gap-5">
                <TbArrowsLeftRight size={35} />
                <div className="flex flex-col gap-1">
                    <Text variant="label" className="text-secondary"> Video Challenge</Text>
                    <Text variant="big-heading">Challenge 3</Text>
                    <Text variant="sub-heading">Reward: 150 points</Text>
                </div>
                <Text variant="paragraph">
                    Learn how to use the new transaction format with Versioned Transactions.
                </Text>
                <Text variant="paragraph" className="text-primary font text-xl"> Difficulty: Easy </Text>
                <div className="flex flex-row gap-4 absolute bottom-12">
                    <Text variant="paragraph" className="text-white"> Author: </Text>
                    <Link href="https://twitter.com/realbuffalojoe" passHref >
                        <a className="flex flex-row justify-end" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="" size={24} />
                        </a>
                    </Link>

                    <Link href="https://github.com/realbuffalojoe" passHref>
                        <a className="flex flex-row justify-end"  target="_blank" rel="noopener noreferrer">
                            <FaGithub size={24} />
                        </a>
                    </Link>
                </div>
            </div>
            <Link href="/challenges/versioned-transactions-challenge" passHref>
                <a className="flex flex-row justify-end">
                    <Button className='w-20 h-20 rounded-full border-2' variant="transparent" >
                        <MdPlayArrow size={40} />
                    </Button>
                </a>
            </Link>
        </Card>

    </section>
);

export default ChallengesSection;
