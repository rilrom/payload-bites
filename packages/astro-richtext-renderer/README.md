# Astro richtext renderer

Render Payload CMS Lexical richtext content in Astro using native Astro components.

## Installation

```bash
pnpm add @payload-bites/astro-richtext-renderer
```

## Usage

Import the `RichText` component and pass your Lexical editor state to the `data` prop:

```astro
---
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { RichText } from '@payload-bites/astro-richtext-renderer'

interface Props {
  data: SerializedEditorState
}

const { data } = Astro.props
---

<article>
  <RichText data={data} />
</article>
```

## Props

| Prop         | Required | Description                                                                                |
| ------------ | -------- | ------------------------------------------------------------------------------------------ |
| `data`       | Required | Serialized editor state to render.                                                         |
| `converters` | Optional | Custom Astro component converters to override or extend the defaults.                      |
| `config`     | Optional | Configuration options (see below).                                                         |
| `class`      | Optional | CSS class for the container element. Defaults to `"payload-richtext"`.                     |

### Config Options

Pass configuration via the `config` prop:

| Option             | Type                   | Description                                                                |
| ------------------ | ---------------------- | -------------------------------------------------------------------------- |
| `disableContainer` | `boolean`              | If true, removes the container div wrapper.                                |
| `disableIndent`    | `boolean \| string[]`  | Disable indentation globally or for specific node types.                   |
| `disableTextAlign` | `boolean \| string[]`  | Disable text alignment globally or for specific node types.                |
| `internalDocToHref`| `function`             | Convert internal document links to href strings (see Internal Links).      |

## Astro Converters

The `RichText` component uses Astro components as converters. Built-in converters handle common Lexical nodes (paragraphs, headings, lists, links, etc.). You can add or override converters for custom blocks, custom nodes, or any modifications you need.

> [!IMPORTANT]
> When fetching data, ensure your depth setting is high enough to fully populate Lexical nodes such as uploads. Converters require fully populated data to work correctly.

### Internal Links

By default, Payload doesn't know how to convert internal links to URLs. To handle internal links, pass the `internalDocToHref` function in the `config` prop:

```astro
---
import type { SerializedLinkNode } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { RichText } from '@payload-bites/astro-richtext-renderer'

interface Props {
  data: SerializedEditorState
}

const { data } = Astro.props

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
---

<RichText data={data} config={{ internalDocToHref }} />
```

### Lexical Blocks

If your rich text includes custom Blocks or Inline Blocks, you must supply custom Astro component converters that match each block's slug. Create an Astro component for each block type and pass them via the `converters` prop.

First, create your block component:

```astro
---
interface Props {
  node: {
    fields: {
      id: string
      blockType: 'myNumberBlock'
      number: number
    }
  }
}

const { node } = Astro.props
---

<div class="number-block">{node.fields.number}</div>
```

Then pass them to the `RichText` component:

```astro
---
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { RichText, type AstroConvertersFunction } from '@payload-bites/astro-richtext-renderer'

import NumberBlock from '@/components/blocks/NumberBlock.astro'

interface Props {
  data: SerializedEditorState
}

const { data } = Astro.props

const astroConverters: AstroConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    myNumberBlock: NumberBlock,
  },
});
---

<RichText data={data} converters={astroConverters} />
```

### Overriding Converters

You can override any of the default converters by passing your custom Astro component, keyed to the node type.

Each converter component receives these props via `ConverterProps<T>`:

| Prop         | Description                                              |
| ------------ | -------------------------------------------------------- |
| `node`       | The Lexical node data                                    |
| `converters` | All available converters (for rendering children)        |
| `config`     | User configuration                                       |
| `style`      | Computed inline styles (textAlign, paddingInlineStart)   |
| `RenderNode` | Helper component for rendering child nodes               |

Example - overriding the upload node converter:

```astro
---
import type { SerializedUploadNode } from '@payloadcms/richtext-lexical'
import type { AstroConverterProps } from '@payload-bites/astro-richtext-renderer'

type Props = AstroConverterProps<SerializedUploadNode>

const { node, style } = Astro.props

const upload = node.value

if (typeof upload !== 'object') {
  console.warn('Upload not populated')
}

const doc = typeof upload === 'object' ? upload : null
const url = doc?.url
const alt = doc?.alt || ''
---

{url && <img src={url} alt={alt} style={style} loading="lazy" decoding="async" />}
```

Then use it:

```astro
---
import { RichText, AstroConvertersFunction } from '@payload-bites/astro-richtext-renderer'

import CustomUpload from '@/components/converters/CustomUpload.astro'

const data = /* your Lexical editor state */

const astroConverters: AstroConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  upload: CustomUpload,
});
---

<RichText data={data} converters={astroConverters} />
```

### Media Uploads

When using Payload local media storage, make sure you have set `serverURL` in your `payload.config.ts` to ensure the media collection returns absolute URLs for your Astro website to use.

### Rendering Child Nodes

For converters that need to render nested content (like links, lists, or custom blocks with rich text fields), use the `RenderNode` component passed as a prop:

```astro
---
import type { AstroConverterProps } from '@payload-bites/astro-richtext-renderer'
import type { SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'

interface BlockNode extends SerializedLexicalNode {
  fields: {
    id: string
    blockType: 'richTextBlock'
    title: string
  }
  children: SerializedLexicalNode[]
}

type Props = AstroConverterProps<BlockNode>

const { node, converters, config, RenderNode } = Astro.props

const children = node.children || []
---

<div class="rich-text-block">
  <h3>{node.fields.title}</h3>
  {children.map((child) => (
    <RenderNode node={child} converters={converters} config={config} />
  ))}
</div>
```
