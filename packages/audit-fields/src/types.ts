import type { CollectionSlug, GlobalSlug } from "payload";

/**
 * Represents the label for audit fields, which can be:
 * 1. A string e.g. 'Created by'.
 * 2. An object mapping locales to localized labels e.g. { en: 'Created by', it: 'Creato da' }.
 * 3. A function that takes the collection/global slug and returns a label or localized labels.
 */
export type AuditFieldLabel =
	| string
	| Record<string, string>
	| ((slug: string) => string | Record<string, string>);

export type AuditFieldsPluginOptions = {
	/**
	 * Enables or disables the plugin. Defaults to true.
	 */
	enabled?: boolean;

	/**
	 * Collections where audit fields should not be applied.
	 */
	excludedCollections?: CollectionSlug[];

	/**
	 * Globals where audit fields should not be applied.
	 */
	excludedGlobals?: GlobalSlug[];

	/**
	 * Field name for the "created by" field. Defaults to 'createdBy'.
	 */
	createdByFieldName?: string;

	/**
	 * Field name for the "last modified by" field. Defaults to 'lastModifiedBy'.
	 */
	lastModifiedByFieldName?: string;

	/**
	 * Label for the "created by" field. Defaults to 'Created by'.
	 * Can be a string, an object mapping locales to localized labels, or a function.
	 */
	createdByLabel?: AuditFieldLabel;

	/**
	 * Label for the "last modified by" field. Defaults to 'Last modified by'.
	 * Can be a string, an object mapping locales to localized labels, or a function.
	 */
	lastModifiedByLabel?: AuditFieldLabel;

	/**
	 * Whether to display audit fields in the sidebar. Defaults to true.
	 */
	showInSidebar?: boolean;

	/**
	 *  Whether to display empty fields. Defaults to false.
	 */
	showEmptyFields?: boolean;
};
