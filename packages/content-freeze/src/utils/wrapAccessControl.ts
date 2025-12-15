import { type Access } from "payload";

export const wrapAccessControl = (
  originalAccess: Access | undefined,
  settingsSlug: string,
  entitySlug: string,
  entityType: "collection" | "global",
): Access => {
  return async (args) => {
    const freezeSettings = await args.req.payload.findGlobal({
      slug: settingsSlug,
      req: args.req,
    });

    if (freezeSettings?.enableContentFreeze) {
      if (entityType === "collection") {
        if (freezeSettings?.collections?.includes(entitySlug)) {
          return false;
        }
      }

      if (entityType === "global") {
        if (freezeSettings?.globals?.includes(entitySlug)) {
          return false;
        }
      }
    }

    if (originalAccess) {
      if (typeof originalAccess === "function") {
        return await originalAccess(args);
      }

      return originalAccess;
    }

    return Boolean(args.req.user);
  };
};
