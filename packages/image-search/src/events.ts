import type { ProviderResult } from "./classes/Provider.js";

/**
 * Name of the DOM event dispatched on `window` when an editor picks an image.
 */
export const imageSelectEventName = "payload-bites:image-search:select";

export type ImageSelectEventDetail = {
	/** Provider key, e.g. "pixabay", "pexels" or "unsplash". */
	provider: string;
	/** The full normalised result the editor picked. */
	image: ProviderResult;
};
