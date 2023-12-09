# Generate GitHub Release Notes Action

This GitHub Action generates structured release notes by fetching and formatting merged pull requests between specified
tags. It mirrors the functionality of GitHub's "Generate Release Notes" feature available on the release creation page.

## Features

- **Automated Release Notes Generation:** Creates release notes based on merged PRs between tags.
- **New Contributors Detection:** Optionally identifies first-time contributors to your project.
- **Customizable Tag Comparison:** Specify base and head tags for comparison.
- **GitHub Token Support:** Utilizes GitHub token for repository access.

## Configuration

To use this action in your workflow, add the following step:

```yaml
- name: Generate Release Notes
  uses: gableroux/generate-github-release-notes@v0.1
  with:
    repository: ${{ github.repository }}
    base_tag: ${{ github.event.release.tag_name }}
    head_tag: ${{ github.sha }}
    github_token: ${{ secrets.GITHUB_TOKEN }}
    # auto_detect_new_contributors: 'true' # Optional, set to 'true' to detect new contributors, this is still experimental.
```

## Usage

1. **Include the Action:** Incorporate the action in your GitHub workflow.
2. **Set Tags:** Define `base_tag` and `head_tag` to specify the tag range.
3. **GitHub Token:** Provide a GitHub token for access to repository data.
4. **Run the Workflow:** Trigger the workflow to generate release notes.

## Contributing

Contributions are welcome! Feel free to fork the repo, create a feature branch, commit your changes, and open a pull
request.

## License

This project is licensed under the [MIT License](LICENSE.md). © [Gabriel Le Breton](https://gableroux.com)