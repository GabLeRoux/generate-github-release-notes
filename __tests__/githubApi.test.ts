import {getAllContributors, getContributorsForRange, getMergedPRs} from '../src/githubApi';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getMergedPRs', () => {
    it('fetches merged PRs successfully', async () => {

        mockedAxios.get.mockResolvedValueOnce({
            data: {
                commits: [
                    {commit: {message: "Merge pull request #1 from user/branch"}},

                ]
            }
        });

        mockedAxios.get.mockResolvedValueOnce({
            data: {id: 1, merged_at: '2021-01-01T00:00:00Z'}
        });

        const prs = await getMergedPRs('user/repo', 'v1.0.0', 'v1.1.0', 'token');
        expect(prs).toHaveLength(1);
        expect(prs[0].id).toBe(1);
    });

    it('handles API error', async () => {
        mockedAxios.get.mockRejectedValue(new Error('API Error'));
        await expect(getMergedPRs('user/repo', 'v1.0.0', 'v1.1.0', 'token')).rejects.toThrow('API Error');
    });

    it('filters non-merged PRs', async () => {

        mockedAxios.get.mockResolvedValueOnce({
            data: {
                commits: [
                    {commit: {message: "Merge pull request #1 from user/branch"}},
                    {commit: {message: "Merge pull request #2 from user/branch"}}
                ]
            }
        });

        mockedAxios.get
            .mockResolvedValueOnce({data: {id: 1, merged_at: '2021-01-01T00:00:00Z'}})
            .mockResolvedValueOnce({data: {id: 2, merged_at: null}});

        const prs = await getMergedPRs('user/repo', 'v1.0.0', 'v1.1.0', 'token');

        expect(prs).toHaveLength(1);
        expect(prs[0].id).toBe(1);
    });

    it('fetches all contributors successfully', async () => {
        mockedAxios.get.mockResolvedValue({
            data: [{login: 'user1'}, {login: 'user2'}]
        });

        const contributors = await getAllContributors('user/repo', 'token');
        expect(contributors).toEqual(['user1', 'user2']);
    });

    it('fetches contributors for range successfully', async () => {
        mockedAxios.get.mockResolvedValue({
            data: [{user: {login: 'user1'}, merged_at: '2021-01-01T00:00:00Z'}]
        });

        const contributors = await getContributorsForRange('user/repo', 'v1.0.0', 'v1.1.0', 'token');
        expect(contributors).toEqual(['user1']);
    });
});
