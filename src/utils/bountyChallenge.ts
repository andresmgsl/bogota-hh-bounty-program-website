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
const toBountyChallenge = (issue: Issue, drillResponse: DrillResponse): BountyChallenge => {
    const {
        assignee,
        created_at,
        body,
        html_url,
        labels,
        number,
        state,
        title,
        user: creator,
    } = issue;

    const points = labels.filter(z => z.name.includes('points'))[0] as unknown as IssueLabel;
    const reward = Number(points?.name.split(':')[1]);
    const rank = 9999;

    return {
        address: drillResponse?.address?.toString() ?? null,
        createdAt: formatDate(created_at),
        description: body,
        githubUrl: html_url,
        ...(assignee && { hunter: assignee.login }),
        id: number,
        mint: drillResponse?.mint?.toString() ?? null,
        name: title,
        owner: creator.login,
        reward: reward,
        state,
        labels,
        tags: labels.map(label => ({ value: label.name })),
        rank,
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
): BountyChallenge[] => issues.map((issue, i) => toBountyChallenge(issue, drillResponses[i]));

export { filterBounties as filterBountyChallenges, getDrillResponsesFromIssues, toBountyChallenge, toBountyChallengeList };
