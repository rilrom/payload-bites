/**
 * Options for creating a document in a collection
 */
export interface CreateDocumentOptions {
	/**
	 * The name of the field to fill
	 * @default 'text'
	 */
	fieldName?: string;
	/**
	 * The value to set in the field
	 * @default 'Test document ${Date.now()}'
	 */
	fieldValue?: string;
	/**
	 * Whether to wait for save to complete and return document ID
	 * @default true
	 */
	waitForSave?: boolean;
}
