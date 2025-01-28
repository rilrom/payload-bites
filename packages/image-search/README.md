# Image search

Search for images from the comfort of your own CMS using various image providers.

Inspired by [Directus Image Scout](https://github.com/resauce-dev/directus-image-scout).

> [!IMPORTANT]
> This plugin requires Payload v3.19.0 or greater. Earlier versions do not have access to the `CustomUpload` component.

https://github.com/user-attachments/assets/b99bb160-788f-4689-9e40-005a6fe0bced

## Quick start

1. Install the plugin:

```shell
pnpm add @payload-bites/image-search
```

2. Add environment variables:

| Name             | CORS URL                    | Description                                    |
| ---------------- | --------------------------- | ---------------------------------------------- |
| API_KEY_UNSPLASH | https://images.unsplash.com | The key you configured to use the Unsplash API |
| API_KEY_PEXELS   | https://images.pexels.com   | The key you configured to use the Pexels API   |
| API_KEY_PIXABAY  | https://pixabay.com         | The key you configured to use the Pixabay API  |

> [!IMPORTANT]
> At least one API key is required to use this plugin.

3. Add the plugin to your `payload.config.ts`:

```ts
/// ....
import { imageSearchPlugin } from "@payload-bites/image-search";

export default buildConfig({
  // ...
  plugins: [
    // ...
    imageSearchPlugin({
      // ...
    }),
  ],
});
```

## Defaults

For defaults, refer to [defaults.ts](./src/defaults.ts).

## Options

For options, refer to [types.ts](./src/types.ts).

## Providers

A provider is an online image library that allows you to view and download images for use in your own projects. In order to use them, you must register an API key with the provider and assign it to its respective environment variable in your project.

- [Unsplash](https://unsplash.com/developers)
- [Pixels](https://www.pexels.com/api/)
- [Pixabay](https://pixabay.com/api/docs/)

## Liability

Before using any provider, ensure you have reviewed and agreed to their terms and usage policies. Contributors to this plugin are not responsible for how these images are used.

## Roadmap

- [ ] Image search bulk upload (awaiting custom component implementation by Payload team - [discussion](https://github.com/payloadcms/payload/discussions/10191)).
- [x] Translations.
- [x] Custom access control for provider endpoints.
