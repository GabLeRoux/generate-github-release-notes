"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatReleaseNotes = void 0;
function formatReleaseNotes(prs) {
    let notes = '## What\'s Changed\n';
    for (const pr of prs) {
        notes += `* ${pr.title} by @${pr.user.login} in ${pr.html_url}\n`;
    }
    return notes;
}
exports.formatReleaseNotes = formatReleaseNotes;
