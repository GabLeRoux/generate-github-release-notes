# Generate GitHub Release Notes Action

This GitHub Action replicates the functionality of the "Generate Release Notes" button found on GitHub's release
creation page. It fetches merged pull requests between specified tags and formats them into structured release notes.

## Configuration

Add the following step to your workflow:

```yaml
- name: Generate Release Notes
  uses: gableroux/generate-github-release-notes@v1
  with:
    repository: ${{ github.repository }}
    base_tag: ${{ github.event.release.tag_name }}
    head_tag: ${{ github.sha }}
    github_token: ${{ secrets.GITHUB_TOKEN }}
```

## Usage

Include the action in your workflow, and it will automatically generate release notes based on merged PRs between the
specified tags.

## Contributing

Contributions are welcome! Feel free to fork the repo, create a feature branch, commit your changes, and open a pull
request.

## License

[MIT](LICENSE.md) © [Gabriel Le Breton](https://gableroux.com)
