import { Pexels } from "../classes/Pexels.js";
import { Pixabay } from "../classes/Pixabay.js";
import { Unsplash } from "../classes/Unsplash.js";

/**
 * Returns an instantiated image provider by name.
 *
 * If the provider name does not match a supported provider, `null` is returned.
 *
 * @param [providerName] Provider identifier.
 * @returns Provider instance if available.
 */
export const getProvider = (providerName?: string) => {
	switch (providerName) {
		case "unsplash":
			return new Unsplash();
		case "pexels":
			return new Pexels();
		case "pixabay":
			return new Pixabay();
		default:
			return null;
	}
};
