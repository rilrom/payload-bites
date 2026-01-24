import type { Config } from "payload";

import { defaultPluginOptions } from "./defaults.js";
import { providers } from "./endpoints/providers.js";
import { translations } from "./translations.js";
import type { ImageSearchPluginOptions } from "./types.js";
import { deepMerge } from "./utils/deepMerge.js";

export const imageSearchPlugin =
	(pluginOptions: ImageSearchPluginOptions = {}) =>
	(incomingConfig: Config): Config => {
		const mergedOptions: Required<ImageSearchPluginOptions> = Object.assign(
			defaultPluginOptions,
			pluginOptions,
		);

		const config = { ...incomingConfig };

		if (mergedOptions.enabled === false) {
			return config;
		}

		config.custom = {
			...(config.custom || {}),
			providerAccess: mergedOptions.providerAccess,
		};

		config.i18n = {
			...(config.i18n || {}),
			translations: {
				...deepMerge(translations, config.i18n?.translations),
			},
		};

		config.collections = (config.collections || []).map((collection) => {
			const upload = collection.upload;

			if (!upload) {
				return collection;
			}

			const uploadObj =
				upload === true ? {} : typeof upload === "object" ? upload : undefined;

			const modifiedCollection = {
				...collection,
				upload: {
					...(uploadObj || {}),
					admin: {
						...(uploadObj?.admin || {}),
						components: {
							...(uploadObj?.admin?.components || {}),
							controls: [
								...(uploadObj?.admin?.components?.controls || []),
								{
									path: "@payload-bites/image-search/client#ImageSearch",
									clientProps: {
										enablePreview: mergedOptions.enablePreview,
									},
								},
							],
						},
					},
				},
			};

			return modifiedCollection;
		});

		config.endpoints = [...(config.endpoints || []), ...providers];

		return config;
	};
