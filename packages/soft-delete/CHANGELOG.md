# @payload-bites/soft-delete

## 2.1.3

### Patch Changes

- fix: unnecessary rerenders ([9257790](https://github.com/rilrom/payload-bites/commit/9257790))

## 2.1.2

### Patch Changes

- chore: upgrade dependencies ([6e0fffd](https://github.com/rilrom/payload-bites/commit/6e0fffd))

## 2.1.1

### Patch Changes

- fix: incorrect peer dependencies ([f240759](https://github.com/rilrom/payload-bites/commit/f240759))

## 2.1.0

### Minor Changes

- feat: hide buttons in soft delete mode ([b35ddf2](https://github.com/rilrom/payload-bites/commit/b35ddf2))

## 2.0.2

### Patch Changes

- fix: missing restore button ([8372222](https://github.com/rilrom/payload-bites/commit/8372222))

## 2.0.1

### Patch Changes

- fix: improve selector specificity ([9cd2177](https://github.com/rilrom/payload-bites/commit/9cd2177))
- fix: incorrect button size ([233618f](https://github.com/rilrom/payload-bites/commit/233618f))

## 2.0.0

### Major Changes

- major: adjust toggle button placement ([99b99d7](https://github.com/rilrom/payload-bites/commit/99b99d7))

#### BREAKING CHANGES

Payload v3.39.0 or greater is required to use v2.x of the soft delete plugin.

### Patch Changes

- chore: upgrade dependencies ([bdd26e8](https://github.com/rilrom/payload-bites/commit/bdd26e8))

## 1.0.4

### Patch Changes

- chore: upgrade dependencies ([b85b4fa](https://github.com/rilrom/payload-bites/commit/b85b4fa))

## 1.0.3

### Patch Changes

- fix: incorrect placement of edit action buttons ([bad1e24](https://github.com/rilrom/payload-bites/commit/bad1e24))

## 1.0.2

### Patch Changes

- fix: collections with restored drafts not editable ([b55235c](https://github.com/rilrom/payload-bites/commit/b55235c))

## 1.0.1

### Patch Changes

- fix: allow other custom components to flow through ([47fda4f](https://github.com/rilrom/payload-bites/commit/47fda4f))

## 1.0.0

### Major Changes

- feat: soft delete release

## 1.0.0-beta.11

### Patch Changes

- chore: add documentation ([c2249d9](https://github.com/rilrom/payload-bites/commit/c2249d9))

## 1.0.0-beta.10

### Minor Changes

- feat: add visual indicator to collection title ([685b079](https://github.com/rilrom/payload-bites/commit/685b079))

## 1.0.0-beta.9

### Minor Changes

- feat: improve access control ([2bf2b6a](https://github.com/rilrom/payload-bites/commit/2bf2b6a))
- feat: replace custom modal with ConfirmationModal ([b74a2bc](https://github.com/rilrom/payload-bites/commit/b74a2bc))

#### BREAKING CHANGES

Payload v3.24.0 or greater is required to use v1.x of the soft delete plugin.

## 1.0.0-beta.8

### Minor Changes

- feat: upgrade dependencies ([3547e33](https://github.com/rilrom/payload-bites/commit/3547e33))

## 1.0.0-beta.7

### Patch Changes

- fix: update setup in README ([083d157](https://github.com/rilrom/payload-bites/commit/083d157))

## 1.0.0-beta.6

### Minor Changes

- feat: enable or disable hard delete and restore ([e392111](https://github.com/rilrom/payload-bites/commit/e392111))

#### BREAKING CHANGES

New plugin config structure

```
softDeletePlugin({
  collections: {
    posts: {},
    "posts-with-drafts": {
      enableRestore: false,
      enableHardDelete: false,
      softDeleteAccess: (args) => args.req.user.role === "admin",
    },
  },
}),
```

### Patch Changes

- fix: custom access control ([ab89c57](https://github.com/rilrom/payload-bites/commit/ab89c57))

## 1.0.0-beta.5

### Minor Changes

- feat: add translations ([f1b9972](https://github.com/rilrom/payload-bites/commit/f1b9972))

## 1.0.0-beta.4

### Minor Changes

- feat: add modals to hard delete ([e1092fa](https://github.com/rilrom/payload-bites/commit/e1092fa))

## 1.0.0-beta.3

### Patch Changes

- fix: merge baseListFilter ([b9160c1](https://github.com/rilrom/payload-bites/commit/b9160c1))
- fix: allow drafts to be soft deleted and restored ([e1dd9b5](https://github.com/rilrom/payload-bites/commit/e1dd9b5))

## 1.0.0-beta.2

### Patch Changes

- fix: ensure selection is reset on view change ([01c1281](https://github.com/rilrom/payload-bites/commit/01c1281))
- fix: add missing callback dependency ([d20f092](https://github.com/rilrom/payload-bites/commit/d20f092))
- fix: update access control ([1a8aa1e](https://github.com/rilrom/payload-bites/commit/1a8aa1e))

## 1.0.0-beta.1

### Major Changes

- feat: soft delete release
