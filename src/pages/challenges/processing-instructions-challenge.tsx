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

type ProcessingInstructionsChallengePageProps = {
    user: User;
};

const ProcessingInstructionsChallengePage: NextPage<
    ProcessingInstructionsChallengePageProps
> = ({ user }) => {
    const [validBountyName, setValidBountyName] = useState(true);
    const [validHunter, setValidHunter] = useState(true);
    const titleRef = useRef(null);
    const { data: session } = useSession();

    const [title, setTitle] = useState('Processing Instructions');
    const [hunter, setHunter] = useState('');

    const [answerOne, setSubmitProgramID] = useState('');
    const [answerTwo, setSubmitTransactionIDCreate] = useState('');
    const [answerThree, setSubmitTransactionIDIncrement] = useState('');
    const [answerFour, setSubmitAccountAddress] = useState('');
    const [answerFive, setSubmitTime] = useState('');
    const [submitUniversity, setSubmitUniversity] = useState('');
    const [submission, setSubmission] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [challengeID, setChallengeID] = useState('221007108');
    const [points, setPoints] = useState(100);
    const [description, setDescription] = useState(
        `
### Rewards: ${points} Points 🔥
___

### Description

In this challenge your mission is to build a Solana program with two types of instructions.

This program will be written in native Solana (not Anchor).

This program will be able to conduct the following two instructions:
1. Create a counter PDA. This PDA account should have one field: value: \`u8\`.
2. Increment that counter PDA's value by 1.

Good luck **${session?.user?.name}**!

1. Preview the Solana Bytes video on [Processing Instructions](https://www.youtube.com/watch?v=T5p8rGD0-vs&list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm&index=10).
2. Create a program capable of creating an account.
3. Create the folowing data structure for your account: one field named "value" of type \`u8\`.
4. Write the functionality to serialize this data on-chain.
5. Now add the second function for incrementing the value.
6. Write a custom instruction data structure to determine which function is to be run when your program is invoked.
7. Now write a test. Replicate the instruction data on your client side.
5. Add to your test the functionality to hit your program with both instructions, one after another.

### Tips:

- You'll want to follow the steps to create an account using **CPI**.
- You'll have to add a struct that leverages Borsh to create the serializable custom data structure.
- The act of serializing this data takes place after the account has been created, and space for the data structure has been alloted.
- You'll need to derive the PDA on the client-side, but on your program-side you want to make sure your program is the owner of the new account.
- You'll want to use a struct for Instruction Data as well as the Data for your account.
- It helps tremendously to have an InstructionType enum as the first field of your Instruction Data.
- You may want to leverage a \`match\` statement in your \`processor.rs\` file to direct flow of your program.

### Resources:
<a href="https://docs.solana.com/developers" target="_blank">Solana Developer Docs</a>   
<a href="https://github.com/solana-developers/program-examples" target="_blank">Program Examples</a>   
<a href="https://www.youtube.com/playlist?list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm" target="_blank">Solana Bytes YouTube Playlist</a>
___

### How to Submit
Your submission should include the following:
1. Your deployed program's \`Program ID\`.
2. Your \`Transaction Id\` of your "create account" transaction.
3. Your \`Transaction Id\` of your "increment value" transaction.
4. The address of your counter account.
5. Time it took to successfully send this transaction.
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
                            value="1. Enter your deployed program's Program ID:"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <input
                                className="w-full items-center bg-transparent outline-none"
                                onChange={e =>
                                    setSubmitProgramID(e.target.value)
                                }
                                placeholder="Program ID"
                            />
                        </Card>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="2. Enter the transaction ID of the transaction that created the account:"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <input
                                className="w-full items-center bg-transparent outline-none"
                                onChange={e =>
                                    setSubmitTransactionIDCreate(e.target.value)
                                }
                                placeholder="Transaction ID"
                            />
                        </Card>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="3. Enter the transaction ID of the transaction that incremented the account's value:"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <input
                                className="w-full items-center bg-transparent outline-none"
                                onChange={e =>
                                    setSubmitTransactionIDIncrement(
                                        e.target.value,
                                    )
                                }
                                placeholder="Transaction ID"
                            />
                        </Card>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="4. Enter the address of the PDA account you created with custom data:"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <input
                                className="w-full items-center bg-transparent outline-none"
                                onChange={e =>
                                    setSubmitAccountAddress(e.target.value)
                                }
                                placeholder="Account Addresss"
                            />
                        </Card>

                        <input
                            className="w-full border-none bg-transparent py-5 outline-none"
                            value="5. How long did it take you to deploy this program without error?"
                        />
                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                            <input
                                className="w-full items-center bg-transparent outline-none"
                                onChange={e => setSubmitTime(e.target.value)}
                                placeholder="Enter how long it took you"
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

1. Your deployed program's \`Program ID\`.
${answerOne}

2. Your \`Transaction Id\` of your "create account" transaction.
${answerTwo}

3. Your \`Transaction Id\` of your "increment value" transaction.
${answerThree}

4. The address of your counter account.
${answerFour}

5. Time it took to successfully send this transaction.
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

export default ProcessingInstructionsChallengePage;

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
