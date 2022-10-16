import { signIn } from 'next-auth/react';
import { App } from 'octokit';
import { User as GithubUser, Issue, User } from 'types/github';

type IssueToCreate = {
    assignee: string;
    body: string;
    labels?: string[];
    title: string;
    points?: number;
};

type SearchApiResponse = {
    items: [];
};

const DRILL_BOUNTY_LABEL = 'drill:bounty';
const DRILL_BOUNTY_ENABLED_LABEL = 'drill:bounty';
const DRILL_BOUNTY_CLOSED_LABEL = 'drill:bounty:closed';
const DRILL_BOUNTY_CHALLENGE_LABEL = 'challenge';
const DRILL_BOUNTY_POINTS_LABEL = 'points:';

const authenticateGithubApp = async () => {
    const app = new App({
        appId: process.env.GITHUB_APP_ID,
        privateKey: JSON.parse(process.env.GITHUB_PRIVATE_KEY),
    });
    const octokit = await app.getInstallationOctokit(
        process.env.GITHUB_APP_INSTALLATION as unknown as number,
    );

    return octokit.rest;
};

const getDrillBountyUrlQuery = (params: string[] = []) =>
    `q=${encodeURIComponent(
        `is:issue label:"${DRILL_BOUNTY_CHALLENGE_LABEL}","${DRILL_BOUNTY_LABEL}" repo:${
            process.env.GITHUB_OWNER
        }/${process.env.GITHUB_REPO} ${params.length ? params.join(' ') : ''}`,
    )}`;

const closeIssue = async (id: number, token: string) => {
    const url = `${process.env.GITHUB_API}/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/issues/${id}`;
    try {
        const response = await fetch(url, {
            body: JSON.stringify({
                state: 'closed',
            }),
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'PATCH',
        });

        return response.json();
    } catch (error) {
        throw new Error(error);
    }
};

const createIssue = async (issue: IssueToCreate, token: string) => {
    const url = `${process.env.GITHUB_API}/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/issues`;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const { body, title } = issue;

    let pointsLabel = '';

    if (issue.points) {
        pointsLabel = DRILL_BOUNTY_POINTS_LABEL + String(issue.points);
    } else {
        pointsLabel = DRILL_BOUNTY_POINTS_LABEL + '0';
    }

    try {
        const response = await fetch(url, {
            body: JSON.stringify({
                assignees: [],
                body,
                owner,
                repo,
                title,
                labels: [DRILL_BOUNTY_CHALLENGE_LABEL, pointsLabel],
            }),
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });
        return response.json();
    } catch (error) {
        throw new Error(error);
    }
};

const createIssue2 = async (issue: IssueToCreate) => {
    const { body, title, assignee, labels } = issue;
    const githuRestApi = await authenticateGithubApp();
    let pointsLabel = '';

    if (issue.points) {
        pointsLabel = DRILL_BOUNTY_POINTS_LABEL + String(issue.points);
    } else {
        pointsLabel = DRILL_BOUNTY_POINTS_LABEL + '0';
    }
    try {
        const response = await githuRestApi.issues.create({
            owner: process.env.GITHUB_OWNER,
            repo: process.env.GITHUB_REPO,
            title: title,
            body,
            labels: [DRILL_BOUNTY_CHALLENGE_LABEL, pointsLabel, ...labels],
        });
        return response;
    } catch (error) {
        console.log('error ->', error.response.data.errors);
        throw new Error(error);
    }
};

const getGithubData = async <T>(url: string, token: string): Promise<T> => {
    try {
        const response = await fetch(
            url,
            token && { headers: { Authorization: `token ${token}` } },
        );

        if (response.status === 404) {
            return null;
        }

        if (response.status === 401) {
            console.log('Token Expired');
            return null;
        }
        return response.json();
    } catch (error) {
        throw new Error(error);
    }
};

const getIssues = async (accessToken: string): Promise<Issue[] | null> => {
    const query = getDrillBountyUrlQuery();
    let url = ``;
    let data = null;
    const per_page = 100;
    const paginated_data = [];
    const MAX_PAGES = 10;
    let i = 1;
    for (i; i < MAX_PAGES; i++) {
        url = `${process.env.GITHUB_API}/search/issues?${query}&page=${i}&per_page=${per_page}`;
        data = await getGithubData<SearchApiResponse>(url, accessToken);

        if (data === null || data.length === 0) {
            break;
        }

        const { items: issues } = data;
        paginated_data.push(...issues);
        if (data.total_count < i * per_page) {
            break;
        }
    }

    // TODO: Data cleanse and sanitize (otherwise large object data passing may pop buffer or cache limit)
    // const newArr = paginated_data.map(obj => {
    //     return {
    //         ...obj,
    //         description: 'nullified',
    //         body: 'nullified',
    //     };

    //     return obj;
    // });
    //   console.log(`newArr: `, newArr);

    if (paginated_data.length == 0) {
        console.log(`i got nuthn for you..`);
        return null;
    }

    const issues = paginated_data;

    if (!issues.length) {
        return null;
    }
    return issues.reverse();
};

