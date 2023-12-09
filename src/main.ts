import * as core from '@actions/core';
import { getMergedPRs, getAllContributors, getContributorsForRange } from './githubApi';
import { formatReleaseNotes } from './formatter';

export async function run() {
    try {
        const repo = core.getInput('repository', { required: true });
        const baseTag = core.getInput('base_tag', { required: true });
        const headTag = core.getInput('head_tag', { required: true });
        const token = core.getInput('github_token', { required: true });
        const autoDetectNewContributors = core.getInput('auto_detect_new_contributors') === 'true';
        const useCompareChangelog = core.getInput('use_compare_changelog') === 'true';

        let newContributors: string[] = [];

        if (autoDetectNewContributors) {
            const allContributors = await getAllContributors(repo, token);
            const releaseContributors = await getContributorsForRange(repo, baseTag, headTag, token);
            newContributors = releaseContributors.filter(contributor => !allContributors.includes(contributor));
        }

        const prs = await getMergedPRs(repo, baseTag, headTag, token);
        const notes = formatReleaseNotes(prs, newContributors, repo, baseTag, headTag, useCompareChangelog);

        core.setOutput('notes', notes);
    } catch (error) {
        core.setFailed(`Action failed with error: ${error}`);
    }
}

run();
