import type {
	DefaultNodeTypes,
	DefaultTypedEditorState,
	SerializedLinkNode,
} from "@payloadcms/richtext-lexical";
import {
	RichText as ConvertRichText,
	type JSXConvertersFunction,
	LinkJSXConverter,
} from "@payloadcms/richtext-lexical/react";

type NodeTypes = DefaultNodeTypes;

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
	if (typeof linkNode.fields.doc?.value !== "object") {
		throw new Error("Expected value to be an object");
	}

	const slug = linkNode.fields.doc?.value.slug;

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
