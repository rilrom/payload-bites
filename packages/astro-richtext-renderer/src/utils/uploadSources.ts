interface UploadImageVariant {
	filename?: null | string;
	filesize?: null | number;
	height?: null | number;
	mimeType?: null | string;
	url?: null | string;
	width?: null | number;
}

interface UploadDocWithVariants {
	variants?: null | Record<string, null | UploadImageVariant | undefined>;
}

interface ResponsiveImageSource {
	media: string;
	srcSet: string;
	type: string;
}

export function getResponsiveImageSources(
	doc: null | object | undefined,
): ResponsiveImageSource[] {
	const { variants } = (doc ?? {}) as UploadDocWithVariants;
	const sources: ResponsiveImageSource[] = [];

	for (const variant of Object.values(variants ?? {})) {
		if (
			!variant?.width ||
			!variant.height ||
			!variant.mimeType ||
			!variant.filesize ||
			!variant.filename ||
			!variant.url
		) {
			continue;
		}

		sources.push({
			media: `(max-width: ${variant.width}px)`,
			srcSet: variant.url,
			type: variant.mimeType,
		});
	}

	return sources;
}
