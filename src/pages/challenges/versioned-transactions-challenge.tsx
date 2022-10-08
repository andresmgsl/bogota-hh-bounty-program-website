import Button from 'components/common/button';
import Card from 'components/common/card';
import NavElement from 'components/common/layout/header/nav-element';
import Markdown from 'components/common/markdown';
import Text from 'components/common/text';
import { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useMemo, useRef, useState } from 'react';
import { TbBrandGithub } from 'react-icons/tb';
import { cn } from 'utils';

const VersionedTransactionsChallengePage: NextPage = () => {
    const [validBountyName, setValidBountyName] = useState(true);
    const [validHunter, setValidHunter] = useState(true);
    const titleRef = useRef(null);
    const hunterRef = useRef(null);
    const { data: session } = useSession();

    const [title, setTitle] = useState('Versioned Transactions');
    const [hunter, setHunter] = useState('');

    const [answerTwo, setSubmitProgramID] = useState('');
    const [answerOne, setSubmitTransactionID] = useState('');
    const [answerThree, setSubmitTime] = useState('');
    const [submission, setSubmission] = useState('');
    const [challengeID, setChallengeID] = useState('221007020');
    const [points, setPoints] = useState(150);
    const [description, setDescription] = useState(
        `
### Rewards: ${points} Points 🔥

___
### Description
In this challenge your going to learn all about Versioned Transactions!


1. Preview the Solana Bytes video on [Versioned Transactions](https://www.youtube.com/watch?v=8k68cMeLX2U)
2. Look out for the answers to the challenge questions
    - How many transaction versions are supported?
    - How do you construct a MessageV0 formatted transaction?
    - What method is used to get an Address Lookup Table?

3. Use the documentation provided as an additional resource!

### Tips:
- Learn about the latest Solana features following along with Solana Bytes.


### Resources:

[Versioned Transactions Docs](https://edge.docs.solana.com/developing/versioned-transactions)

[Address Lookup Tables](https://edge.docs.solana.com/developing/lookup-tables#how-to-create-an-address-lookup-table)

[Solana Bytes Youtube Video Playlist](https://www.youtube.com/playlist?list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm)
___

### How to Submit
Your submission should include the following:
1. How many versions of transactions are supported?
2. How do you construct a MessageV0 formatted transaction?
3. What method is used to get an Address Lookup Table?


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
                            value="1. How many transaction versions are supported?"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <input
                                className="w-full items-center bg-transparent outline-none"
                                onChange={e =>
                                    setSubmitTransactionID(e.target.value)
                                }
                                placeholder="Enter transaction Id..."
                            />
                        </Card>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="2. How do you construct a MessageV0 formatted transaction?"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <textarea
                                className="w-full items-center bg-transparent outline-none"
                                maxLength={200}
                                rows={10}
                                onChange={e =>
                                    setSubmitProgramID(e.target.value)
                                }
                                placeholder="Enter the code or method..."
                            />
                        </Card>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="3. What method is used to get an Address Lookup Table?"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <input
                                className="w-full items-center bg-transparent outline-none"
                                onChange={e => setSubmitTime(e.target.value)}
                                placeholder="Enter the code or method..."
                            />
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

        if (title === '' && hunter === '') {
            setValidHunter(false);
            setValidBountyName(false);
            titleRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
            return;
        } else if (title === '') {
            titleRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
            setValidBountyName(false);
            return;
        }
        const challengerName = session?.user?.name;
        const responseUser = await fetch(`/api/${challengerName}`);

        const user = await responseUser.json();

        // if (!user) {
        //     setValidHunter(false);
        //     hunterRef.current.scrollIntoView({
        //         behavior: 'smooth',
        //         block: 'center',
        //     });
        //     return;
        // }

        try {
            const submission = `
___
### Submission Entered:

Challenge Id: [#${challengeID}]

Hunter: ${session?.user?.name}

1. How many transaction versions are supported?
${answerOne}

2. How do you construct a MessageV0 formatted transaction?
${answerTwo}

3. What method is used to get an Address Lookup Table?:
${answerThree}

`;
            setSubmission(submission);
            const response = await fetch('/api/bounties', {
                body: JSON.stringify({
                    // assignee: hunter,
                    assignee: challengerName,
                    body: description + submission,
                    title: `Challenge Submission: ` + title,
                    points,
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
                                **please review your entry before clicking submit*
                            </Markdown>
                        </div>
                        <div className="width-full flex flex-row justify-end gap-2">
                            <Button
                                className="w-40"
                                type="submit"
                                variant="orange"
                                text="Submit"
                            />
                        </div>
                        {/* after submit, take them/offer to the next challenge.. */}
                    </div>
                </section>
            </form>
        </>
    );
};

export default VersionedTransactionsChallengePage;
