import { FaGithub, FaTwitter } from 'react-icons/fa';
import { ChallengeItem } from 'types/bounty';

// ICON MAP REFERENCE
// const iconMap = new Map([
//     [1, FaTwitter],
//     [2, FaGithub],
//     [3, BiRocket],
//     [4, BiVideoPlus]
//   ]);

let i = 100;
// TODO: refactor for types, collection, interfaces etc
export const mockChallenges: ChallengeItem[] = [
    // Heavy Duty Social
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 1, // social
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Social Challenge',
        challengeURL: '/challenges/social-challenge',
        difficulty: 'Easy',
        description:
            'Join our community and be part of Heavy Duty Builders and Solana U.',
        githubUrl: 'some githubUrl',
        authorName: 'HeavyDutyBuild',
        authorGithub: 'heavy-duty/platform',
        authorTwitter: 'HeavyDutyBuild',
        rewardValue: 25,
        rewardType: 'points',
    },
    // Social Twitter - Photo - Dana
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 1, // social
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Social Challenge',
        challengeURL: '/challenges/social-photo-1-challenge',
        difficulty: 'Easy',
        description:
            'Find and Meet Dana with Solana Foundation University Relations!',
        githubUrl: 'some githubUrl',
        authorName: 'donnysolana',
        authorGithub: 'donnysolana',
        authorTwitter: 'donnysolana',
        rewardValue: 50,
        rewardType: 'points',
    },
    // Social Twitter - Photo - Colin
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 1, // social
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Social Challenge',
        challengeURL: '/challenges/social-photo-2-challenge',
        difficulty: 'Easy',
        description:
            'Find and Meet Colin with Solana Foundation Developer Relations!',
        githubUrl: 'some githubUrl',
        authorName: 'HeavyDutyBuild',
        authorGithub: 'heavy-duty/platform',
        authorTwitter: 'HeavyDutyBuild',
        rewardValue: 50,
        rewardType: 'points',
    },
    // Social Twitter - Photo - Dana
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 1, // social
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Social Challenge',
        challengeURL: '/challenges/social-photo-3-challenge',
        difficulty: 'Easy',
        description:
            'Find and Meet Joe with Solana Foundation Developer Relations!',
        githubUrl: 'some githubUrl',
        authorName: 'donnysolana',
        authorGithub: 'donnysolana',
        authorTwitter: 'donnysolana',
        rewardValue: 50,
        rewardType: 'points',
    },
    // Publish a Smart Contract in Minutes
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 0, // rocket
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Deploy Challenge',
        challengeURL: '/challenges/deploy-challenge',
        difficulty: 'Easy',
        description:
            'Publish your first smart contract in minutes with Solana Playground!',
        githubUrl: 'some githubUrl',
        authorName: 'DonnySolana',
        authorGithub: 'DonnySolana',
        authorTwitter: 'DonnySolana',
        rewardValue: 100,
        rewardType: 'points',
    },
    // Create a Token on Solana
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 0, // rocket
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'SPL Token Challenge',
        challengeURL: '/challenges/spl-token-challenge-01',
        difficulty: 'Easy',
        description: 'Create a Token on Solana!',
        githubUrl: 'some githubUrl',
        authorName: 'cleon30',
        authorGithub: 'cleon30',
        authorTwitter: '0xCleon',
        rewardValue: 150,
        rewardType: 'points',
    },
    // more insight into Solana NFTs with Metaplex
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 0, // rocket
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'NFT Challenge',
        challengeURL: '/challenges/nft-101-Basics-01-challenge',
        difficulty: 'Easy',
        description:
            'In this challenge we gain more insight into Solana NFTs with Metaplex!',
        githubUrl: 'some githubUrl',
        authorName: 'DonnySolana',
        authorGithub: 'kamda-cyrial',
        authorTwitter: 'CyrialK',
        rewardValue: 150,
        rewardType: 'points',
    },
    // more insight into Solana NFTs with Metaplex
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 0, // rocket
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Game Challenge',
        challengeURL: '/challenges/games-unity-insight-challenge',
        difficulty: 'Easy',
        description: 'Learn how to save game data to Solana from Unity!',
        githubUrl: 'some githubUrl',
        authorName: 'Woody4618',
        authorGithub: 'Woody4618',
        authorTwitter: 'SolPlay_jonas',
        rewardValue: 150,
        rewardType: 'points',
    },
    // Learn how to use the new transaction format with Versioned Transactions.
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 4, // video
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Video Challenge',
        challengeURL: '/challenges/versioned-transactions-challenge',
        difficulty: 'Easy',
        description:
            'Learn how to use the new transaction format with Versioned Transactions.',
        githubUrl: 'some githubUrl',
        authorName: 'realbuffalojoe',
        authorGithub: 'realbuffalojoe',
        authorTwitter: 'realbuffalojoe',
        rewardValue: 150,
        rewardType: 'points',
    },
    // Dive into the Solana programming model with this overview on Accounts.
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 4, // video
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Video Challenge',
        challengeURL: '/challenges/accounts-overview-challenge',
        difficulty: 'Easy',
        description:
            'Dive into the Solana programming model with this overview on Accounts.',
        githubUrl: 'some githubUrl',
        authorName: 'realbuffalojoe',
        authorGithub: 'realbuffalojoe',
        authorTwitter: 'realbuffalojoe',
        rewardValue: 100,
        rewardType: 'points',
    },
    // Learn more about Solana accounts and ownership.
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 4, // video
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Video Challenge',
        challengeURL: '/challenges/accounts-ownership-challenge',
        difficulty: 'Easy',
        description: 'Learn more about Solana accounts and ownership.',
        githubUrl: 'some githubUrl',
        authorName: 'realbuffalojoe',
        authorGithub: 'realbuffalojoe',
        authorTwitter: 'realbuffalojoe',
        rewardValue: 100,
        rewardType: 'points',
    },
    // Learn about what a Cross-Program Invocation is, and how to use it.
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 4, // video
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Video Challenge',
        challengeURL: '/challenges/cpi-overview-challenge',
        difficulty: 'Easy',
        description:
            'Learn about what a Cross-Program Invocation is, and how to use it.',
        githubUrl: 'some githubUrl',
        authorName: 'realbuffalojoe',
        authorGithub: 'realbuffalojoe',
        authorTwitter: 'realbuffalojoe',
        rewardValue: 100,
        rewardType: 'points',
    },
    // Learn about custom account data on Solana.
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 4, // video
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Video Challenge',
        challengeURL: '/challenges/custom-data-challenge',
        difficulty: 'Easy',
        description: 'Learn about custom account data on Solana.',
        githubUrl: 'some githubUrl',
        authorName: 'realbuffalojoe',
        authorGithub: 'realbuffalojoe',
        authorTwitter: 'realbuffalojoe',
        rewardValue: 100,
        rewardType: 'points',
    },
    // Learn about phantom deeplinks for mobile wallets.
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 0, // default (rocket)
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Wallet Challenge',
        challengeURL: '/challenges/phantom-deep-links-challenge',
        difficulty: 'Easy',
        description: 'Learn about phantom deeplinks for mobile wallets.',
        githubUrl: 'some githubUrl',
        authorName: 'donnysolana',
        authorGithub: 'donnysolana',
        authorTwitter: 'donnysolana',
        rewardValue: 100,
        rewardType: 'points',
    },
    // Learn more about Solana PDAs. - CyrialK
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 0, // rocket (default)
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Concept Challenge',
        challengeURL: '/challenges/pda-overview-01-challenge',
        difficulty: 'Easy',
        description: 'Learn more about Solana PDAs.',
        githubUrl: 'some githubUrl',
        authorName: 'CyrialK',
        authorGithub: 'kamda-cyrial',
        authorTwitter: 'CyrialK',
        rewardValue: 100,
        rewardType: 'points',
    },
    // Learn about Solana Staking.
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 0, // rocket (default)
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Staking Challenge',
        challengeURL: '/challenges/solana-staking-101-challenge',
        difficulty: 'Easy',
        description: 'Learn about Solana Staking.',
        githubUrl: 'some githubUrl',
        authorName: 'DonnySolana',
        authorGithub: 'DonnySolana',
        authorTwitter: 'DonnySolana',
        rewardValue: 100,
        rewardType: 'points',
    },
    // Help a fren out - Stack Exchange Q/A - Steve Luscher (easy)
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 0, // rocket (default)
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Social Challenge',
        challengeURL: '/challenges/stack-exchange-answer-challenge',
        difficulty: 'Easy',
        description: 'Help a fren out on Solana Stack Exchange',
        githubUrl: 'some githubUrl',
        authorName: 'steveluscher',
        authorGithub: 'steveluscher',
        authorTwitter: 'steveluscher',
        rewardValue: 100,
        rewardType: 'points',
    },
    // Social Twitter - Photo Bomb - Dana
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 1, // social
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Social Challenge',
        challengeURL: '/challenges/social-photo-bomb-1-challenge',
        difficulty: 'Easy',
        description:
            'Photo Bomb Dana from Solana Foundation University Relations!',
        githubUrl: 'some githubUrl',
        authorName: 'donnysolana',
        authorGithub: 'donnysolana',
        authorTwitter: 'donnysolana',
        rewardValue: 50,
        rewardType: 'points',
    },
    // Social Twitter - Photo Bomb - Dana
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 1, // social
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Social Challenge',
        challengeURL: '/challenges/social-photo-bomb-2-challenge',
        difficulty: 'Easy',
        description:
            'Photo Bomb Colin from Solana Foundation Developer Relations!',
        githubUrl: 'some githubUrl',
        authorName: 'donnysolana',
        authorGithub: 'donnysolana',
        authorTwitter: 'donnysolana',
        rewardValue: 50,
        rewardType: 'points',
    },
    // Social Twitter - Photo Bomb - Joe
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 1, // social
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Social Challenge',
        challengeURL: '/challenges/social-photo-bomb-3-challenge',
        difficulty: 'Easy',
        description:
            'Photo Bomb Joe from Solana Foundation Developer Relations!',
        githubUrl: 'some githubUrl',
        authorName: 'donnysolana',
        authorGithub: 'donnysolana',
        authorTwitter: 'donnysolana',
        rewardValue: 50,
        rewardType: 'points',
    },
    // Write a Solana program to transfer SOL between two accounts! (medium)
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 0, // rocket (default)
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Deploy Challenge',
        challengeURL: '/challenges/transfer-sol-challenge',
        difficulty: 'Medium',
        description:
            'Write a Solana program to transfer SOL between two accounts!',
        githubUrl: 'some githubUrl',
        authorName: 'realbuffalojoe',
        authorGithub: 'realbuffalojoe',
        authorTwitter: 'realbuffalojoe',
        rewardValue: 300,
        rewardType: 'points',
    },
    // Send a Transaction V0 using an Address Lookup Table. (medium)
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 5, // arrows L/R
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Client Challenge',
        challengeURL: '/challenges/lookup-table-challenge',
        difficulty: 'Medium',
        description: 'Send a Transaction V0 using an Address Lookup Table.',
        githubUrl: 'some githubUrl',
        authorName: 'realbuffalojoe',
        authorGithub: 'realbuffalojoe',
        authorTwitter: 'realbuffalojoe',
        rewardValue: 300,
        rewardType: 'points',
    },
    // Write custom data to the Solana blockchain. (medium)
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 0, // arrows L/R
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Deploy Challenge',
        challengeURL: '/challenges/writing-custom-data-challenge',
        difficulty: 'Medium',
        description: 'Write custom data to the Solana blockchain.',
        githubUrl: 'some githubUrl',
        authorName: 'realbuffalojoe',
        authorGithub: 'realbuffalojoe',
        authorTwitter: 'realbuffalojoe',
        rewardValue: 300,
        rewardType: 'points',
    },
    //  Create a Solana account with a Program Derived Address using your program. (medium)
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 0, // arrows L/R
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Deploy Challenge',
        challengeURL: '/challenges/writing-pda-challenge',
        difficulty: 'Medium',
        description:
            'Create a Solana account with a Program Derived Address using your program.',
        githubUrl: 'some githubUrl',
        authorName: 'realbuffalojoe',
        authorGithub: 'realbuffalojoe',
        authorTwitter: 'realbuffalojoe',
        rewardValue: 300,
        rewardType: 'points',
    },
    //  Write a custom Solana program that can create a new Token Mint with a PDA as the Mint Authority. (medium)
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 0, // arrows L/R
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Deploy Challenge',
        challengeURL: '/challenges/pda-mint-authority-challenge',
        difficulty: 'Medium',
        description:
            'Write a custom Solana program that can create a new Token Mint with a PDA as the Mint Authority.',
        githubUrl: 'some githubUrl',
        authorName: 'realbuffalojoe',
        authorGithub: 'realbuffalojoe',
        authorTwitter: 'realbuffalojoe',
        rewardValue: 300,
        rewardType: 'points',
    },
    //  Build a unique application using Helius Webhooks. (medium)
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 0, // default
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'SDK Challenge',
        challengeURL: '/challenges/api-helius-01-challenge',
        difficulty: 'medium',
        description: 'Build a webhook with Helius!',
        githubUrl: 'some githubUrl',
        authorName: 'starry',
        authorGithub: 'jstarry',
        authorTwitter: 'jstrry',
        rewardValue: 500,
        rewardType: 'points',
    },
    //  Build custom instruction processing for your Solana program. (hard)
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 0, // default
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'Deploy Challenge',
        challengeURL: '/challenges/processing-instructions-challenge',
        difficulty: 'Hard',
        description:
            'Build custom instruction processing for your Solana program.',
        githubUrl: 'some githubUrl',
        authorName: 'realbuffalojoe',
        authorGithub: 'realbuffalojoe',
        authorTwitter: 'realbuffalojoe',
        rewardValue: 500,
        rewardType: 'points',
    },
    //  Build a unique application using Orca SDK. (hard)
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 0, // default
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'SDK Challenge',
        challengeURL: '/challenges/sdk-orca-01-challenge',
        difficulty: 'Hard',
        description: 'Build a unique application using Orca SDK!',
        githubUrl: 'some githubUrl',
        authorName: 'donnysolana',
        authorGithub: 'donnysolana',
        authorTwitter: 'donnysolana',
        rewardValue: 1000,
        rewardType: 'points',
    },
    //  Build a unique application using Jupiter SDK. (hard)
    {
        key: ++i,
        id: 'some unique id',
        iconKey: 0, // default
        iconSize: 35, // default
        title: `Challenge ${i}`,
        type: 'SDK Challenge',
        challengeURL: '/challenges/sdk-jupiter-01-challenge',
        difficulty: 'Hard',
        description: 'Build a unique application using Jupiter SDK!',
        githubUrl: 'some githubUrl',
        authorName: 'starry',
        authorGithub: 'jstarry',
        authorTwitter: 'jstrry',
        rewardValue: 1000,
        rewardType: 'points',
    },
];

