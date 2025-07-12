import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from "@payloadcms/richtext-lexical";
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from "@payloadcms/richtext-lexical/react";

type NodeTypes = DefaultNodeTypes;

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value } = linkNode.fields.doc!;

  if (typeof value !== "object") {
    throw new Error("Expected value to be an object");
  }

  const slug = value.slug;

  return `/${slug}`;
};

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
});

type RichTextProps = {
  data: DefaultTypedEditorState;
};

export default function RichText(props: RichTextProps) {
  const { data } = props;

  return <ConvertRichText data={data} converters={jsxConverters} />;
}
