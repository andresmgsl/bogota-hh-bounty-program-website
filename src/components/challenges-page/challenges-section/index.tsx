import Button from 'components/common/button';
import Card from 'components/common/card';
import Text from 'components/common/text';
import Link from 'next/link';
import { BiRocket } from 'react-icons/bi';
import { MdPlayArrow } from 'react-icons/md';

const ChallengesSection = () => (
    <section
        className="flex w-full flex-row flex-wrap gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
        <Card className="flex flex-1 flex-col justify-between gap-10 p-12">
            <div className="flex max-w-xl flex-col gap-5">
                <BiRocket size={35} />
                <div className="flex flex-col gap-1">
                    <Text variant="label" className="text-secondary"> Deploy Challenge </Text>
                    <Text variant="big-heading">Challenge 1</Text>
                    <Text variant="sub-heading">Reward: 50 points + NFT</Text>
                </div>
                <Text variant="paragraph">
                    Learn the basics: Solana 101 is a quick overview on the cheapest and fastest blockchain in web3.
                </Text>
                <Text variant="label" className="text-primary"> Difficulty: Easy </Text>
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
                <BiRocket size={35} />
                <div className="flex flex-col gap-1">
                    <Text variant="label" className="text-secondary"> Social Challenge </Text>
                    <Text variant="big-heading">Challenge 2</Text>
                    <Text variant="sub-heading">Reward: 25 points + NFT</Text>
                </div>
                <Text variant="paragraph">
                    Join our community and be part of Heavy Duty Builders.
                </Text>
                <Text variant="label" className="text-primary"> Difficulty: Easy </Text>
            </div>
            <Link href="/challenges/social-challenge" passHref>
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
