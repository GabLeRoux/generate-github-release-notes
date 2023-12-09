import axios from 'axios';

export async function getAllContributors(repo: string, token: string): Promise<string[]> {
    try {
        const url = `https://api.github.com/repos/${repo}/contributors`;
        const headers = { Authorization: `token ${token}` };
        const response = await axios.get(url, { headers });
        return response.data.map((contributor: any) => contributor.login);
    } catch (error) {
        console.error('Error fetching all contributors:', error);
        throw error;
    }
}

export async function getContributorsForRange(repo: string, baseTag: string, headTag: string, token: string): Promise<string[]> {
    try {
        // Fetch PRs or commits between baseTag and headTag
        // For simplicity, let's assume we are fetching PRs here
        // TODO: Figure out best way to fetch required data, this might not be the best way right now.
        const url = `https://api.github.com/repos/${repo}/pulls?state=closed&base=${baseTag}&head=${headTag}`;
        const headers = { Authorization: `token ${token}` };
        const response = await axios.get(url, { headers });

        const contributors = new Set<string>();
        response.data.forEach((pr: any) => {
            if (pr.merged_at) {
                contributors.add(pr.user.login);
            }
        });

        return Array.from(contributors);
    } catch (error) {
        console.error('Error fetching contributors for range:', error);
        throw error;
    }
}


export async function getMergedPRs(repo: string, baseTag: string, headTag: string, token: string): Promise<any[]> {
    // Step 1: Fetch commits between tags
    const commitsUrl = `https://api.github.com/repos/${repo}/compare/${baseTag}...${headTag}`;
    const commitsResponse = await axios.get(commitsUrl, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const commits = commitsResponse.data.commits;

    // Step 2 and 3: Filter and Fetch PR details
    const mergedPRs = [];
    for (const commit of commits) {
        const prNumber = extractPRNumberFromCommit(commit);
        if (prNumber) {
            const prUrl = `https://api.github.com/repos/${repo}/pulls/${prNumber}`;
            const prResponse = await axios.get(prUrl, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (prResponse.data.merged_at) {
                mergedPRs.push(prResponse.data);
            }
        }
    }

    return mergedPRs;
}

function extractPRNumberFromCommit(commit: any): number | null {
    const prMergeRegex = /Merge pull request #(\d+)/;
    const match = prMergeRegex.exec(commit.commit.message);
    if (match && match[1]) {
        return parseInt(match[1]);
    }
    return null;
}
