export type Bounty = {
    [x: string]: any;
    address: string;
    createdAt: string;
    description: string;
    githubUrl: string;
    hunter?: string;
    id: number;
    mint?: string;
    name: string;
    owner: string;
    reward: number;
    state: 'open' | 'closed';
    tags: { value: string }[];
    rank: number;
};

export interface IssueLabel {
    [x: string]: any;
    id: number,
    node_id: string,
    url: string,
    name: string,
    color: string,
    default: true,
    description: string,
}

export type BountyChallenge = {
    [x: string]: any;
    address: string;
    createdAt: string;
    description: string;
    githubUrl: string;
    hunter?: string;
    id: number;
    mint?: string;
    name: string;
    owner: string;
    reward: number;
    state: 'open' | 'closed';
    labels: any[];
    tags: { value: string }[];
    rank: number;
};