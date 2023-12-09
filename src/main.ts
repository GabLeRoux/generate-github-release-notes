import * as core from '@actions/core';
import { getMergedPRs } from './githubApi';
import { formatReleaseNotes } from './formatter';

export async function run() {
    try {
        const repo = core.getInput('repository');
        const baseTag = core.getInput('base_tag');
        const headTag = core.getInput('head_tag');
        const token = core.getInput('github_token');
        
        const prs = await getMergedPRs(repo, baseTag, headTag, token);
        const notes = formatReleaseNotes(prs);

        core.setOutput('notes', notes);
    } catch (error) {
        core.setFailed(`Action failed with error ${error}`);
    }
}

run();
