import {
  type Access,
  type CollectionAdminOptions,
  type CollectionConfig,
  type CollectionSlug,
  type GlobalSlug,
} from "payload";

export type ActivityLogPluginSharedLoggingOptions = {
  activityLogSlug: string;
  enableIpAddressLogging: boolean;
  enableDeviceInfoLogging: boolean;
};

export type ActivityLogPluginOptions = {
  /**
   * Enables or disables the plugin.
   *
   * @default true
   */
  enabled?: boolean;

  /**
   * This function takes the default activity log collection configured in the plugin and allows you to override it by modifying and returning it.
   *
   * @example
   * overrideActivityLogCollection: (collection) => ({
   *   ...collection,
   *   access: {
   *     ...collection?.access,
   *     update: () => true,
   *     create: () => true,
   *   },
   *   admin: {
   *     ...collection?.admin,
   *     group: "Reporting",
   *   },
   * }),
   */
  overrideActivityLogCollection?: (collection: CollectionConfig) => CollectionConfig;

  /**
   * Admin options for the activity log collection.
   * Only the `group` property from `CollectionAdminOptions` is used for now.
   *
   * @deprecated use overrideActivityLogCollection instead
   *
   * @example
   * admin: {
   *   group: "Administration",
   * }
   *
   */
  admin?: Pick<CollectionAdminOptions, "group">;

  /**
   * Enables or disables draft autosave logging.
   *
   * @default true
   */
  enableDraftAutosaveLogging?: boolean;

  /**
   * @deprecated use overrideActivityLogCollection instead
   */
  access?: {
    /**
     * Function that determines read access for the activity log collection.
     *
     * @deprecated use overrideActivityLogCollection instead
     *
     * @example read: ({ req: { user } }) => user.role === "admin"
     */
    read?: Access;

    /**
     * Function that determines update access for the activity log collection.
     *
     * @deprecated use overrideActivityLogCollection instead
     *
     * @example update: ({ req: { user } }) => user.role === "admin"
     */
    update?: Access;

    /**
     * Function that determines delete access for the activity log collection.
     *
     * @deprecated use overrideActivityLogCollection instead
     *
     * @example delete: ({ req: { user } }) => user.role === "admin"
     */
    delete?: Access;
  };

  /**
   * Collections where activity log should be applied.
   */
  collections: {
    [key in CollectionSlug]?: {
      /**
       * Enables or disables create operation logging.
       *
       * @default true
       */
      enableCreateLogging?: boolean;

      /**
       * Enables or disables update operation logging.
       *
       * @default true
       */
      enableUpdateLogging?: boolean;

      /**
       * Enables or disables delete operation logging.
       *
       * @default true
       */
      enableDeleteLogging?: boolean;

      /**
       * Enables or disables ip address logging.
       *
       * @default true
       */
      enableIpAddressLogging?: boolean;

      /**
       * Enables or disables device info logging.
       *
       * @default true
       */
      enableDeviceInfoLogging?: boolean;
    };
  };

  /**
   * Globals where activity log should be applied.
   */
  globals: {
    [key in GlobalSlug]?: {
      /**
       * Enables or disables ip address logging.
       *
       * @default true
       */
      enableIpAddressLogging?: boolean;

      /**
       * Enables or disables device info logging.
       *
       * @default true
       */
      enableDeviceInfoLogging?: boolean;
    };
  };
};
