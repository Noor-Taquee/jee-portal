---
description: Reformat GitHub-generated release notes as the JEE Portal changelog.
---

Convert the GitHub-generated release notes below into a polished entry for `public/CHANGELOG.md`.

${input:releaseNotes:Paste GitHub's generated release notes, including the version, release date, and full changelog URL if available.}

Follow this structure:

# JEE Portal v{version} ({DD-MM-YYYY})

<!-- highlight -->

{One concise sentence summarizing the most important user-facing changes.}

## Features

- {Feature summary}

### UI and experience

- {User-visible interface or usability improvement}

### Accessibility

- {Accessibility improvement}

## Bug fixes

- {User-visible bug fix}

**Full Changelog**: {comparison URL}

Formatting and editorial rules:

- Keep the version heading, highlight comment, section names, and order exactly as shown. Include `UI and experience` and `Accessibility` subsections only when there are relevant changes. Keep `Features` and `Bug fixes` even if one has no items only when the release actually has no changes for that category; otherwise omit empty sections.
- Write concise, plain-language summaries focused on what changed for users. Group closely related pull requests into one bullet when that reads naturally. Do not copy GitHub's category headings or raw PR titles verbatim.
- Add each relevant pull request as a Markdown link in this format: `([PR #123](https://github.com/Noor-Taquee/jee-portal/pull/123) by @username)`. Preserve the exact PR number, URL, and author from the input. If a bullet references multiple PRs, link every PR and identify its author; do not invent or guess missing details.
- Include user-facing features, interface and accessibility improvements, and bug fixes. Exclude developer-only work such as refactoring, formatting, lint configuration, internal tooling, and repository housekeeping. When a change's user impact is unclear, omit it rather than claim an unsupported benefit.
- Do not invent features, effects, authors, dates, version numbers, or links. Use only facts present in the input. If required release metadata is missing, ask for it instead of fabricating it.
- Preserve the full comparison URL as the final line. Do not include an introduction, explanation, or commentary outside the changelog entry.
