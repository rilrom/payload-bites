import type {
	AstroConverters,
	AstroConvertersFunction,
	RichTextConfig,
} from "../types";

const defaultConfig: RichTextConfig = {
	disableContainer: false,
	disableIndent: false,
	disableTextAlign: false,
};

export function mergeConfig(
	userConfig: RichTextConfig | undefined,
): RichTextConfig {
	if (!userConfig) {
		return defaultConfig;
	}

	return { ...defaultConfig, ...userConfig };
}

export function resolveConverters(
	userConverters: AstroConverters | AstroConvertersFunction | undefined,
	defaultConverters: AstroConverters,
): AstroConverters {
	if (!userConverters) {
		return defaultConverters;
	}

	if (typeof userConverters === "function") {
		return userConverters({ defaultConverters });
	}

	return userConverters;
}
