import Button from 'components/common/button';
import Card from 'components/common/card';
import { getChallengesByAssignee } from 'lib/bounties';
import { getCurrentUser } from 'lib/github';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { FormEvent, useState } from 'react';
import { BountyChallenge } from 'types/bounty';
import { User } from 'types/github';
import { authOptions } from './api/auth/[...nextauth]';
import Image from 'next/image';
import { getNftDescription } from 'utils/bountyChallenge';

interface ClaimPageProps {
    token: string | null;
    bounties: BountyChallenge[];
    user: User;
}

const ClaimPage: NextPage<ClaimPageProps> = ({ token }) => {
    const [walletPublicKey, setWalletPublicKey] =
        useState('');
    const [isLoading,setIsloading] = useState(false);
    const description = getNftDescription();

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsloading(true);

        try {
            const response = await fetch(`/api/claim`, {
                body: JSON.stringify({
                    userVault: walletPublicKey,
                }),
                method: 'POST',
            });
    
            const data = await response.json();
            
            console.log(data);
            alert("NFT Minted, please check your wallet");
            setIsloading(false);
        } catch(e) {
            alert("Error, try again.");
            console.log(e);
        }
    }

    return (
        <div className="flex flex-col md:flex-row items-center md:items-start mt-8 mx-auto gap-4 md:gap-8">
            <Card className="w-[350px] px-8 py-4 flex flex-col items-center">
                <div>
                    <Image
                        src="/bogota-nft-1.png"
                        width="320px"
                        height="320px"
                        alt=""    
                    />
                </div>
                <p>
                    <span className="text-opacity-25 text-xl">Description: </span> <br/>
                    {description}
                </p>
            </Card>
            
            <form onSubmit={onSubmit} className="w-[350px]">
                <label
                    className="w-full py-5 border-none bg-transparent outline-none"
                >
                    Your wallet:
                </label>
                <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                    <input
                        className="w-full items-center bg-transparent outline-none"
                        placeholder='Enter a public key'
                        onChange={e => setWalletPublicKey(e.target.value)}
                    />
                </Card>

                <div className="width-full flex flex-row justify-end gap-2">
                    <Button
                        className="w-40 mt-4"
                        type="submit"
                        variant="orange"
                        text="Submit"
                        disabled={isLoading}
                    />
                </div>
            </form>
        </div>
    )
};

export default ClaimPage;


export const getServerSideProps: GetServerSideProps = async context => {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions,
    );

    const accessToken = session?.accessToken;
    const user = await getCurrentUser(accessToken);

    if (!user) {
        return { notFound: true };
    }

    const bounties = await getChallengesByAssignee(user.login, accessToken);  

    return {
        props: {
            token: accessToken,
            user,
            bounties
        },
    };
};
