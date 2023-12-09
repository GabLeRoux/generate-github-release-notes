export function formatReleaseNotes(prs: any[]): string {
    let notes = '## What\'s Changed\n';
    for (const pr of prs) {
        notes += `* ${pr.title} by @${pr.user.login} in ${pr.html_url}\n`;
    }
    return notes;
}