const getIssuesByAssignee = async (
    username: string,
    accessToken: string,
): Promise<Issue[] | null> => {
    const query = getDrillBountyUrlQuery([`author:${username}`]);
    const url = `${process.env.GITHUB_API}/search/issues?${query}&per_page=100`;
    const { items: issuesByAssignee } = await getGithubData<SearchApiResponse>(
        url,
        accessToken,
    );

    if (!issuesByAssignee) {
        return null;
    }

    return issuesByAssignee.reverse();
};

const getIssuesByAssignee2 = async (username: string) => {
    console.log('USERNAME', { username });
    const githuRestApi = await authenticateGithubApp();
    const issues = (
        await githuRestApi.issues.listForRepo({
            owner: process.env.GITHUB_OWNER,
            repo: process.env.GITHUB_REPO,
            labels: `${DRILL_BOUNTY_CHALLENGE_LABEL},${username}`,
        })
    ).data;

    return issues.reverse();
};

const getIssue = async (
    id: number,
    accessToken: string,
): Promise<Issue | null> => {
    const url = `${process.env.GITHUB_API}/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/issues/${id}`;
    const issue = await getGithubData<Issue>(url, accessToken);

    if (!issue) {
        return null;
    }

    return issue;
};

const getIssues2 = async () => {
    const githuRestApi = await authenticateGithubApp();
    const issues = await githuRestApi.issues.listForRepo({
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        labels: `${DRILL_BOUNTY_CHALLENGE_LABEL}`,
    });
    return issues.data.reverse() as Issue[];
};

const getIssuesPagingUpgrade = async (): Promise<Issue[] | null> => {
    let response = null;
    const per_page = 100;
    const paginated_data = [];
    const MAX_PAGES = 10;
    let i = 1;
    const githuRestApi = await authenticateGithubApp();
    for (i; i < MAX_PAGES; i++) {
        response = await githuRestApi.issues.listForRepo({
            owner: process.env.GITHUB_OWNER,
            repo: process.env.GITHUB_REPO,
            labels: `${DRILL_BOUNTY_CHALLENGE_LABEL}`,
            page: i,
            per_page: 100,
        });

        if (response.data === null || response.data.length === 0) {
            break;
        }

        paginated_data.push(...response.data);
        if (response.data.length < i * per_page) {
            break;
        }
    }

    // TODO: Data cleanse and sanitize (otherwise large object data passing may pop buffer or cache limit)
    // const newArr = paginated_data.map(obj => {
    //     return {
    //         ...obj,
    //         description: 'nullified',
    //         body: 'nullified',
    //     };

    //     return obj;
    // });
    //   console.log(`newArr: `, newArr);

    if (paginated_data.length == 0) {
        console.log(`i got nuthn for you..`);
        return null;
    }

    const issues = paginated_data;

    if (!issues.length) {
        return null;
    }
    return issues.reverse();
};

const getUser = async (
    username: string,
    accessToken: string,
): Promise<User | null> => {
    const url = `${process.env.GITHUB_API}/users/${username}`;
    const user = await getGithubData<GithubUser>(url, accessToken);

    if (!user) {
        return null;
    }
    return user;
};

const getCurrentUser = async (accessToken: string): Promise<User | null> => {
    const url = `${process.env.GITHUB_API}/user`;
    const user = await getGithubData<GithubUser>(url, accessToken);

    if (!user) {
        return null;
    }

    return user;
};

// const getUniversityScore = async (university: string) => {
//     const githuRestApi = await authenticateGithubApp();

//     const response = await getIssuesPagingUpgrade();

//     response.filter() //first we filter using the labels (to get CALHACKS and HACKTX issues only, with the complete)

//     response.reduce((previousIssue, currentIssue) => {
//         console.log(previousIssue.labels)
//     })
// };

export {
    closeIssue,
    createIssue,
    createIssue2,
    getIssue,
    getIssues,
    getIssues2,
    getIssuesPagingUpgrade,
    getIssuesByAssignee,
    getIssuesByAssignee2,
    getUser,
    getCurrentUser,
    authenticateGithubApp,
    DRILL_BOUNTY_CLOSED_LABEL,
    DRILL_BOUNTY_ENABLED_LABEL,
    DRILL_BOUNTY_CHALLENGE_LABEL,
    DRILL_BOUNTY_POINTS_LABEL,
};
