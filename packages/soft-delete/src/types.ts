import { Access, CollectionSlug } from "payload";

export type SoftDeletePluginOptions = {
  /**
   * Enables or disables the plugin. Defaults to true.
   */
  enabled?: boolean;

  /**
   * Collections where soft delete should be applied.
   */
  collections: {
    [key in CollectionSlug]?: {
      /**
       * Enable or disable hard delete for the collection.
       *
       * @default true
       */
      enableHardDelete?: boolean;

      /**
       * Enable or disable restore for the collection.
       *
       * @default true
       */
      enableRestore?: boolean;

      /**
       * Function that determines soft delete access for the collection.
       *
       * @example softDeleteAccess: ({ req: { user } }) => user.role === "admin"
       */
      softDeleteAccess?: Access;

      /**
       * Function that determines hard delete access for the collection.
       *
       * @example hardDeleteAccess: ({ req: { user } }) => user.role === "admin"
       */
      hardDeleteAccess?: Access;

      /**
       * Function that determines restore access for the collection.
       *
       * @example restoreAccess: ({ req: { user } }) => user.role === "admin"
       */
      restoreAccess?: Access;
    };
  };
};
