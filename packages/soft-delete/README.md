# Soft delete

Never lose your Payload documents again, soft delete is here to save the day.

> [!WARNING]
> Deprecated. Payload has built-in [trash](https://payloadcms.com/docs/trash/overview) from v3.49.0, so use that instead. This plugin will not be updated for Payload 4. See [Migrating to core trash](#migrating-to-core-trash).

https://github.com/user-attachments/assets/4d7334d1-d7f2-4ab7-9421-0c84dfcf38cb

## Compatibility table

| Payload version    | Soft delete version |
| ------------------ | ------------------- |
| v3.23.0 or earlier | Incompatible        |
| v3.24.0 to 3.38.0  | v1.x                |
| v3.39.0 to 3.50.0  | v2.x                |
| v3.51.0 or later   | v3.x                |
| v4                 | Not supported       |

## Quick start

1. Install the plugin:

```shell
pnpm add @payload-bites/soft-delete
```

2. Add the plugin to your `payload.config.ts`:

```ts
// ...
import { softDeletePlugin } from "@payload-bites/soft-delete";

export default buildConfig({
  // ...
  plugins: [
    // ...
    softDeletePlugin({
      collections: {
        posts: {},
        "posts-with-drafts": {
          // ...
          enableRestore: false,
          enableHardDelete: false,
          softDeleteAccess: (args) => args.req.user.role === "admin",
        },
      },
    }),
  ],
});
```

## Migrating to core trash

Core trash stores soft deletes in the same `deletedAt` date field, so existing soft-deleted documents carry over. Remove the plugin, set `trash: true` on each collection you passed to it, then run `payload migrate:create` to confirm the schema is unchanged.

Core trash is queried differently. Pass `trash: true` to include trashed documents, as described in the [trash docs](https://payloadcms.com/docs/trash/overview).

## Defaults

For defaults, refer to [defaults.ts](./src/defaults.ts).

## Options

For options, refer to [types.ts](./src/types.ts).

## Querying

You can retrieve active or soft deleted documents by checking for the existence of the `deletedAt` field.

### Local API

```ts
const result = await payload.find({
  collection: "posts",
  where: {
    deletedAt: {
      exists: false,
    },
  },
});
```

### REST API

```ts
import { stringify } from "qs-esm";
import type { Where } from "payload";

const query: Where = {
  deletedAt: {
    exists: false,
  },
};

const getPosts = async () => {
  const stringifiedQuery = stringify(
    {
      where: query,
    },
    { addQueryPrefix: true },
  );

  const response = await fetch(
    `http://localhost:3000/api/posts${stringifiedQuery}`,
  );
};
```

### GraphQL API

```ts
query {
  Posts(where: { deletedAt: { exists: false } }) {
    docs {
      title
    }
  }
}
```

## Caveats

- It is currently not possible to soft delete a draft document that has invalid fields (e.g. required) unless the document has a previously valid published version or you resolve the invalid fields.
