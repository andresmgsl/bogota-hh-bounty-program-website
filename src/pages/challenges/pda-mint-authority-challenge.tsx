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

type PdaMintAuthorityChallengePageProps = {
    user: User;
};

const PdaMintAuthorityChallengePage: NextPage<
    PdaMintAuthorityChallengePageProps
> = ({ user }) => {
    const [validBountyName, setValidBountyName] = useState(true);
    const [validHunter, setValidHunter] = useState(true);
    const titleRef = useRef(null);
    const hunterRef = useRef(null);
    const { data: session } = useSession();

    const [title, setTitle] = useState('PDA Mint Authority');
    const [hunter, setHunter] = useState('');

    const [answerOne, setSubmitProgramID] = useState('');
    const [answerTwo, setSubmitTransactionID] = useState('');
    const [answerThree, setSubmitMintAddress] = useState('');
    const [answerFour, setSubmitSeeds] = useState('');
    const [submitUniversity, setSubmitUniversity] = useState('');
    const [answerFive, setSubmitTime] = useState('');
    const [submission, setSubmission] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [challengeID, setChallengeID] = useState('221007109');
    const [points, setPoints] = useState(300);
    const [description, setDescription] = useState(
        `
### Reward: ${points} Points 🔥
___
### Description
In this challenge your mission is to create a Solana program that can create a new Token Mint where the Mint Authority is a PDA!   
💡 Record the start time so we can reference it later.
How long do you think it will take you to write this?   
Good luck **${session?.user?.name}**!

1. Visit the [Solana Developer Docs](https://docs.solana.com/developers) or the [Solana Cookbook](https://solanacookbook.com/#contributing) for guides.
2. Write a simple HelloWorld program. You can even reference [this repository](https://docs.solana.com/getstarted/hello-world).
3. Set up a list of accounts to be passed in as a parameter.
4. Add a [Cross-Program Invocation](https://docs.solana.com/developing/programming-model/calling-between-programs) to conduct a transfer from one account to the other.
5. Deploy your program to \`devnet\`.

💡 Record the end time. How long did it take?

### Tips:
- You'll need to use a **Cross-Program Invocation (CPI)** to accomplish this.
- Your sender (who's account is being debited) will need to sign this transaction.
- Your program will use three accounts: the sender, the recipient, and the System Program.
- You can use the Solana Explorer or Solscan to validate the transaction.
- You can use the CLI to validate the change in balance of two accounts.

### Resources:
[Solana Developer Docs](https://docs.solana.com/developers)   
[SPL Token Docs](https://spl.solana.com/token)   
[Program Examples](https://github.com/solana-developers/program-examples)   
___
### How to Submit
Your submission should include the following:
1. The \`Program ID\` from your deployed program.
2. The transaction ID of your "create mint" transaction.
3. The address of your new Mint.
4. What seeds did you use (in order) to create your PDA?
5. How long did it take you to deploy your program without error?
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
                            value="1. The Program ID from your deployed program."
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <input
                                className="w-full items-center bg-transparent outline-none"
                                onChange={e =>
                                    setSubmitProgramID(e.target.value)
                                }
                                placeholder="Enter the program ID of your deployed program"
                            />
                        </Card>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value='2. The transaction ID of your "create mint" transaction.'
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <input
                                className="w-full items-center bg-transparent outline-none"
                                onChange={e =>
                                    setSubmitTransactionID(e.target.value)
                                }
                                placeholder="Enter the transaction ID of your program's transfer"
                            />
                        </Card>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="3. The address of your newly created mint:"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <input
                                className="w-full items-center bg-transparent outline-none"
                                onChange={e =>
                                    setSubmitMintAddress(e.target.value)
                                }
                                placeholder="Enter the transaction ID of your program's transfer"
                            />
                        </Card>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="4. The seeds used to create your PDA:"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <input
                                className="w-full items-center bg-transparent outline-none"
                                onChange={e => setSubmitSeeds(e.target.value)}
                                placeholder="Enter the transaction ID of your program's transfer"
                            />
                        </Card>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="5. How long did it take you to deploy without errors?"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <input
                                className="w-full items-center bg-transparent outline-none"
                                onChange={e => setSubmitTime(e.target.value)}
                                placeholder="Enter the time it took you to deploy the program without errors"
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

1. The \`Program ID\` from your deployed program.
${answerOne}

2. The transaction ID of your "create mint" transaction.
${answerTwo}

3. The address of your new Mint.
${answerThree}

4. What seeds did you use (in order) to create your PDA?
${answerFour}

5. How long did it take you to deploy your program without error?
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

export default PdaMintAuthorityChallengePage;

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
