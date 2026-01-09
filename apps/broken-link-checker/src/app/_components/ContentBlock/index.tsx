import RichText from "@/app/_components/RichText";
import type { ContentBlock as ContentBlockProps } from "@/payload/payload-types";

export const ContentBlock = (props: ContentBlockProps) => {
	const { richText } = props;

	if (!richText) {
		return null;
	}

	return <RichText data={richText} />;
};
