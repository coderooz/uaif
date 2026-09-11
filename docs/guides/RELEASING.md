---
title: Releasing
description: Release process and workflow documentation for UAIF packages.
---

# Releasing UAIF

UAIF uses GitHub Releases to trigger automated npm publication. The release workflow builds, validates, publishes all 9 packages, and verifies publication on npm.

## Prerequisites

1. **npm scope**: The `@uaif` scope must be created on [npmjs.com](https://www.npmjs.com/)
2. **NPM_TOKEN**: A Classic Automation token with publish permission must be added as a repository secret (`Settings → Secrets → Actions → NPM_TOKEN`)
3. **CI must pass**: The `main` branch should have a green CI status before releasing

## Release Process

### 1. Pre-release Validation

Run the Release Readiness workflow to verify everything is in order:

```bash
# Via GitHub CLI
gh workflow run release-readiness.yml -f version=0.1.0 -f dry-run=true
```

Or via the GitHub UI: **Actions → Release Readiness → Run workflow**

### 2. Update Versions

Ensure all 9 publishable packages have the same version:

| Package                       | Path                              |
| ----------------------------- | --------------------------------- |
| `@uaif/core`                  | `packages/core`                   |
| `@uaif/cli`                   | `packages/cli`                    |
| `@uaif/adapter-clerk`         | `packages/adapters/clerk`         |
| `@uaif/adapter-firebase-auth` | `packages/adapters/firebase-auth` |
| `@uaif/adapter-mongodb`       | `packages/adapters/mongodb`       |
| `@uaif/adapter-cloudinary`    | `packages/adapters/cloudinary`    |
| `@uaif/adapter-react`         | `packages/adapters/react`         |
| `@uaif/adapter-next`          | `packages/adapters/next`          |
| `@uaif/adapter-expo`          | `packages/adapters/expo`          |

Also update the root `package.json` version.

### 3. Update CHANGELOG

Add a new section to `CHANGELOG.md` following [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added

- ...

### Changed

- ...

### Fixed

- ...
```

### 4. Create a Git Release

```bash
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin vX.Y.Z
```

Then create a GitHub Release from the tag:

```bash
gh release create vX.Y.Z --title "vX.Y.Z" --notes "Release notes here"
```

### 5. Automated Publication

Once the GitHub Release is published, the `release.yml` workflow runs automatically:

1. **Validation** — Lint, typecheck, format, build, test, version consistency, metadata, READMEs, npm pack dry-run
2. **Publish** — Publishes `@uaif/core` first, then `@uaif/cli`, then all 7 adapters
3. **Verify** — Waits 90s for npm propagation, then verifies all packages are available

### 6. Post-release

- Verify the [npm packages](https://www.npmjs.com/org/uaif) are live
- Verify the [documentation site](https://coderooz.github.io/uaif/) updated (if docs changed)

## Workflows

| Workflow                | Trigger                   | Purpose                                                       |
| ----------------------- | ------------------------- | ------------------------------------------------------------- |
| `release.yml`           | GitHub Release published  | Full release pipeline: validate → publish → verify            |
| `release-readiness.yml` | Manual dispatch           | Pre-release validation (dry run or full check)                |
| `ci.yml`                | Push to main, PRs         | Continuous integration (lint, typecheck, format, build, test) |
| `docs.yml`              | Push to main (docs paths) | Deploy VitePress docs to GitHub Pages                         |
| `security-audit.yml`    | Push/PR, weekly           | Secret scanning, dependency audit, env file check             |
| `slug-validation.yml`   | Push/PR                   | Verify repository slug and package URLs                       |
| `scheduled-health.yml`  | Weekly (Monday 9AM UTC)   | Repository health check                                       |

## Troubleshooting

### "Version mismatch" error

All 9 packages and the root `package.json` must have identical version strings. Update all of them before creating the release.

### "Missing README" error

Every publishable package must have a `README.md` in its directory.

### npm publish fails with auth error

Verify `NPM_TOKEN` is set in repository secrets and is a Classic Automation token (not a Granular Access Token).

### Packages not appearing on npm

npm propagation can take up to 5 minutes. The verification step waits 90 seconds. If packages still don't appear, check the [npm status page](https://status.npmjs.org/).

### Dry run failed but I want to publish anyway

Fix the issues, then create a new GitHub Release with the corrected version.
