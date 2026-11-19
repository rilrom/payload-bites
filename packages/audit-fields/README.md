# Audit fields

> [!WARNING]
> Deprecated. Payload 4 has built-in authorship, so use that instead. v2.x only exists to ease the upgrade. See [Migrating to core authorship](#migrating-to-core-authorship).

Add createdBy and lastModifiedBy audit fields to collections and globals.

## Compatibility table

| Payload version | Audit fields version          |
| --------------- | ----------------------------- |
| v3              | v1.x                          |
| v4              | v2.x (deprecated)             |

Payload 4 versions are prereleases. Install them with `pnpm add @payload-bites/audit-fields@beta`.

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

## Migrating to core authorship

Core authorship stores the same `{ relationTo, value }` shape. `createdBy` carries over unchanged and `lastModifiedBy` becomes `updatedBy` (core also sets `updatedBy` on create). Use your custom field names if you changed them.

To move over, remove the plugin and run `payload migrate:create`, then edit the generated migration to copy `lastModifiedBy` into `updatedBy` before the old column is dropped.

While installed, v2.x sets `authorship: false` on everything it decorates (unless you set `authorship` yourself) so core does not add a duplicate `updatedBy` field.

## Defaults

For defaults, refer to [defaults.ts](./src/defaults.ts).

## Options

For options, refer to [types.ts](./src/types.ts).
