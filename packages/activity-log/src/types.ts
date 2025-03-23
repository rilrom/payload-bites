import {
  type Access,
  type CollectionSlug,
  type GlobalSlug,
  type PayloadRequest,
} from "payload";

export type ActivityLogPluginSharedLoggingOptions = {
  enableIpAddressLogging: boolean;
  enableDeviceInfoLogging: boolean;
};

export type ActivityLogPluginAccessArgs = {
  req: PayloadRequest;
};

export type ActivityLogPluginAccess = (
  args: ActivityLogPluginAccessArgs,
) => boolean | Promise<boolean>;

export type ActivityLogPluginOptions = {
  /**
   * Enables or disables the plugin.
   *
   * @default true
   */
  enabled?: boolean;

  access?: {
    /**
     * Function that determines read access for the activity log collection.
     *
     * @example readAccess: ({ req: { user } }) => user.role === "admin"
     */
    read?: Access;

    /**
     * Function that determines update access for the activity log collection.
     *
     * @example updateAccess: ({ req: { user } }) => user.role === "admin"
     */
    update?: Access;

    /**
     * Function that determines delete access for the activity log collection.
     *
     * @example deleteAccess: ({ req: { user } }) => user.role === "admin"
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
