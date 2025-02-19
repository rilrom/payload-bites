# Soft delete

Never lose your Payload documents again, soft delete is here to save the day.

> [!IMPORTANT]
> This plugin is in beta and is subject to BREAKING CHANGES. It is not yet recommended to use this in a production environment.

https://github.com/user-attachments/assets/e8263a98-cb5b-447d-a6c5-b200091408c9

## Quick start

1. Install the plugin:

```shell
pnpm add @payload-bites/soft-delete
```

2. Add the plugin to your `payload.config.ts`:

```ts
/// ....
import { softDeletePlugin } from "@payload-bites/soft-delete";

export default buildConfig({
  // ...
  plugins: [
    // ...
    softDeletePlugin({
      // ...
      collections: [
        // add your collection slugs here
      ],
      access: {
        // add custom access controls per collection here
      },
    }),
  ],
});
```

## Defaults

For defaults, refer to [defaults.ts](./src/defaults.ts).

## Options

For options, refer to [types.ts](./src/types.ts).

## Roadmap

- [x] Add modal to hard delete.
- [x] Enable/disable restore functionality per collection.
- [x] Enable/disable hard delete functionality per collection.
- [ ] Schedule automatic deletion after certain number of days.
- [ ] Documentation (including API examples).
- [x] Translations.
