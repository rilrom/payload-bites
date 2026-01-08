import type { CollectionConfig, Config, GlobalConfig } from "payload";

import { getActivityLogCollection } from "./collections/getActivityLogCollection.js";
import {
	defaultCreateLogging,
	defaultDeleteLogging,
	defaultDeviceInfoLogging,
	defaultDraftAutosaveLogging,
	defaultIpAddressLogging,
	defaultPluginOptions,
	defaultUpdateLogging,
} from "./defaults.js";
import { afterChangeCollectionActivityLog } from "./hooks/afterChangeCollectionActivityLog.js";
import { afterChangeGlobalActivityLog } from "./hooks/afterChangeGlobalActivityLog.js";
import { afterDeleteCollectionActivityLog } from "./hooks/afterDeleteCollectionActivityLog.js";
import type { ActivityLogPluginOptions } from "./types.js";

export const activityLogPlugin =
	(pluginOptions?: ActivityLogPluginOptions) =>
	(incomingConfig: Config): Config => {
		const mergedOptions: ActivityLogPluginOptions = Object.assign(
			defaultPluginOptions,
			pluginOptions,
		);

		const config = { ...incomingConfig };

		if (mergedOptions.enabled === false) {
			return config;
		}

		const activityLogCollection = getActivityLogCollection({
			config,
			pluginOptions: mergedOptions,
		});

		config.collections = [
			...(config.collections || []),
			activityLogCollection,
		].map((collection) => {
			if (!Object.keys(mergedOptions.collections).includes(collection.slug)) {
				return collection;
			}

			const modifiedCollection: CollectionConfig = {
				...collection,
			};

			const mergedCollectionOptions =
				mergedOptions.collections[modifiedCollection.slug];

			const enableCreateLogging =
				mergedCollectionOptions?.enableCreateLogging ?? defaultCreateLogging;
			const enableUpdateLogging =
				mergedCollectionOptions?.enableUpdateLogging ?? defaultUpdateLogging;
			const enableDeleteLogging =
				mergedCollectionOptions?.enableDeleteLogging ?? defaultDeleteLogging;
			const enableIpAddressLogging =
				mergedCollectionOptions?.enableIpAddressLogging ??
				defaultIpAddressLogging;
			const enableDeviceInfoLogging =
				mergedCollectionOptions?.enableDeviceInfoLogging ??
				defaultDeviceInfoLogging;
			const enableDraftAutosaveLogging =
				mergedOptions.enableDraftAutosaveLogging ?? defaultDraftAutosaveLogging;

			modifiedCollection.hooks = {
				...(modifiedCollection.hooks || {}),
				afterChange: [
					...(modifiedCollection.hooks?.afterChange || []),
					afterChangeCollectionActivityLog({
						activityLogSlug: activityLogCollection.slug,
						enableCreateLogging,
						enableUpdateLogging,
						enableIpAddressLogging,
						enableDeviceInfoLogging,
						enableDraftAutosaveLogging,
					}),
				],
				afterDelete: [
					...(modifiedCollection.hooks?.afterDelete || []),
					afterDeleteCollectionActivityLog({
						activityLogSlug: activityLogCollection.slug,
						enableDeleteLogging,
						enableIpAddressLogging,
						enableDeviceInfoLogging,
					}),
				],
			};

			return modifiedCollection;
		});

		config.globals = (config.globals || []).map((global) => {
			if (!Object.keys(mergedOptions.globals).includes(global.slug)) {
				return global;
			}

			const modifiedGlobal: GlobalConfig = {
				...global,
			};

			const mergedGlobalOptions =
				mergedOptions.collections[modifiedGlobal.slug];

			const enableIpAddressLogging =
				mergedGlobalOptions?.enableIpAddressLogging ?? defaultIpAddressLogging;
			const enableDeviceInfoLogging =
				mergedGlobalOptions?.enableDeviceInfoLogging ??
				defaultDeviceInfoLogging;
			const enableDraftAutosaveLogging =
				mergedOptions.enableDraftAutosaveLogging ?? defaultDraftAutosaveLogging;

			modifiedGlobal.hooks = {
				...(modifiedGlobal.hooks || {}),
				afterChange: [
					...(modifiedGlobal.hooks?.afterChange || []),
					afterChangeGlobalActivityLog({
						activityLogSlug: activityLogCollection.slug,
						enableIpAddressLogging,
						enableDeviceInfoLogging,
						enableDraftAutosaveLogging,
					}),
				],
			};

			return modifiedGlobal;
		});

		return config;
	};
