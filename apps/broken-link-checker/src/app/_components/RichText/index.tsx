import type {
	DefaultNodeTypes,
	SerializedLinkNode,
} from "@payloadcms/richtext-lexical";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
	RichText as ConvertRichText,
	type JSXConvertersFunction,
	LinkJSXConverter,
} from "@payloadcms/richtext-lexical/react";
import type { ContentBlock } from "@/payload/payload-types";

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
	data: NonNullable<ContentBlock["richText"]>;
};

export default function RichText(props: RichTextProps) {
	const { data } = props;

	return (
		<ConvertRichText
			// Generated upload nodes type `version` as optional but RichText requires it (payload 4.0.0-beta.10).
			data={data as SerializedEditorState}
			converters={jsxConverters}
		/>
	);
}
