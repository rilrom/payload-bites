# @payload-bites/astro-richtext-renderer

## 3.0.0-beta.0

### Major Changes

- feat!: upgrade to payload 4.0.0-beta.10 ([c6b717e](https://github.com/rilrom/payload-bites/commit/c6b717e))

#### BREAKING CHANGES

- Requires Astro `^7.4.7` and `@payloadcms/richtext-lexical` `>=4.0.0-beta.10 <5.0.0`. Stay on 2.x for Payload 3 and Astro 5.
- The default `AstroConvertersFunction` type adds `blockType: string` to block and inline block nodes.
- The upload converter reads `variants` instead of `sizes`.

## 2.2.1

### Patch Changes

- fix: resolve type issues ([1b221a7](https://github.com/rilrom/payload-bites/commit/1b221a7))

## 2.2.0

### Minor Changes

- feat: implement unit tests ([95fa0ef](https://github.com/rilrom/payload-bites/commit/95fa0ef))

## 2.1.1

### Patch Changes

- fix: UploadAstroConverter ([9984e2f](https://github.com/rilrom/payload-bites/commit/9984e2f))

## 2.1.0

### Minor Changes

- feat: replace eslint and prettier with biome and stylelint ([95e34e2](https://github.com/rilrom/payload-bites/commit/95e34e2))

## 2.0.0

### Major Changes

- feat!: migrate to astro converters ([3f1a3bf](https://github.com/rilrom/payload-bites/commit/3f1a3bf))

#### BREAKING CHANGES

- Replaced the HTML converters implementation with native astro component converters. Any custom nodes, blocks or inline blocks will need to be migrated to `.astro` files.

## 1.0.0

### Major Changes

- feat: astro richtext renderer release
