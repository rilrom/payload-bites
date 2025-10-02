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

## Caveats

- If fullscreen mode is enabled and you resize your browser screen across the 768px threshold, the rich-text field remounts which causes the ".focused-editor" class to be removed, leaving you with a blank screen. To fix this you need to either refresh the browser or remove the ".focus-mode" class from the body element using your browser dev tools.

## Roadmap

- [ ] Focus trap around editor in fullscreen mode.
- [x] Translations.
