# Fullscreen editor

Provides a fullscreen mode for the lexical rich text editor.

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

- [ ] Replace using CSS to hide the fullscreen toggle button in sub editors with the isEnabled prop.
- [ ] Fullscreen toggle in the slash menu.
- [ ] Focus trap around the editor when in fullscreen mode.
