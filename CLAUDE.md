# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Payload bites is a monorepo containing bite-sized Payload v3 plugins and tools. Each plugin is published as an independent npm package under `@payload-bites/*`.

**Current plugins:**
- `image-search` - Search for images using providers (Unsplash, Pexels, Pixabay)
- `fullscreen-editor` - Fullscreen mode for Lexical rich text editor
- `audit-fields` - Add createdBy/lastModifiedBy audit fields
- `soft-delete` - Soft delete functionality for documents
- `activity-log` - Track CMS activity
- `broken-link-checker` - Detect and prevent broken links
- `content-freeze` - Freeze content during critical moments

## Monorepo Structure

This is a pnpm workspace managed by Turbo:

```
payload-bites/
├── packages/           # Published plugins (source code)
│   ├── image-search/
│   ├── soft-delete/
│   └── ...
├── apps/              # Demo/test apps for each plugin
│   ├── image-search/
│   ├── soft-delete/
│   └── ...
└── packages/
    ├── eslint-config/      # Shared ESLint configuration
    └── typescript-config/  # Shared TypeScript configuration
```

## Development Commands

### Root-level commands (uses Turbo)
- `pnpm dev` - Run dev mode across all packages
- `pnpm build` - Build all packages
- `pnpm lint` - Lint all packages
- `pnpm tsc` - Type check all packages
- `pnpm format` - Format code with Prettier
- `pnpm clean` - Clean build artifacts (node_modules, .next, .turbo, dist)

### Package-specific development
Use Turbo filters to work on specific packages:

```bash
# Develop a plugin and its demo app together
pnpm dev --filter PACKAGE_NAME --filter @payload-bites/PACKAGE_NAME

# Example: work on image-search plugin + app
pnpm dev --filter image-search --filter @payload-bites/image-search
```

### Individual package scripts
Within `packages/*/`:
- `pnpm dev` - Build in watch mode (TypeScript + SWC)
- `pnpm build` - Production build
- `pnpm lint` - Run ESLint
- `pnpm tsc` - Type check without emit

Within `apps/*/`:
- `pnpm dev` - Start Next.js dev server with Turbopack
- `pnpm devsafe` - Clean .next and start dev server
- `pnpm build` - Build Next.js app
- `pnpm generate:types` - Generate Payload types
- `pnpm generate:importmap` - Generate Payload import map

## Plugin Architecture

### Standard plugin structure
```
packages/PLUGIN_NAME/
├── src/
│   ├── index.ts              # Main plugin export
│   ├── types.ts              # TypeScript types
│   ├── defaults.ts           # Default plugin options
│   ├── translations.ts       # i18n translations
│   ├── components/           # React components
│   ├── endpoints/            # API endpoints
│   ├── classes/              # Core logic classes
│   ├── utils/                # Utility functions
│   └── exports/
│       ├── client.ts         # Client-side component exports
│       ├── rsc.ts            # Server component exports
│       └── utilities.ts      # Utility exports
├── package.json
├── .swcrc                    # SWC build configuration
└── README.md
```

### Plugin implementation pattern
All plugins follow this functional pattern:

```typescript
export const pluginNamePlugin =
  (pluginOptions?: PluginOptions) =>
  (incomingConfig: Config): Config => {
    // Merge options with defaults
    const mergedOptions = Object.assign(defaultOptions, pluginOptions);

    const config = { ...incomingConfig };

    // Check if plugin is enabled
    if (mergedOptions.enabled === false) {
      return config;
    }

    // Add translations
    config.i18n = {
      translations: deepMerge(translations, config.i18n?.translations),
    };

    // Modify collections/globals/endpoints as needed
    // ...

    return config;
  };
```

### Component exports
Plugins export components via separate entry points defined in `package.json`:

```json
{
  "exports": {
    ".": "./dist/index.js",
    "./client": "./dist/exports/client.js",
    "./rsc": "./dist/exports/rsc.js"
  }
}
```

Components are injected into Payload config using string paths:
```typescript
"@payload-bites/plugin-name/client#ComponentName"
```

## Build System

### TypeScript + SWC
Packages use dual compilation:
- **TypeScript** (`tsc`) - Generates type definitions (`.d.ts`)
- **SWC** - Transpiles code for fast builds

Build process copies non-TS assets (CSS, images, etc.) via `copyfiles`.

### TypeScript configuration
All packages extend `@payload-bites/typescript-config/base.json`:
- Target: ES2022
- Module: NodeNext
- Strict mode enabled
- `noUncheckedIndexedAccess: true`

## Testing

Tests use Playwright for end-to-end testing. Example test structure in `apps/*/test/`:
- Main spec file (e.g., `index.spec.ts`)
- Helper functions in separate files
- Tests verify UI interactions and field behavior

## Internationalization

Translation files located at `src/translations.ts`:
- Add strings to the `en` locale first
- Translate to all Payload-supported languages
- Use `useTranslation` hook and `t()` function in components:

```typescript
const { t } = useTranslation()
t('yourStringKey')
```

## Environment & Requirements

- **Node**: >= 22
- **pnpm**: ^10.19.0 (enable via `corepack enable`)
- **Database**: Postgres (default)
  - Set `DATABASE_URI` in app `.env` files
  - Auto-login during dev: set `TEST_USER`, `TEST_PASSWORD`, `PAYLOAD_DROP_DATABASE=true`

## Version Control

Uses Conventional Commits for PR titles:
- `feat(plugin-name): description` - New feature
- `fix(plugin-name): description` - Bug fix
- `chore: description` - Maintenance (unscoped)

All commits in a PR are squashed using the PR title as the commit message.

## Code Quality

- **Linting**: ESLint must pass with zero errors (warnings acceptable when appropriate)
- **Formatting**: Prettier automatically formats on save (VSCode settings provided)
- **VSCode settings**: Pre-configured in `.vscode/settings.json`
  - Auto-save on focus change
  - Format on save/paste/type
  - ESLint auto-fix on save

## Key Technical Details

### Payload version pinning
The project pins Payload to a specific version via pnpm overrides in root `package.json`:
```json
{
  "pnpm": {
    "overrides": {
      "payload": "3.68.5",
      "@payloadcms/db-postgres": "3.68.5",
      // ... other Payload packages
    }
  }
}
```

### deepMerge utility
Most plugins use a `deepMerge` utility to merge configurations without overwriting nested objects.

### Node options
All Next.js commands use `NODE_OPTIONS=--no-deprecation` to suppress deprecation warnings.
