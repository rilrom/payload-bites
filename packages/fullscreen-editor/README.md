# Fullscreen editor

Provides a fullscreen mode for the lexical rich text editor.

https://github.com/user-attachments/assets/22ba5cf7-6cb2-4695-8dbf-f06b37c77b66

## Quick start

1. Install the plugin:

```shell
pnpm add @payload-bites/fullscreen-editor
```

2. Add the feature to your lexical editor in `payload.config.ts`:

```ts
// ...
import { FullscreenEditorFeature } from "@payload-bites/fullscreen-editor";

export default buildConfig({
  // ...
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      // ...
      FixedToolbarFeature(), // optional
      FullscreenEditorFeature(),
    ],
  }),
});
```

## Roadmap

- [ ] Focus trap around editor in fullscreen mode.
- [x] Translations.
