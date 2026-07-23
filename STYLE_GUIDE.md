# WLED-Docs Style Guide

The complete, authoritative writing and formatting rules live in **[AGENTS.md](AGENTS.md)** — it is the single source of truth for both human contributors and AI agents, so this file stays a pointer rather than a copy (that way the rules never drift out of sync).

At a glance, the docs should be:

- **English**, in an **informal, friendly** tone. Contractions are welcome. 😊
- **Title Case** for the page title and every section heading (articles and short prepositions stay lowercase).
- **Simple and clear** — short sentences, common words, no unexplained jargon — so non-native English speakers can follow easily.
- **Concise** — cut filler like "it is worth noting that" or "simply". Prefer "use" over "leverage", "feature" over "functionality".
- **Calibrated** — match the verb to the evidence (don't write "proves" when it only "suggests").

Formatting essentials:

- Use Material admonitions (`!!! info`, `!!! tip`, `!!! warning`, `!!! danger`) for callouts.
- Store images in `docs/assets/images/content/`, never on external hosts.
- Use root-relative internal links without the `.md` extension, e.g. `[Segments](/features/segments)`.

For the full ruleset and the PR review checklist, see **[AGENTS.md](AGENTS.md)**.
