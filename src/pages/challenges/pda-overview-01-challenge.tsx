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

type PDAOverview01ChallengePageProps = {
    user: User;
};

const PDAOverview01ChallengePage: NextPage<PDAOverview01ChallengePageProps> = ({
    user,
}) => {
    const [validBountyName, setValidBountyName] = useState(true);
    const [validHunter, setValidHunter] = useState(true);
    const titleRef = useRef(null);
    const hunterRef = useRef(null);
    const { data: session } = useSession();

    const [title, setTitle] = useState('Accounts Overview');
    const [hunter, setHunter] = useState('');

    const [answerTwo, setSecondAnswer] = useState('');
    const [answerOne, setFirstAnswer] = useState('');
    const [answerThree, setThirdAnswer] = useState('');
    const [answerFour, setFourAnswer] = useState('');
    const [answerFive, setFifthAnswer] = useState('');
    const [submission, setSubmission] = useState('');
    const [submitUniversity, setSubmitUniversity] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [challengeID, setChallengeID] = useState('221007041');
    const [points, setPoints] = useState(100);
    const [description, setDescription] = useState(
        `
### Rewards: ${points} Points 🔥

___
### Description
In this challenge we're going to learn all about PDAs on Solana! 

A what?

Let's get into it ${session?.user?.name}!

1. Preview the Solana Bytes video on PDAs <a href="https://www.youtube.com/watch?v=ZwFNPvqUclM" target="_blank">Program Derived Addresses</a>.
2. Look out for the answers to the challenge questions:
    - What are PDAs?
    - Why are they useful?
    - How do you generate or find a PDA?
    - How do you sign a transaction with a PDA?
    - How do you create a PDA?

3. Use the documentation provided as an additional resource!

### Tips:
- Listen closely and learn about PDAs with this great overview.
- If you have to, rewatch the video again!
- Use the docs to research and confirm any answers!

### Resources:

<a href="https://solanacookbook.com/core-concepts/pdas.html#program-derived-addresses-pdas" target="_blank">Solana Cookbook PDAs</a>

<a href="https://docs.solana.com/developing/programming-model/calling-between-programs#program-derived-addresses" target="_blank">Solana Docs PDAs</a>

<a href="https://solanacookbook.com/references/programs.html#how-to-do-cross-program-invocation" target="_blank">Solana Cookbook Cross Program Invocations</a>

<a href="https://solanacookbook.com/references/accounts.html#how-to-create-a-system-account" target="_blank">Accounts and PDAs</a>


___

### How to Submit
Your submission should include the following:
1. What are PDAs?
2. Why are they useful?
3. How do you generate or find a PDA?
4. How do you sign a transaction with a PDA?
5. How do you create a PDA?


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
                            value="1. What are PDAs?"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <textarea
                                className="w-full items-center bg-transparent outline-none"
                                maxLength={200}
                                rows={3}
                                onChange={e => setFirstAnswer(e.target.value)}
                                placeholder="Enter your answer..."
                            />
                        </Card>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="2. Why are they useful?"
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
                            value="3. How do you generate or find a PDA?"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <textarea
                                className="w-full items-center bg-transparent outline-none"
                                maxLength={200}
                                rows={3}
                                onChange={e => setThirdAnswer(e.target.value)}
                                placeholder="Enter your answer..."
                            />
                        </Card>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="4. How do you sign a transaction with a PDA?"
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
                            value="5. How do you create a PDA?"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <textarea
                                className="w-full items-center bg-transparent outline-none"
                                maxLength={200}
                                rows={3}
                                onChange={e => setFifthAnswer(e.target.value)}
                                placeholder="Enter your answer..."
                            />
                        </Card>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="6. Select your university"
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




1. What are PDAs?
${answerOne}

2. Why are they useful?
${answerTwo}

3. How do you generate or find a PDA?
${answerThree}

4. How do you sign a transaction with a PDA?
${answerFour}

5. How do you create a PDA?
${answerFive}

6. University:
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

export default PDAOverview01ChallengePage;

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
