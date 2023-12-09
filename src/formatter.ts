export function formatReleaseNotes(prs: any[], newContributors: string[], repo: string, baseTag: string, headTag: string, useCompareChangelog: boolean): string {
    let notes = '## What\'s Changed\n';

    // Formatting the PRs section
    prs.forEach(pr => {
        notes += `* ${pr.title} by @${pr.user.login} in ${pr.html_url}\n`;
    });

    // Adding New Contributors section if there are any new contributors
    if (newContributors.length > 0) {
        notes += '\n## New Contributors\n';
        newContributors.forEach(contributor => {
            notes += `* @${contributor} made their first contribution in this release\n`;
        });
    }

    // Constructing the changelog URL based on user preference
    const changelogUrl = useCompareChangelog
        ? `https://github.com/${repo}/compare/${baseTag}...${headTag}`
        : `https://github.com/${repo}/commits/${headTag}`;

    notes += `\n**Full Changelog**: [${changelogUrl}](${changelogUrl})\n`;

    return notes;
}
