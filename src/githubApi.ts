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
    const url = `https://api.github.com/repos/${repo}/pulls`;
    const headers = { 'Authorization': `Bearer ${token}` };

    try {
        // Explicitly declare the type of allClosedPRs
        let allClosedPRs: any[] = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
            const params = { state: 'closed', per_page: 100, page: page };
            const response = await axios.get(url, { headers, params });

            if (response.data.length > 0) {
                allClosedPRs = [...allClosedPRs, ...response.data];
                page++;
            } else {
                hasMore = false;
            }
        }

        // TODO: Add your filtering logic here

        return allClosedPRs.filter((pr: any) => pr.merged_at !== null);

    } catch (error) {
        console.error('Error fetching pull requests:', error);
        return [];
    }
}

