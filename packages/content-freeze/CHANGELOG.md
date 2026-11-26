# @payload-bites/content-freeze

## 2.0.0-beta.1

### Patch Changes

- fix: stop plugins mutating their default options ([db32fcc](https://github.com/rilrom/payload-bites/commit/db32fcc))

## 2.0.0-beta.0

### Major Changes

- feat!: upgrade to payload 4.0.0-beta.10 ([c6b717e](https://github.com/rilrom/payload-bites/commit/c6b717e))

#### BREAKING CHANGES

- Requires Payload 4 (`>=4.0.0-beta.10 <5.0.0`), next `>=16.4.5 <17.0.0` and react `^19.3.1`. Stay on 1.x for Payload 3.
- A custom `validate` access function is now denied during a freeze, like `create`, `update` and `delete`.
- Styles moved from SCSS to plain CSS. Overrides using Payload 3 `--theme-*` variables no longer apply.

## 1.4.0

### Minor Changes

- feat!: raise minimum payload version for security advisories and align peer dependencies ([b9cd3c5](https://github.com/rilrom/payload-bites/commit/b9cd3c5))

#### BREAKING CHANGES

- Bumped the minimum payload version to 3.90.0 to address [multiple security advisories](https://github.com/payloadcms/payload/security/advisories).
- Aligned the @payloadcms/translations, @payloadcms/ui and next peer dependencies with the versions payload 3.90.0 requires.

## 1.3.0

### Minor Changes

- feat: update peer deps to include next@^16.2.6 ([d15c148](https://github.com/rilrom/payload-bites/commit/d15c148))

## 1.2.0

### Minor Changes

- feat: replace eslint and prettier with biome and stylelint ([95e34e2](https://github.com/rilrom/payload-bites/commit/95e34e2))
- feat: add translations ([6f8830a](https://github.com/rilrom/payload-bites/commit/6f8830a))

## 1.1.0

### Minor Changes

- feat!: upgrade dependencies ([c134231](https://github.com/rilrom/payload-bites/commit/c134231))

#### BREAKING CHANGES

- Bumped the minimum next version to address [CVE-2025-55184](https://www.cve.org/CVERecord?id=CVE-2025-55184) and [CVE-2025-67779](https://www.cve.org/CVERecord?id=CVE-2025-67779).

## 1.0.0

### Major Changes

- feat: content freeze release
