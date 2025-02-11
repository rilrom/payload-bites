import { Access, CollectionSlug } from "payload";

export type SoftDeletePluginOptions = {
  /**
   * Enables or disables the plugin. Defaults to true.
   */
  enabled?: boolean;

  /**
   * Collections where soft delete should be applied.
   */
  collections?: CollectionSlug[];

  /**
   * Access control for each enabled collection.
   */
  access?: {
    [key in CollectionSlug]?: {
      /** Function that determines soft delete access for the collection.
       * @example
       * softDeleteAccess: ({ req: { user } }) => user.role === "admin"
       */
      softDeleteAccess?: Access;

      /** Function that determines hard delete access for the collection.
       * @example
       * hardDeleteAccess: ({ req: { user } }) => user.role === "admin"
       */
      hardDeleteAccess?: Access;

      /** Function that determines restore access for the collection.
       * @example
       * restoreAccess: ({ req: { user } }) => user.role === "admin"
       */
      restoreAccess?: Access;
    };
  };
};
