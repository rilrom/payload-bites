# Fullscreen editor

Provides a fullscreen mode for the lexical rich text editor.

https://github.com/user-attachments/assets/fc130871-d148-48df-900d-fb1b5060bb3e

## Quick start

1. Install the plugin:

```shell
pnpm add @payload-bites/fullscreen-editor
```

3. Add the plugin to your `payload.config.ts`:

```ts
/// ....
import { fullscreenEditorPlugin } from "@payload-bites/fullscreen-editor";

export default buildConfig({
  // ...
  plugins: [
    // ...
    fullscreenEditorPlugin(),
  ],
});
```

## Roadmap

- [ ] Focus trap around editor in fullscreen mode.
- [ ] Translations.
