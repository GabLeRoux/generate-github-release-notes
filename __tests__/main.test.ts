import * as core from '@actions/core';
import { run } from '../src/main';
import * as githubApi from '../src/githubApi';

jest.mock('@actions/core');
jest.mock('../src/githubApi');

describe('main action', () => {
    it('runs successfully and sets output', async () => {
        jest.spyOn(githubApi, 'getMergedPRs').mockResolvedValueOnce([
            // Mock PR data
        ]);
        jest.spyOn(core, 'setOutput');

        await run();

        expect(core.setOutput).toHaveBeenCalledWith('notes', expect.any(String));
    });

    it('handles errors', async () => {
        jest.spyOn(githubApi, 'getMergedPRs').mockRejectedValueOnce(new Error('Test Error'));
        jest.spyOn(core, 'setFailed');

        await run();

        expect(core.setFailed).toHaveBeenCalledWith(expect.stringContaining('Test Error'));
    });
});
