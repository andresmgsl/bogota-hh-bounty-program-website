import Button from 'components/common/button';
import Card from 'components/common/card';
import NavElement from 'components/common/layout/header/nav-element';
import Markdown from 'components/common/markdown';
import Text from 'components/common/text';
import { getCurrentUser } from 'lib/github';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { signIn, useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { FormEvent, useMemo, useRef, useState } from 'react';
import { TbBrandGithub } from 'react-icons/tb';
import { User } from 'types/github';
import { cn } from 'utils';

type SolanaStaking101ChallengePageProps = {
    user: User;
};

const SolanaStaking101ChallengePage: NextPage<
    SolanaStaking101ChallengePageProps
> = ({ user }) => {
    const [validBountyName, setValidBountyName] = useState(true);
    const [validHunter, setValidHunter] = useState(true);
    const titleRef = useRef(null);
    const hunterRef = useRef(null);
    const { data: session } = useSession();

    const [title, setTitle] = useState('Solana Staking: 101');
    const [hunter, setHunter] = useState('');

    const [answerTwo, setSecondAnswer] = useState('');
    const [answerOne, setFirstAnswer] = useState('');
    const [answerThree, setThirdAnswer] = useState('');
    const [answerFour, setFourAnswer] = useState('');
    const [answerFive, setFiveAnswer] = useState('');
    const [answerSix, setSixAnswer] = useState('');
    const [submission, setSubmission] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [submitUniversity, setSubmitUniversity] = useState('');
    const [challengeID, setChallengeID] = useState('221007052');
    const [points, setPoints] = useState(100);
    const [description, setDescription] = useState(
        `
### Rewards: ${points} Points

___
### Description
In this challenge we're going to learn about staking on Solana.

Let's get to it ${user.name ?? user.login}!

1. Read about Staking on Solana here: <a href="https://solana.com/staking" target="_blank">Staking</a>.
2. Look out for the answers to the challenge questions:
    - Who can stake on Solana?
    - What is Proof-of-Stake?
    - What are token holders eligible for when they choose to stake?
    - Is slashing automatic, and what causes it?
    - How often are staking rewards issued? How long is that?
    - What are two community operated tools used to view information about the network?

3. Use the documentation provided as an additional resource!

### Tips:
- Discover how easy deepllinks implementation can be
- If you have to, rewatch the video again!

### Resources:

<a href="https://solana.com/staking" target="_blank">Staking on Solana</a>

___

### How to Submit
Your submission should include the following:
1. Who can stake on Solana?
2. What is Proof-of-Stake?
3. What are token holders eligible for when they choose to stake?
4. Is slashing automatic? AND what causes it? (2 parts)
5. How often are staking rewards issued? How long is that? (2 parts)
6. What are two community operated tools used to view information about the network?


`,
    );

    const tabsDescription = useMemo(
        () => [
            {
                content: <Markdown>{description}</Markdown>,
                id: 'description',
                label: '',
            },
        ],
        [description],
    );

    const tabsSubmission = useMemo(
        () => [
            {
                content: (
                    <div>
                        <Markdown>{`### Submit your answers`}</Markdown>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="1. Who can stake on Solana?"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <input
                                className="w-full items-center bg-transparent outline-none"
                                onChange={e => setFirstAnswer(e.target.value)}
                                placeholder="Enter your answer..."
                            />
                        </Card>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="2. What is Proof-of-Stake?"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <textarea
                                className="w-full items-center bg-transparent outline-none"
                                maxLength={200}
                                rows={3}
                                onChange={e => setSecondAnswer(e.target.value)}
                                placeholder="Enter your answer..."
                            />
                        </Card>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="3. What are token holders eligible for when they choose to stake?"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <input
                                className="w-full items-center bg-transparent outline-none"
                                onChange={e => setThirdAnswer(e.target.value)}
                                placeholder="Enter your answer..."
                            />
                        </Card>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="4. Is slashing automatic, and what causes it?"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <textarea
                                className="w-full items-center bg-transparent outline-none"
                                maxLength={200}
                                rows={3}
                                onChange={e => setFourAnswer(e.target.value)}
                                placeholder="Enter your answer..."
                            />
                        </Card>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="5. How often are staking rewards issued? How long is that?"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <input
                                className="w-full items-center bg-transparent outline-none"
                                onChange={e => setFiveAnswer(e.target.value)}
                                placeholder="Enter your answer..."
                            />
                        </Card>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="6. What are two community operated tools used to view information about the network?"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <textarea
                                className="w-full items-center bg-transparent outline-none"
                                maxLength={200}
                                rows={3}
                                onChange={e => setSixAnswer(e.target.value)}
                                placeholder="Enter your answer..."
                            />
                        </Card>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="7. Select your university"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <select
                                className="w-full items-center bg-transparent outline-none"
                                onChange={e =>
                                    setSubmitUniversity(e.target.value)
                                }
                                placeholder="Tell us where are you from"
                                required
                            >
                                <option value="">None</option>
                                <option className="text-black" value="CALHACKS">
                                    CALHACKS
                                </option>
                                <option className="text-black" value="HACKTX">
                                    HACKTX
                                </option>
                            </select>
                        </Card>

                        {/* additional feedback, was it easy, suggestions, etc */}
                    </div>
                ),
                id: 'submission',
                label: 'Submission',
            },
        ],
        [],
    );

    const router = useRouter();
    const currentTabId = (router.query.tab as string) || 'description';
    const currentTabSubbmisionId = (router.query.tab as string) || 'submission';

    const currentChallenge = useMemo(
        () => tabsDescription.find(tab => tab.id === currentTabId),
        [currentTabId, tabsDescription],
    );

    const currentSubmission = useMemo(
        () => tabsSubmission.find(tab => tab.id === currentTabSubbmisionId),
        [currentTabSubbmisionId, tabsSubmission],
    );

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const submission = `
___
### Submission Entered:

Challenge Id: [#${challengeID}]
Hunter: ${user.name ?? user.login}

1.Who can stake on Solana?
${answerOne}

2. What is Proof-of-Stake?
${answerTwo}

3. What are token holders eligible for when they choose to stake?
${answerThree}

4. Is slashing automatic, and what causes it?
${answerFour}

5. How often are staking rewards issued? How long is that?
${answerFive}

6. What are two community operated tools used to view information about the network?
${answerSix}

7. University:
${submitUniversity}
-> ${user.login}

`;
            setSubmission(submission);
            const response = await fetch('/api/bounties', {
                body: JSON.stringify({
                    body: description + submission,
                    title: `Challenge Submission: ` + title,
                    points,
                    labels: [submitUniversity, user.login],
                }),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            });

            const data = await response.json();
            if (response.ok) {
                alert('Submission Sent!');
                router.push('/challenges');
            } else {
                alert(JSON.stringify(data));
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    };

    if (!session) {
        return (
            <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                <TbBrandGithub size={35} />
                <Text variant="sub-heading">
                    Sign in with GitHub to view the challenge.
                </Text>

                <div className="flex flex-row gap-2">
                    <Link href="/" passHref>
                        <a>
                            <Button variant="transparent" text="Go back" />
                        </a>
                    </Link>
                    <Button
                        variant="orange"
                        text="Sign in"
                        onClick={async () => signIn('github')}
                    />
                </div>
            </div>
        );
    }

    return (
        <>
            <NextSeo
                title="Display a Bounty"
                description="Display a bounty."
            ></NextSeo>
            <form className="flex flex-col" onSubmit={onSubmit}>
                <section className="flex w-full flex-col gap-7 bg-gradient-to-tr from-primary/75 to-secondary/75 p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                    <Text variant="label">
                        Bounty Challenge: #{challengeID}
                    </Text>
                    <div
                        className={cn(
                            'tooltip-bottom tooltip-error',
                            !validBountyName && 'tooltip tooltip-open',
                        )}
                        data-tip="Challenge name"
                    >
                        <div className="flex h-12 flex-col justify-between md:h-20">
                            <input
                                ref={titleRef}
                                readOnly={true}
                                className="peer border-none bg-transparent text-4xl font-medium placeholder-white/90 outline-none md:text-6xl"
                                onChange={e => {
                                    setTitle(e.target.value);
                                    if (
                                        e.target.value !== '' &&
                                        !validBountyName
                                    )
                                        setValidBountyName(true);
                                }}
                                placeholder="Solana 101: Deploy a Program"
                                value={title}
                            />
                        </div>
                    </div>
                </section>
                <section
                    title="bounty-details"
                    className="flex w-full flex-col gap-7 p-2 !pb-0 sm:p-8 md:px-16 lg:px-32 lg:py-6 xl:px-48 xl:py-8"
                >
                    <div className="flex flex-col gap-5">
                        <div className="sticky top-2 z-30 -mt-px flex h-2 flex-row gap-1 border-none bg-neutral bg-opacity-40 pt-2 backdrop-blur-xl">
                            <div className="flex h-full flex-row gap-4">
                                {tabsDescription.map((tab, index) => (
                                    <NavElement
                                        as={index === 0 && '/explorer/new'}
                                        href={`/explorer/new?tab=${tab.id}`}
                                        key={tab.id}
                                        label={tab.label}
                                        scroll={false} // TODO: Scroll to navbar position.
                                    />
                                ))}
                            </div>
                        </div>

                        {currentChallenge.content}
                        {currentSubmission.content}

                        <div className="flex flex-row justify-end gap-2 text-right">
                            <Markdown>
                                **please review your entry before clicking
                                submit*
                            </Markdown>
                        </div>
                        <div className="width-full flex flex-row justify-end gap-2">
                            <Button
                                className="w-40"
                                type="submit"
                                variant="orange"
                                text="Submit"
                                disabled={isLoading}
                            />
                        </div>
                        {/* after submit, take them/offer to the next challenge.. */}
                    </div>
                </section>
            </form>
        </>
    );
};

export default SolanaStaking101ChallengePage;

export const getServerSideProps: GetServerSideProps = async context => {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions,
    );

    const accessToken = session?.accessToken as string;

    const user = await getCurrentUser(accessToken);

    return {
        props: {
            user,
        },
    };
};
