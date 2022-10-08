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

const DeployChallengePage: NextPage = () => {
    const [validBountyName, setValidBountyName] = useState(true);
    const [validHunter, setValidHunter] = useState(true);
    const titleRef = useRef(null);
    const hunterRef = useRef(null);
    const { data: session } = useSession();

    const [title, setTitle] = useState('Solana 101: Deploy a Program');
    const [hunter, setHunter] = useState('');

    const [submitProgramID, setSubmitProgramID] = useState('');
    const [submitTransactionID, setSubmitTransactionID] = useState('');
    const [submitTime, setSubmitTime] = useState('');
    const [submission, setSubmission] = useState('');
    const [challengeID, setChallengeID] = useState('221004010');
    const [points, setPoints] = useState(100);
    const [description, setDescription] = useState(
        `
### Rewards: ${points} Points 🔥 *NFT! 👻

___
### Description
In this challenge your mission is to deploy your first Solana program to devnet!

💡 Record the start time so we can reference it later.

How long do you think it will take you to deploy?

Good luck **Hunter**!

1. Visit the Solana developer docs: <a href="https://docs.solana.com/developers" target="_blank">https://docs.solana.com/developers</a>
2. Click on the <a href="https://docs.solana.com/getstarted/hello-world" target="_blank">Get Started</a> button
3. <a href="https://docs.solana.com/getstarted/hello-world#what-you-will-learn" target="_blank">Follow the guide to deploy a program</a>
4. <a href="https://docs.solana.com/getstarted/hello-world#deploy-your-program" target="_blank">Deploy your program and record the transaction signature</a>
5. <a href="https://docs.solana.com/getstarted/hello-world#find-your-program-id" target="_blank">Find and record your program Id</a>

💡 Record the end time. How long did it take?

### Tips:
- When you click deploy you should see two buttons: Solana Explorer and Solscan. Clicking the buttons should take you to a transaction explorer where you can view details and your transaction Id in the url.
- Explorer on devnet to search for your program Id: <a href="https://explorer.solana.com/?cluster=devnet" target="_blank"> Solana Explorer</a>
- <a href="https://explorer.solana.com/tx/4v5StXx1jeuWzh9trtBQtQRMeeUjZzk7mJSq9MTx9XhDunbqY5ZpwPZQanVKfN7Tb3X1gHtMa6xgUcARVDaG7x91?cluster=devnet" target="_blank">Example transaction Id</a> is in the url followed by: /tx/.
- Id, Address, and Public Key are often used interchangeably to describe an address which can be used to look up account information.
- Example of a public key or wallet address: 6UmotVc1i6y4e6DnHf5FwYzYX9qCD7ncAbErsiu4oo3U

**some challenges may offer new NFTs while others may even update existing ones!*

### Resources:

<a href="https://docs.solana.com/developers" target="_blank">Solana Developer</a> 

<a href="https://beta.solpg.io/" target="_blank">Solana Playground</a>

___

### How to Submit
Your submission should include the following:
1. Your \`Transaction Id\` (tx, signature, address) from the url above.
2. The \`Program ID\` from your deployed program.
3. Time it took to deploy your program.


NOTE: if devnet is failing, you can use testnet and show how to properly switch network.

*That was almost too easy..*

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
                            value="1. Transaction Id: from your program deployment"
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
                            value="2. Program Id:"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <input
                                className="w-full items-center bg-transparent outline-none"
                                onChange={e =>
                                    setSubmitProgramID(e.target.value)
                                }
                                placeholder="Enter program Id..."
                            />
                        </Card>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="3. How long did it take?  (minutes)"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <input
                                className="w-full items-center bg-transparent outline-none"
                                onChange={e => setSubmitTime(e.target.value)}
                                placeholder="Enter number of minutes it took to deploy your program..."
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

1. Transaction ID:
${submitTransactionID}

2. Program ID:
${submitProgramID}

3. How long did it take to deploy a program? (minutes): ${submitTime}

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

export default DeployChallengePage;
