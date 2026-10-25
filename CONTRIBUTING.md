# Thanks for Improving the WLED Docs!

This is the official [WLED](https://github.com/wled/WLED) user documentation, published at [kno.wled.ge](https://kno.wled.ge) with [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/). Every fix and addition helps other users, so thank you! 😊

## The Easiest Way to Start

Click the pencil icon at the top right of any page on [kno.wled.ge](https://kno.wled.ge), or open a Markdown file here on GitHub and click the pencil. Make your edit, choose "Commit changes", and GitHub creates a pull request from your fork automatically.

## Making a Bigger Change

For larger edits, work from a branch in your own fork rather than your `main` branch. That way you can keep updating the PR while `main` stays clean.

1. Fork this repository and create a branch.
2. Edit the Markdown files under `docs/`.
3. Preview locally (see below).
4. Open a pull request against the `main` branch.

Please keep each PR focused on one topic, and add a short description of what you changed and why. No need to write an essay.

## Writing Style

We're harmonizing the docs for readability, so please follow the conventions in [AGENTS.md](AGENTS.md) (our contributor and AI-agent instructions). The short version:

- Write in **English**, in an informal, friendly tone. Contractions are welcome.
- Use **Title Case** for the page title and section headings.
- Keep sentences short and simple, so non-native English speakers can follow easily.
- Be concise: drop filler like "it is worth noting that" or "simply".
- Prefer plain words: "use" over "leverage", "feature" over "functionality".
- Only claim what the evidence supports (don't write "proves" when it "suggests").
- Use Material admonitions (`!!! info`, `!!! tip`, `!!! warning`, `!!! danger`) for callouts.
- Store images in `docs/assets/images/content/`, not on external hosts.
- Use root-relative internal links without the `.md` extension, e.g. `[Segments](/features/segments)`.

The full [PR review checklist](AGENTS.md#pr-review-checklist) in AGENTS.md is what maintainers check against.

## Adding a New Page

A new page won't appear in the site until it's registered in the `nav:` section of `mkdocs.yml`. See the [README](README.md) for a step-by-step example. Indentation in `mkdocs.yml` matters.

## Previewing Locally

**Docker (recommended):**

```bash
docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material
```

**Python/pip:**

```bash
pip install mkdocs-material
mkdocs serve
```

Then open <http://localhost:8000>.

## Deployment

You don't need to deploy anything. Merges to `main` trigger a GitHub Actions workflow that builds the site and publishes it to [kno.wled.ge](https://kno.wled.ge) automatically.

## Code of Conduct

Please be kind. This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md).
