import {formatReleaseNotes} from '../src/formatter';

describe('formatReleaseNotes', () => {

    it('formats a list of PRs correctly with new contributors', () => {
        const prs = [
            {title: 'Fix bug', user: {login: 'user1'}, html_url: 'https://github.com/user/repo/pull/1'}
        ];
        const newContributors = ['user1'];

        const notes = formatReleaseNotes(prs, newContributors, 'user/repo', 'v1.0.0', 'v1.1.0', false);
        expect(notes).toContain('* Fix bug by @user1 in https://github.com/user/repo/pull/1');
        expect(notes).toContain('## New Contributors\n* @user1 made their first contribution in this release');
    });

    it('formats a list of PRs correctly', () => {
        const prs = [
            {title: 'Fix bug', user: {login: 'user1'}, html_url: 'https://github.com/user/repo/pull/1'}
        ];

        const notes = formatReleaseNotes(prs, [], 'user/repo', 'v1.0.0', 'v1.1.0', false);
        expect(notes).toContain('* Fix bug by @user1 in https://github.com/user/repo/pull/1');
    });

    it('handles empty PR list', () => {
        const notes = formatReleaseNotes([], [], 'user/repo', 'v1.0.0', 'v1.1.0', false);
        expect(notes).toContain('## What\'s Changed');
    });

});
