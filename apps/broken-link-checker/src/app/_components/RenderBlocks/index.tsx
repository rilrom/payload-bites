import { Fragment } from "react";

import { ContentBlock } from "@/app/_components/ContentBlock";
import type { Page } from "@/payload/payload-types";

const blockComponents = {
	content: ContentBlock,
};

interface RenderBlocksProps {
	blocks: Page["layout"][0][];
}

export const RenderBlocks = (props: RenderBlocksProps) => {
	const { blocks } = props;

	const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

	if (hasBlocks) {
		return (
			<Fragment>
				{blocks.map((block) => {
					const { blockType } = block;

					if (blockType && blockType in blockComponents) {
						const Block = blockComponents[blockType];

						if (Block) {
							return <Block key={block.id} {...block} />;
						}
					}
					return null;
				})}
			</Fragment>
		);
	}

	return null;
};
