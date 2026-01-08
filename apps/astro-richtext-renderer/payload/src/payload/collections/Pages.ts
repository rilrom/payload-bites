import {
	BlocksFeature,
	EXPERIMENTAL_TableFeature,
	FixedToolbarFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

import { BannerBlock } from "../blocks/Banner";
import { CalloutBlock } from "../blocks/Callout";
import { CodeBlock } from "../blocks/Code";
import { RelationshipCardBlock } from "../blocks/RelationshipCard";
import { defaultContent } from "../data/defaultContent";
import { LabelInlineBlock } from "../inlineBlocks/Label";
import { MathInlineBlock } from "../inlineBlocks/Math";
import { MentionInlineBlock } from "../inlineBlocks/Mention";

export const Pages: CollectionConfig = {
	slug: "pages",
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "content",
			type: "richText",
			defaultValue: defaultContent,
			editor: lexicalEditor({
				features: ({ defaultFeatures }) => [
					...defaultFeatures,
					FixedToolbarFeature(),
					EXPERIMENTAL_TableFeature(),
					BlocksFeature({
						blocks: [
							CodeBlock,
							CalloutBlock,
							BannerBlock,
							RelationshipCardBlock,
						],
						inlineBlocks: [
							MentionInlineBlock,
							LabelInlineBlock,
							MathInlineBlock,
						],
					}),
				],
			}),
		},
	],
};