// // placeholder title
// {
//     key: ++i,
//     id: 'some unique id',
//     iconKey: 0, // rocket (default)
//     iconSize: 35, // default
//     title: `Challenge ${i}`,
//     type: 'placeholder Challenge',
//     challengeURL: '/challenges/placeholder',
//     difficulty: 'Easy',
//     description: 'placeholder',
//     githubUrl: 'some githubUrl',
//     authorName: 'DonnySolana',
//     authorGithub: 'DonnySolana',
//     authorTwitter: 'DonnySolana',
//     rewardValue: 100,
//     rewardType: 'points',
// },

// // 1: Template Name
// {
//     key: ++i,
//     id: 'some unique id',
//     iconKey: 1, // twitter
//     iconSize: 35, // default
//     title: `Heavy Duty Social`,
//     type: 'Social Challenge',
//     challengeURL: '/challenges/social-challenge',
//     difficulty: 'Easy',
//     description: 'Join our community and be part of Heavy Duty Builders and Solana U.',
//     githubUrl: 'some githubUrl',
//     authorName: 'donnySolana',
//     authorGithub: 'donnySolana',
//     authorTwitter: 'donnySolana',
//     rewardValue: 300,
//     rewardType: 'points',

//     // authorWebsite: 'some authorWebsite',
//     // authorLogo: 'some authorLogo',
//     // sponsorALink: 'some sponsorALink',
//     // sponsorALogo: 'some sponsorALogo',
//     // sponsorBLink: 'some sponsorBLink ',
//     // sponsorBLogo: 'some sponsorBLogo',
//     // mint: 'some mint',
//     // name: 'some name',
//     // owner: 'some owner',
//     // state: 'open',
//     // tags: [
//     //     { value: 'some-tag-1' },
//     //     { value: 'some-tag-2' },
//     // ],
//     // rank: 9999,
//     // createdAt: 'some date: 01 Jan',
// },
