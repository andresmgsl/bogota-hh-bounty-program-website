import { getIssue, getIssues, getIssuesByAssignee } from './github';
import { toBounty, toBountyList } from 'utils/bounties';
import { toBountyChallenge, toBountyChallengeList } from 'utils/bountyChallenge';

import { getDrillResponse } from './drill';

const getBounties = async (accessToken: string) => {
    const issues = await getIssues(accessToken);

    if (!issues) {
        return null;
    }

    return toBountyList(issues, []);
};

const getBountyChallenges = async (accessToken: string) => {
    console.log(`getBountyChallenges..`)
    const issues = await getIssues(accessToken);

    if (!issues) {
        return null;
    }
    return toBountyChallengeList(issues, []);
};

const getBountiesByAssignee = async (username: string, accessToken: string) => {
    const issuesByAssignee = await getIssuesByAssignee(username, accessToken);

    if (!issuesByAssignee) {
        return null;
    }

    return toBountyList(issuesByAssignee, []);
};

const getBounty = async (id: number, accessToken: string) => {
    const issue = await getIssue(id, accessToken);

    if (!issue) {
        return null;
    }

    const drillResponse = await getDrillResponse(id);

    if (!drillResponse) {
        return null;
    }

    return toBounty(issue, drillResponse);
};

const getBountyReward = async (id: number) => {
    const drillResponse = await getDrillResponse(id);

    if (!drillResponse) {
        return null;
    }
    console.log(drillResponse);
    return Number(drillResponse.amount);
};

export { getBounty, getBountyReward, getBounties, getBountiesByAssignee , getBountyChallenges};
