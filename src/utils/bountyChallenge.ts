import { Bounty, BountyChallenge, IssueLabel } from 'types/bounty';
import { DrillResponse } from 'types/drill';
import { Issue } from 'types/github';
import { formatDate } from 'utils';
import { getDrillResponse } from 'lib/drill';

/**
 * Returns `true` if the `name` attribute of the provided Bounty matches the
 * search query.
 *
 * @param bounty Bounty to filter
 * @param rawQuery Query before unformatting
 */
const filterBounties = ({ name }: Bounty, rawQuery: string) => {
    const unformat = (str: string) => str.toLowerCase();
    const query = unformat(rawQuery);

    return unformat(name).includes(query);
};

/**
 * Returns a list of DrillResponse objects corresponding to a given list of
 * Issue objects.
 *
 * @param issues List of Issue objects
 */
const getDrillResponsesFromIssues = async (
    issues: Issue[],
): Promise<DrillResponse[]> =>
    Promise.all(issues.map(async ({ number }) => getDrillResponse(number)));

/**
 * Merges an Issue object and a DrillResponse object into a Bounty object.
 *
 * @param issue Issue object
 * @param drillResponse DrillResponse object
 */
const toBountyChallenge = (
    issue: Issue,
    drillResponse: DrillResponse,
): BountyChallenge => {
    const {
        created_at,
        body,
        html_url,
        labels,
        number,
        state,
        title,
        user: creator,
    } = issue;

    const points = labels.filter(z =>
        z.name.includes('points'),
    ) as unknown as IssueLabel[];
    const university = labels.filter(
        z => z.name.includes('CALHACKS') || z.name.includes('HACKTX'),
    ) as unknown as IssueLabel[];
    let reward = 0;
    points.forEach((point: IssueLabel) => {
        reward = Number(point?.name.split(':')[1]);
    });

    const assignee = labels.filter(
        e =>
            !e.name.includes('challenge') &&
            !e.name.includes('points') &&
            !e.name.includes('completed'),
    );

    const assigneeUsername = creator.login;
    const rank = 9999;

    return {
        address: drillResponse?.address?.toString() ?? null,
        createdAt: formatDate(created_at),
        description: body,
        githubUrl: html_url,
        hunter: assigneeUsername,
        id: number,
        mint: drillResponse?.mint?.toString() ?? null,
        name: title,
        owner: assigneeUsername,
        reward: reward,
        state: state as 'open' | 'closed',
        labels,
        tags: labels.map(label => ({ value: label.name })),
        rank,
        university: university[0] ? university[0].name : null,
    };
};

/**
 * Merges a list of Issue objects and a list of DrillResponse objects into a
 * list of Bounty objects.
 *
 * @param issues List of Issue objects.
 * @param drillResponses List of DrillResponse objects.
 */
const toBountyChallengeList = (
    issues: Issue[],
    drillResponses: DrillResponse[],
): BountyChallenge[] =>
    issues
        .filter(
            issue =>
                issue.state === 'open' &&
                issue.labels.some(label => label.name === 'challenge') &&
                issue.labels.some(label => label.name === 'completed'),
        )
        .map((issue, i) => toBountyChallenge(issue, drillResponses[i]));

/**
 * Returns a string that represents the description of the NFT challengers can
 * claim once the event is done.
 */
const getNftDescription = () =>
    'This NFT was originally minted during the Bogotá Dev Challenge.';

export {
    filterBounties as filterBountyChallenges,
    getDrillResponsesFromIssues,
    toBountyChallenge,
    toBountyChallengeList,
    getNftDescription,
};
