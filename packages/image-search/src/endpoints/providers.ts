import type { Endpoint } from "payload";

import { ProviderManager } from "../classes/ProviderManager.js";

export const providers: Endpoint[] = [
	{
		path: "/providers",
		method: "get",
		handler: async (req) => {
			const access = await req.payload?.config?.custom?.providerAccess?.({
				req,
			});

			if (!access) {
				return Response.json(
					{ data: null, error: req.t("error:notAllowedToPerformAction") },
					{ status: 403 },
				);
			}

			const providers = ProviderManager.getProviders();

			return Response.json({ data: providers, error: null });
		},
	},
	{
		path: "/providers/:provider/featured",
		method: "get",
		handler: async (req) => {
			const access = await req.payload?.config?.custom?.providerAccess?.({
				req,
			});

			if (!access) {
				return Response.json(
					{ data: null, error: req.t("error:notAllowedToPerformAction") },
					{ status: 403 },
				);
			}

			const provider = ProviderManager.getProvider(
				req.routeParams?.provider as string | undefined,
			);

			if (!provider) {
				return Response.json(
					{
						data: null,
						error: req.t("imageSearch:providerNotSupported" as any),
					},
					{ status: 404 },
				);
			}

			if (!provider.isConfigured) {
				return Response.json(
					{
						data: null,
						error: req.t("imageSearch:providerNotConfigured" as any),
					},
					{ status: 500 },
				);
			}

			const data = await provider.getFeatured();

			return Response.json({ data, error: null });
		},
	},
	{
		path: "/providers/:provider/search",
		method: "get",
		handler: async (req) => {
			const access = await req.payload?.config?.custom?.providerAccess?.({
				req,
			});

			if (!access) {
				return Response.json(
					{ data: null, error: req.t("error:notAllowedToPerformAction") },
					{ status: 403 },
				);
			}

			const provider = ProviderManager.getProvider(
				req.routeParams?.provider as string | undefined,
			);

			if (!provider) {
				return Response.json(
					{
						data: null,
						error: req.t("imageSearch:providerNotSupported" as any),
					},
					{ status: 404 },
				);
			}

			if (!provider.isConfigured) {
				return Response.json(
					{
						data: null,
						error: req.t("imageSearch:providerNotConfigured" as any),
					},
					{ status: 500 },
				);
			}

			const data = await provider.getSearch(
				req.query.query as string,
				req.query.page as number,
			);

			return Response.json({ data, error: null });
		},
	},
	{
		path: "/providers/:provider/track-download",
		method: "get",
		handler: async (req) => {
			const access = await req.payload?.config?.custom?.providerAccess?.({
				req,
			});

			if (!access) {
				return Response.json(
					{ data: null, error: req.t("error:notAllowedToPerformAction") },
					{ status: 403 },
				);
			}

			const provider = ProviderManager.getProvider(
				req.routeParams?.provider as string | undefined,
			);

			if (!provider) {
				return Response.json(
					{
						data: null,
						error: req.t("imageSearch:providerNotSupported" as any),
					},
					{ status: 404 },
				);
			}

			if (!provider.isConfigured) {
				return Response.json(
					{
						data: null,
						error: req.t("imageSearch:providerNotConfigured" as any),
					},
					{ status: 500 },
				);
			}

			const data = await provider.trackDownload(req.query.url as string);

			return Response.json({ data, error: null });
		},
	},
];
