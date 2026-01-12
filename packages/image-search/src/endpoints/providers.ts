import type { TFunction } from "@payloadcms/translations";
import type { Endpoint } from "payload";
import type { TranslationsKeys } from "../translations.js";
import { getProvider } from "../utils/getProvider.js";
import { getProviders } from "../utils/getProviders.js";

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

			const providers = getProviders();

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

			const provider = getProvider(
				req.routeParams?.provider as string | undefined,
			);

			const t = req.t as TFunction<TranslationsKeys>;

			if (!provider) {
				return Response.json(
					{
						data: null,
						error: t("imageSearch:providerNotSupported"),
					},
					{ status: 404 },
				);
			}

			if (!provider.isConfigured) {
				return Response.json(
					{
						data: null,
						error: t("imageSearch:providerNotConfigured"),
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

			const provider = getProvider(
				req.routeParams?.provider as string | undefined,
			);

			const t = req.t as TFunction<TranslationsKeys>;

			if (!provider) {
				return Response.json(
					{
						data: null,
						error: t("imageSearch:providerNotSupported"),
					},
					{ status: 404 },
				);
			}

			if (!provider.isConfigured) {
				return Response.json(
					{
						data: null,
						error: t("imageSearch:providerNotConfigured"),
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

			const provider = getProvider(
				req.routeParams?.provider as string | undefined,
			);

			const t = req.t as TFunction<TranslationsKeys>;

			if (!provider) {
				return Response.json(
					{
						data: null,
						error: t("imageSearch:providerNotSupported"),
					},
					{ status: 404 },
				);
			}

			if (!provider.isConfigured) {
				return Response.json(
					{
						data: null,
						error: t("imageSearch:providerNotConfigured"),
					},
					{ status: 500 },
				);
			}

			const data = await provider.trackDownload(req.query.url as string);

			return Response.json({ data, error: null });
		},
	},
];
