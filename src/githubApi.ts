import axios from 'axios';

export async function getMergedPRs(repo: string, baseTag: string, headTag: string, token: string) {
    const url = `https://api.github.com/repos/${repo}/pulls`;
    const headers = { 'Authorization': `token ${token}` };
    const params = { state: 'closed', base: baseTag, head: headTag };
    
    const response = await axios.get(url, { headers, params });
    return response.data.filter((pr: any) => pr.merged_at !== null);
}
