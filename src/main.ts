import * as core from '@actions/core';
import { getMergedPRs, getAllContributors, getContributorsForRange } from './githubApi';
import { formatReleaseNotes } from './formatter';

export async function run() {
    try {
        // rewrite with env vars support
        // const repo = core.getInput('repository', { required: true });
        // const baseTag = core.getInput('base_tag', { required: true });
        // const headTag = core.getInput('head_tag', { required: true });
        // const token = core.getInput('github_token', { required: true });
        // const autoDetectNewContributors = core.getInput('auto_detect_new_contributors') === 'true';
        // const useCompareChangelog = core.getInput('use_compare_changelog') === 'true';

        const repo = process.env.REPOSITORY || core.getInput('repository', { required: true });
        const baseTag = process.env.BASE_TAG || core.getInput('base_tag', { required: true });
        const headTag = process.env.HEAD_TAG || core.getInput('head_tag', { required: true });
        const token = process.env.GITHUB_TOKEN || core.getInput('github_token', { required: true });
        const autoDetectNewContributors = !!(process.env.AUTO_DETECT_NEW_CONTRIBUTORS || core.getInput('auto_detect_new_contributors') === 'true');
        const useCompareChangelog = !!(process.env.USE_COMPARE_CHANGELOG || core.getInput('use_compare_changelog') === 'true');

        let newContributors: string[] = [];

        if (autoDetectNewContributors) {
            const allContributors = await getAllContributors(repo, token);
            const releaseContributors = await getContributorsForRange(repo, baseTag, headTag, token);
            newContributors = releaseContributors.filter(contributor => !allContributors.includes(contributor));
        }

        const prs = await getMergedPRs(repo, baseTag, headTag, token);
        const notes = formatReleaseNotes(prs, newContributors, repo, baseTag, headTag, useCompareChangelog);

        if (process.env.DEBUG) {
            console.log('repo', repo);
            console.log('baseTag', baseTag);
            console.log('headTag', headTag);
            // console.log('token', token);
            console.log('autoDetectNewContributors', autoDetectNewContributors);
            console.log('useCompareChangelog', useCompareChangelog);
            console.log('newContributors', newContributors);
            console.log('prs', prs);
            console.log('notes', notes);
        }

        core.setOutput('notes', notes);
    } catch (error) {
        core.setFailed(`Action failed with error: ${error}`);
    }
}

run();
