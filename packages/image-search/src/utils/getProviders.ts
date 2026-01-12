import { Pexels } from "../classes/Pexels.js";
import { Pixabay } from "../classes/Pixabay.js";
import { Unsplash } from "../classes/Unsplash.js";

/**
 * Returns instantiated image providers that are properly configured.
 *
 * Each provider exposes an `isConfigured` boolean indicating whether
 * required credentials or settings are present.
 *
 * @returns Array of configured provider instances.
 */
export const getProviders = () => {
	const providers = [Unsplash, Pexels, Pixabay];

	return providers
		.map((Provider) => new Provider())
		.filter((provider) => provider.isConfigured);
};
