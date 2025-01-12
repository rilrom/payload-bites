# Audit fields

Add createdBy and lastModifiedBy audit fields to collections and globals.

## Quick start

1. Install the plugin:

```shell
pnpm add @payload-bites/audit-fields
```

2. Add the plugin to your `payload.config.ts`:

```ts
/// ....
import { auditFieldsPlugin } from "@payload-bites/audit-fields";

export default buildConfig({
  // ...
  plugins: [
    // ...
    auditFieldsPlugin({
      // ...
    }),
  ],
});
```

## Defaults

For defaults, refer to [defaults.ts](./src/defaults.ts).

## Options

For options, refer to [types.ts](./src/types.ts).
