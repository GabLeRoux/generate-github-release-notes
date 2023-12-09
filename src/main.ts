import * as core from '@actions/core';
import { getMergedPRs } from './githubApi';
import { formatReleaseNotes } from './formatter';

export async function run() {
    try {
        const repo = process.env.REPOSITORY || core.getInput('repository');
        const baseTag = process.env.BASE_TAG || core.getInput('base_tag');
        const headTag = process.env.HEAD_TAG || core.getInput('head_tag');
        const token = process.env.GITHUB_TOKEN || core.getInput('token');
        
        const prs = await getMergedPRs(repo, baseTag, headTag, token);
        const notes = formatReleaseNotes(prs);

        // TODO: get rid of this conditional once we have a better way to test
        if (process.env.LOCAL_TEST) {
            console.log(`Notes: ${notes}`);
            console.log(`PRs: ${JSON.stringify(prs)}`);
            console.log(`Repo: ${repo}`);
            console.log(`Base Tag: ${baseTag}`);
            console.log(`Head Tag: ${headTag}`);
        } else {
            core.setOutput('notes', notes);
        }

        core.setOutput('notes', notes);
    } catch (error) {
        core.setFailed(`Action failed with error ${error}`);
    }
}

run();
