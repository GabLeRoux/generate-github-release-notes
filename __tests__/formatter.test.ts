import { formatReleaseNotes } from '../src/formatter';

describe('formatReleaseNotes', () => {
    it('formats a list of PRs correctly', () => {
        const prs = [
            { title: 'Fix bug', user: { login: 'user1' }, html_url: 'https://github.com/user/repo/pull/1' }
        ];

        const notes = formatReleaseNotes(prs);
        expect(notes).toContain('* Fix bug by @user1 in https://github.com/user/repo/pull/1');
    });

    it('handles empty PR list', () => {
        const notes = formatReleaseNotes([]);
        expect(notes).toContain('## What\'s Changed');
    });
});
