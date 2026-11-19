# @payload-bites/broken-link-checker

## 2.0.0-beta.0

### Major Changes

- feat!: upgrade to payload 4.0.0-beta.10 ([c6b717e](https://github.com/rilrom/payload-bites/commit/c6b717e))

#### BREAKING CHANGES

- Requires Payload 4 (`>=4.0.0-beta.10 <5.0.0`), next `>=16.4.5 <17.0.0` and react `^19.3.1`. Stay on 1.0.0-beta.x for Payload 3.
- Styles moved from SCSS to plain CSS. Overrides using Payload 3 `--theme-*` variables no longer apply.

## 1.0.0-beta.10

### Minor Changes

- feat!: raise minimum payload version for security advisories and align peer dependencies ([b9cd3c5](https://github.com/rilrom/payload-bites/commit/b9cd3c5))

#### BREAKING CHANGES

- Bumped the minimum payload version to 3.90.0 to address [multiple security advisories](https://github.com/payloadcms/payload/security/advisories).
- Aligned the @payloadcms/next, @payloadcms/translations, @payloadcms/ui, next and qs-esm peer dependencies with the versions payload 3.90.0 requires.

## 1.0.0-beta.9

### Minor Changes

- feat: update peer deps to include next@^16.2.6 ([d15c148](https://github.com/rilrom/payload-bites/commit/d15c148))

## 1.0.0-beta.8

### Minor Changes

- feat: replace eslint and prettier with biome and stylelint ([95e34e2](https://github.com/rilrom/payload-bites/commit/95e34e2))
- feat: add translations ([4e31645](https://github.com/rilrom/payload-bites/commit/4e31645))

## 1.0.0-beta.7

### Minor Changes

- feat!: upgrade dependencies ([c134231](https://github.com/rilrom/payload-bites/commit/c134231))

#### BREAKING CHANGES

- Bumped the minimum next version to address [CVE-2025-55184](https://www.cve.org/CVERecord?id=CVE-2025-55184) and [CVE-2025-67779](https://www.cve.org/CVERecord?id=CVE-2025-67779).

## 1.0.0-beta.6

### Minor Changes

- feat!: bump minimum react and next versions ([42235cc](https://github.com/rilrom/payload-bites/commit/42235cc))

#### BREAKING CHANGES

- Bumped the minimum versions of react and next to address [CVE-2025-55182](https://www.cve.org/CVERecord?id=CVE-2025-55182) and [CVE-2025-66478](https://github.com/vercel/next.js/security/advisories/GHSA-9qr9-h5gf-34mp).

## 1.0.0-beta.5

### Minor Changes

- feat: override linkinator options ([1fcdbc9](https://github.com/rilrom/payload-bites/commit/1fcdbc9))

### Patch Changes

- fix: 500 error on status check ([846d2a6](https://github.com/rilrom/payload-bites/commit/846d2a6))

## 1.0.0-beta.4

### Minor Changes

- feat: move link scanning to payload job ([e246950](https://github.com/rilrom/payload-bites/commit/e246950))

### Patch Changes

- fix: nested docs plugin compatibility ([e795124](https://github.com/rilrom/payload-bites/commit/e795124))

## 1.0.0-beta.3

### Minor Changes

- feat: add overrideBrokenLinksCollection ([4183e83](https://github.com/rilrom/payload-bites/commit/4183e83))

#### BREAKING CHANGES

- Replaced `brokenLinksAccess` with `overrideBrokenLinksCollection`.

## 1.0.0-beta.2

### Patch Changes

- fix: formatting ([bc30832](https://github.com/rilrom/payload-bites/commit/bc30832))
- chore: upgrade dependencies ([f6dad0e](https://github.com/rilrom/payload-bites/commit/f6dad0e))

## 1.0.0-beta.1

### Major Changes

- feat: broken link checker beta release ([d5f3ba5](https://github.com/rilrom/payload-bites/commit/d5f3ba5))

### Patch Changes

- chore: upload README video ([d3ca5c1](https://github.com/rilrom/payload-bites/commit/d3ca5c1))
