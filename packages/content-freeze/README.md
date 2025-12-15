# Content Freeze

Make sure your team puts the tools down during critical moments. This plugin disables create, update, and delete operations across specified collections and globals when a content freeze is active.

https://github.com/user-attachments/assets/0170fa47-4017-45bb-85bd-40c25040a8d8

## Use cases

- **Deployment freezes**: Prevent content changes during critical deployments.
- **Marketing campaigns**: Lock content before major campaigns go live.
- **Audit periods**: Freeze content during compliance audits.
- **Release management**: Coordinate content changes with software releases.
- **Emergency situations**: Quickly lock down your CMS when needed.

## Quick start

1. Install the plugin:

```shell
pnpm add @payload-bites/content-freeze
```

2. Add the plugin to your `payload.config.ts`:

```ts
import { contentFreezePlugin } from "@payload-bites/content-freeze";

export default buildConfig({
  // ...
  plugins: [
    // ...
    contentFreezePlugin({
      // optional but recommended for custom access control
      overrideContentFreezeSettingsGlobal: (global) => ({
        ...global,
        access: {
          ...global.access,
          read: ({ req }) => req.user?.role === "admin",
          update: ({ req }) => req.user?.role === "admin",
        },
      }),
    }),
    // ...
  ],
  // ...
});
```

## Usage

### Activating a content freeze

1. Navigate to the **Content freeze settings** global in your admin panel.
2. Select the collections and/or globals you would like to be placed under content freeze.
3. Optionally, add a custom message to display in the banner.
4. Check the **Enable content freeze** checkbox.
5. Save the global.

A banner will appear at the top of all admin screens, and create/update/delete operations will be blocked on the selected collections and globals.

### Deactivating a content freeze

1. Navigate to the **Content freeze settings** global.
2. Uncheck the **Enable content freeze** checkbox.
3. Save the global.

The banner will disappear and normal usage can resume.

## Options

For all available options, refer to [types.ts](./src/types.ts).

## Defaults

For default values, refer to [defaults.ts](./src/defaults.ts).

## How it works

When the content freeze is active:

- **Collections**: Create, update, and delete operations are blocked.
- **Globals**: Update operations are blocked.
- **Settings global**: Remains accessible to authorized users so they can deactivate the freeze.
- **Banner**: Displays across all admin screens with your custom message.

The plugin wraps existing access controls, so your original access rules are still evaluated when the freeze is not active.

## Roadmap

- [ ] Translations
- [ ] Scheduled publish of content freeze
