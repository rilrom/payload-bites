# Astro richtext renderer

Render Payload CMS Lexical richtext content in Astro.

## Installation

```bash
pnpm add @payload-bites/astro-richtext-renderer
```

## Usage

Import the `RichText` component and pass your Lexical editor state to the `data` prop:

```astro
---
import { RichText } from '@payload-bites/astro-richtext-renderer'

const content = /* your Lexical editor state */
---

<article>
  <RichText data={content} />
</article>
```

## Options

| Prop               | Required | Description                                                                                                        |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `class`            | Optional | Override class names for the container.                                                                            |
| `converters`       | Optional | Custom converters to transform nodes to HTML. Can be an object or a function that receives the default converters. |
| `data`             | Required | Serialized editor state to render.                                                                                 |
| `disableContainer` | Optional | If true, removes the container div wrapper.                                                                        |
| `disableIndent`    | Optional | If true, disables indentation globally. If an array, disables for specific node `type` values.                     |
| `disableTextAlign` | Optional | If true, disables text alignment globally. If an array, disables for specific node `type` values.                  |

## Converting HTML

> [!WARNING]
> The HTML output produced by this renderer is **unescaped**. It is passed directly to Astro as raw HTML.
>
> You **must** ensure that the Lexical content is trusted, sanitized, or otherwise validated before rendering.  
> Rendering untrusted content without proper sanitization can result in XSS and other injection vulnerabilities.
>
> This package intentionally does not escape HTML, as escaping would prevent valid rich content rendering.  
> Responsibility for content safety lies with the consuming application.

The `RichText` component includes built-in converters for common Lexical nodes. You can add or override converters via the `converters` prop for custom blocks, custom nodes, or any modifications you need.

> [!IMPORTANT]
> When fetching data, ensure your depth setting is high enough to fully populate Lexical nodes such as uploads. The HTML converter requires fully populated data to work correctly.

### Internal Links

By default, Payload doesn't know how to convert internal links to HTML, as it doesn't know what the corresponding URL of the internal link is. You'll notice that you get a "found internal link, but internalDocToHref is not provided" error in the console when you try to render content with internal links.

To fix this, you need to pass the `internalDocToHref` prop to `LinkHTMLConverter`. This prop is a function that receives the link node and returns the URL of the document.

```astro
---
import type {
  DefaultNodeTypes,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { RichText } from '@payload-bites/astro-richtext-renderer'
import {
  type HTMLConvertersFunction,
  LinkHTMLConverter,
} from '@payloadcms/richtext-lexical/html'

interface Props {
  data: SerializedEditorState
}

const { data } = Astro.props as Props

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { relationTo, value } = linkNode.fields.doc!

  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }

  const slug = value.slug

  switch (relationTo) {
    case 'posts':
      return `/posts/${slug}`
    case 'categories':
      return `/category/${slug}`
    case 'pages':
      return `/${slug}`
    default:
      return `/${relationTo}/${slug}`
  }
}

const htmlConverters: HTMLConvertersFunction<DefaultNodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LinkHTMLConverter({ internalDocToHref }),
})
---

<RichText data={data} converters={htmlConverters} />
```

### Lexical Blocks

If your rich text includes custom Blocks or Inline Blocks, you must supply custom converters that match each block's slug. This converter is not included by default, as Payload doesn't know how to render your custom blocks.

For example:

```astro
---
import type { MyInlineBlock, MyNumberBlock, MyTextBlock } from '@/payload-types'
import type {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedInlineBlockNode,
} from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { RichText } from '@payload-bites/astro-richtext-renderer'
import { type HTMLConvertersFunction } from '@payloadcms/richtext-lexical/html'

interface Props {
  data: SerializedEditorState
}

const { data } = Astro.props as Props

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<MyNumberBlock | MyTextBlock>
  | SerializedInlineBlockNode<MyInlineBlock>

const htmlConverters: HTMLConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  blocks: {
    myNumberBlock: ({ node }) =>
      `<div>${node.fields.number}</div>`,

    myTextBlock: ({ node }) =>
      `<div style="background-color:red">${node.fields.text}</div>`,
  },
  inlineBlocks: {
    myInlineBlock: ({ node }) =>
      `<span>${node.fields.text}</span>`,
  },
})
---

<RichText data={data} converters={htmlConverters} />
```

### Overriding Converters

You can override any of the default HTML converters by passing your custom converter, keyed to the node type, to the `converters` prop / the `converters` function.

Example - overriding the upload node converter to use the `Image` component from `astro:assets`:

```astro
---
import type {
  DefaultNodeTypes,
  SerializedUploadNode,
} from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { type HTMLConvertersFunction } from '@payloadcms/richtext-lexical/html'

import { RichText } from '@payload-bites/astro-richtext-renderer'

import { getImage } from 'astro:assets'

interface Props {
  data: SerializedEditorState
}

const { data } = Astro.props as Props

type NodeTypes = DefaultNodeTypes

const htmlConverters: HTMLConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  upload: async ({ node }) => {
    if (node.relationTo !== 'uploads') {
      return ''
    }

    const uploadDoc = node.value

    if (typeof uploadDoc !== 'object') {
      return ''
    }

    const { alt, height, url, width } = uploadDoc

    if (!url) {
      return ''
    }

    const image = await getImage({
      src: url,
      width: width ?? undefined,
      height: height ?? undefined,
      format: 'webp',
      loading: 'lazy',
    })

    return `
      <img
        src="${image.src}"
        alt="${alt ?? ''}"
        width="${image.attributes.width}"
        height="${image.attributes.height}"
        loading="lazy"
        decoding="async"
      />
    `
  },
})
---

<RichText data={data} converters={htmlConverters} />
```
