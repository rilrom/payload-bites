import { type Access, type CollectionSlug, PayloadRequest } from "payload";

export type BrokenLinkCheckerResolvedUrl = {
  url: string;
  id?: string;
  collection?: CollectionSlug;
};

export type BrokenLinkCheckerPluginOptions = {
  /**
   * Enables or disables the plugin.
   *
   * @default true
   */
  enabled?: boolean;

  /** Function that determines scan links access control. Only the req attribute is available.
   * @example
   * providerAccess: ({ req: { user } }) => user.role === "admin"
   */
  scanLinksAccess?: Access;

  /** Function that determines broken link reports collection access control. Only the req attribute is available.
   * @example
   * providerAccess: ({ req: { user } }) => user.role === "admin"
   */
  brokenLinksAccess?: Access;

  /**
   * Collections that should be scanned by the broken link checker.
   */
  collections: {
    [key in CollectionSlug]?: {
      resolvedUrls:
        | BrokenLinkCheckerResolvedUrl[]
        | ((args: { req: PayloadRequest }) => Promise<BrokenLinkCheckerResolvedUrl[]>);
    };
  };
};
