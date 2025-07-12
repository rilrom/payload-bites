# Broken link checker

Broken links are a thing of the past. Protect your SEO by staying on top of your link situation.

> [!IMPORTANT]
> This plugin is in beta and is subject to BREAKING CHANGES. It is not yet recommended to use this in a production environment.

https://github.com/user-attachments/assets/f4d33101-c7c5-445a-9aaa-b05e10254102

## Quick start

1. Install the plugin:

```shell
pnpm add @payload-bites/broken-link-checker
```

2. Add the plugin to your `payload.config.ts`:

```ts
// ...
import { brokenLinkCheckerPlugin } from "@payload-bites/broken-link-checker";

export default buildConfig({
  // ...
  plugins: [
    // ...
    brokenLinkCheckerPlugin({
      scanLinksAccess: (args) => args.req.user.role === "admin",
      brokenLinksAccess: (args) => args.req.user.role === "editor",
      collections: {
        // ...
        pages: {
          resolvedUrls: async (args) => {
            // You do not need to use this function, use whichever approach works for your project needs.
            // This is a utility function I have provided that is compatible with plugin-nested-docs.
            return resolveNestedDocUrls({
              req: args.req,
              collection: "pages",
            });
          },
        },
        posts: {
          resolvedUrls: [
            {
              url: "http://localhost:3000/blog/example-post",
              id: "1",
              collection: "posts",
            },
            {
              url: "http://localhost:3000/blog/another-example",
              id: "2",
              collection: "posts",
            },
            // ...
          ],
        },
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

- [ ] Inline editing and unlinking of broken links.
- [ ] Scanning progress indicator.
- [ ] Scheduled scanning.
- [ ] Multitenancy.
- [ ] Custom broken links collection config.
- [ ] Custom linkinator config.
- [ ] Documentation.
