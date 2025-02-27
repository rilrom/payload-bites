import { CollectionSlug, PayloadRequest } from "payload";

export type SoftDeletePluginAccessArgsData = Record<string, any> & {
  collection: CollectionSlug;
  ids: string[];
  deletedAt?: Date | null;
};

export type SoftDeletePluginAccessArgs = {
  data: SoftDeletePluginAccessArgsData;
  req: PayloadRequest;
};

export type SoftDeletePluginAccess = (
  args: SoftDeletePluginAccessArgs,
) => Promise<boolean>;

export type SoftDeletePluginOptions = {
  /**
   * Enables or disables the plugin.
   *
   * @default true
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
      softDeleteAccess?: SoftDeletePluginAccess;

      /**
       * Function that determines hard delete access for the collection.
       *
       * @example hardDeleteAccess: ({ req: { user } }) => user.role === "admin"
       */
      hardDeleteAccess?: SoftDeletePluginAccess;

      /**
       * Function that determines restore access for the collection.
       *
       * @example restoreAccess: ({ req: { user } }) => user.role === "admin"
       */
      restoreAccess?: SoftDeletePluginAccess;
    };
  };
};
