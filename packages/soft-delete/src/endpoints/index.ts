import { Forbidden } from "payload";
import type { Endpoint } from "payload";

export const endpoints: Endpoint[] = [
  {
    path: "/soft-delete",
    method: "post",
    handler: async (req) => {
      const data = await req.json?.();

      const access = await req.payload.collections?.[
        data?.["collection"]
      ]?.config?.custom?.softDelete?.softDeleteAccess?.({ req, data });

      if (!access) {
        throw new Forbidden();
      }

      let response;

      if (data?.["id"]) {
        response = await req.payload.update({
          collection: data?.["collection"],
          id: data["id"],
          data: {
            deletedAt: new Date(),
          },
          req: req
        });
      } else if (data?.["ids"]) {
        response = await req.payload.update({
          collection: data?.["collection"],
          where: {
            id: {
              in: data["ids"],
            },
          },
          data: {
            deletedAt: new Date(),
          },
           req: req
        });
      }

      return Response.json(response);
    },
  },
  {
    path: "/hard-delete",
    method: "delete",
    handler: async (req) => {
      const data = await req.json?.();

      const enabled =
        req.payload.collections?.[data?.["collection"]]?.config?.custom
          ?.softDelete?.enableHardDelete;

      const access = await req.payload.collections?.[
        data?.["collection"]
      ]?.config?.custom?.softDelete?.hardDeleteAccess?.({ req, data });

      if (!enabled || !access) {
        throw new Forbidden();
      }

      let response;

      if (data?.["id"]) {
        response = await req.payload.delete({
          collection: data?.["collection"],
          id: data["id"],
        });
      } else if (data?.["ids"]) {
        response = await req.payload.delete({
          collection: data?.["collection"],
          where: {
            id: {
              in: data["ids"],
            },
          },
        });
      }

      return Response.json(response);
    },
  },
  {
    path: "/restore",
    method: "post",
    handler: async (req) => {
      const data = await req.json?.();

      const enabled =
        req.payload.collections?.[data?.["collection"]]?.config?.custom
          ?.softDelete?.enableRestore;

      const access = await req.payload.collections?.[
        data?.["collection"]
      ]?.config?.custom?.softDelete?.restoreAccess?.({ req, data });

      if (!enabled || !access) {
        throw new Forbidden();
      }

      let response;

      if (data?.["id"]) {
        response = await req.payload.update({
          collection: data?.["collection"],
          id: data["id"],
          data: {
            deletedAt: null,
          },
        });
      } else if (data?.["ids"]) {
        response = await req.payload.update({
          collection: data?.["collection"],
          where: {
            id: {
              in: data["ids"],
            },
          },
          data: {
            deletedAt: null,
          },
        });
      }

      return Response.json(response);
    },
  },
];
