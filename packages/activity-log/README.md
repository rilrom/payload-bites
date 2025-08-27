# Activity log

Keep an eye on everything happening in your cms.

## Quick start

1. Install the plugin:

```shell
pnpm add @payload-bites/activity-log
```

2. Add the plugin to your `payload.config.ts`:

```ts
import { activityLogPlugin } from "@payload-bites/activity-log";

export default buildConfig({
  plugins: [
    activityLogPlugin({
      collections: {
        posts: {},
        pages: {
          enableUpdateLogging: false,
          enableIpAddressLogging: false,
          enableDeviceInfoLogging: false,
        },
      },
      globals: {
        footer: {},
      },
      enableDraftAutosaveLogging: false,
      overrideActivityLogCollection: (collection) => ({
        ...collection,
        access: {
          ...collection?.access,
          update: () => true,
          create: () => true,
        },
        admin: {
          ...collection?.admin,
          group: "Reporting",
        },
      }),
    }),
  ],
});
```

## Defaults

For defaults, refer to [defaults.ts](./src/defaults.ts).

## Options

For options, refer to [types.ts](./src/types.ts).

## Roadmap

- [ ] Capture user logins and logouts
- [ ] Record failed login attempts
- [ ] Custom fields in activity log collection
- [ ] Export to CSV or JSON
