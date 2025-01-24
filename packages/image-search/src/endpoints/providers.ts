import { Endpoint } from "payload";

import { ProviderManager } from "../classes/ProviderManager.js";

export const providers: Endpoint[] = [
  {
    path: "/providers",
    method: "get",
    handler: async (req) => {
      if (!req.user) {
        return Response.json({ error: "Forbidden" }, { status: 403 });
      }

      const providers = ProviderManager.getProviders();

      return Response.json({ data: providers });
    },
  },
  {
    path: "/providers/:provider/featured",
    method: "get",
    handler: async (req) => {
      if (!req.user) {
        return Response.json({ error: "Forbidden" }, { status: 403 });
      }

      const provider = ProviderManager.getProvider(
        req.routeParams?.provider as string | undefined,
      );

      if (!provider) {
        return Response.json(
          { error: "Provider is not supported" },
          { status: 404 },
        );
      }

      if (!provider.isConfigured) {
        return Response.json(
          { error: "Provider has not been configured correctly" },
          { status: 500 },
        );
      }

      const data = await provider.getFeatured();

      return Response.json({ data });
    },
  },
  {
    path: "/providers/:provider/search",
    method: "get",
    handler: async (req) => {
      if (!req.user) {
        return Response.json({ error: "Forbidden" }, { status: 403 });
      }

      const provider = ProviderManager.getProvider(
        req.routeParams?.provider as string | undefined,
      );

      if (!provider) {
        return Response.json(
          { error: "Provider is not supported" },
          { status: 404 },
        );
      }

      if (!provider.isConfigured) {
        return Response.json(
          { error: "Provider has not been configured correctly" },
          { status: 500 },
        );
      }

      const data = await provider.getSearch(
        req.query.query as string,
        req.query.page as number,
      );

      return Response.json({ data });
    },
  },
  {
    path: "/providers/:provider/track-download",
    method: "get",
    handler: async (req) => {
      if (!req.user) {
        return Response.json({ error: "Forbidden" }, { status: 403 });
      }

      const provider = ProviderManager.getProvider(
        req.routeParams?.provider as string | undefined,
      );

      if (!provider) {
        return Response.json(
          { error: "Provider is not supported" },
          { status: 404 },
        );
      }

      if (!provider.isConfigured) {
        return Response.json(
          { error: "Provider has not been configured correctly" },
          { status: 500 },
        );
      }

      const data = await provider.trackDownload(req.query.url as string);

      return Response.json({ data });
    },
  },
];
