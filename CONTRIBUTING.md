# Contributing to Payload bites

Below you'll find a set of guidelines for how to contribute to Payload bites.

## Opening issues

Before you submit an issue, please check all existing [open and closed issues](https://github.com/rilrom/payload-bites/issues) to see if your issue has previously been resolved or is already known.

If there is already an issue logged, feel free to upvote it by adding a :thumbsup: [reaction](https://github.com/blog/2119-add-reactions-to-pull-requests-issues-and-comments).

If you would like to submit a new issue, please provide as much information as possible to give me the best chance to help you in resolving it.

## Security issues & vulnerabilities

If you come across an issue related to security, or a potential attack vector within one of the payload bites packages, please DO NOT create a publicly viewable issue. Instead, please contact me directly at [`rilrom-dev@protonmail.com`](mailto:rilrom-dev@protonmail.com). I will do everything I can to respond to the issue as soon as possible.

## Creating new features or fixing bugs

I welcome any contribution towards new features of bug fixes, any help is greatly appreciated.

### Before starting

To help me work on new features, you can create a new feature request post in [GitHub discussions](https://github.com/rilrom/payload-bites/discussions) where we can discuss the architecture and approach before you get started on a pull request.

### Installation & requirements

Payload bites is structured as a monorepo. To install all required dependencies, you have to run `pnpm install` once in the root directory. Please note that pnpm is required, yarn or npm will not work. In most systems, the easiest way to install pnpm is to run `corepack enable` in your terminal.

Node v22 or higher is required. You can check your current node version by typing `node --version` in your terminal. The easiest way to switch between different node versions is to use [nvm](https://github.com/nvm-sh/nvm#intro).

### Development

There are convenience scripts available for developing each package. Run from the root of the project:

```bash
pnpm dev:PACKAGE_NAME
```

Alternatively, you can use Turbo filters directly:

```bash
pnpm dev --filter PACKAGE_NAME --filter @payload-bites/PACKAGE_NAME
```

I recommend using vscode to take advantage of the pre-configured settings provided for this project in the `.vscode` folder. This will handle any linting and formatting for you automatically as you work.

You must ensure that formatting and linting has been addressed prior to submitting a PR. I will accept Biome warnings when appropriate but will not accept new Biome errors or new Stylelint errors.

By default, my example apps should automatically log you in with a fresh database assuming you have set `TEST_USER` and `TEST_PASSWORD` in the apps `.env` file.

### Testing

This project uses Vitest for unit tests and Playwright for E2E tests. Tests must pass before creating a PR, and you should add tests when making changes that can be reasonably tested.

**Running tests:**

```bash
# Run all tests for a specific package
pnpm test --filter @payload-bites/PACKAGE_NAME

# Run only unit tests
pnpm test:unit --filter @payload-bites/PACKAGE_NAME

# Run only E2E tests
pnpm test:e2e --filter @payload-bites/PACKAGE_NAME

# Run all tests across all packages
pnpm test
```

**When to add tests:**

- Bug fixes should include a test that reproduces the bug
- New features should include tests for the core functionality
- E2E tests are located in `packages/*/src/__tests__/e2e/`
- Unit tests are located in `packages/*/src/__tests__/unit/`

### Using Postgres

Postgres is the default database used for this project. All you need to do is ensure Postgres is installed on your machine and you provide a `DATABASE_URI` environment variable in the relevant app project to get started.

### Using MongoDB

I have not tried using MongoDB for this project. I am open to contributions for how to best incorporate MongoDB into this project and updating these instructions.

### Pull requests

For all pull requests, you should be extremely descriptive about both your problem and proposed solution. If there are any affected open or closed issues, please leave the issue number in your PR description.

All commits within a PR are squashed when merged, using the PR title as the commit message. For that reason, please use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for your PR titles.

Here are some examples:

- `feat: add new feature`
- `fix: fix bug`
- `chore: anything that does not fit into the above categories`

If applicable, you must indicate the affected packages in parentheses to "scope" the changes. Changes that do not affect any specific packages do not require scoping.

Here are some examples:

- `feat(image-search): add new feature`
- `fix(soft-delete): fix bug`
- `chore: upgrade dependencies`

## Internationalization (i18n)

If your PR adds a string to the UI, we need to make sure to translate it into all the languages ​​that Payload supports. To do that:

- Find the appropriate internationalization file for your package. These are typically located in `src/translations.ts`, although some packages (e.g., fullscreen-editor) have separate i18n files for each lexical feature.
- Add the string to the English locale "en".
- Translate it to other languages using ChatGPT or Google translate. I am open to this step being left to me if needed.

To display translation strings in the UI, make sure to use the `t` utility of the `useTranslation` hook:

```ts
const { t } = useTranslation()
// ...
t('yourStringKey')
```
