import type { BaseListFilter } from "payload";

import { getSoftDeleteCookie } from "./getSoftDeleteCookie.js";

export const combinedBaseListFilter =
  (baseListFilter?: BaseListFilter): BaseListFilter =>
  async (args) => {
    const filterConstraints = [];

    if (typeof baseListFilter === "function") {
      const baseListFilterResult = await baseListFilter(args);

      if (baseListFilterResult) {
        filterConstraints.push(baseListFilterResult);
      }
    }

    const softDeleteCookie = getSoftDeleteCookie(args.req.headers);

    if (softDeleteCookie === "true") {
      filterConstraints.push({ deletedAt: { exists: true } });
    } else {
      filterConstraints.push({ deletedAt: { equals: null } });
    }

    return { and: filterConstraints };
  };
