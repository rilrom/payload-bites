import type { Endpoint } from "payload";
import { Forbidden } from "payload";

export const endpoints: Endpoint[] = [
	{
		path: "/broken-link-checker/status",
		method: "get",
		handler: async (req) => {
			const access =
				await req.payload?.config?.custom?.brokenLinkChecker?.scanLinksAccess?.(
					{ req },
				);

			if (!access) {
				throw new Forbidden();
			}

			const jobResult = await req.payload.find({
				collection: "payload-jobs",
				overrideAccess: true,
				where: {
					and: [
						{ taskSlug: { equals: "scanLinks" } },
						{ processingUntil: { greater_than: new Date().toISOString() } },
					],
				},
				limit: 1,
				depth: 0,
				select: { createdAt: true },
			});

			const job = jobResult.docs?.[0] ?? null;

			return Response.json({ success: true, job });
		},
	},
	{
		path: "/broken-link-checker/scan",
		method: "post",
		handler: async (req) => {
			const data = await req.json?.();

			const access =
				await req.payload?.config?.custom?.brokenLinkChecker?.scanLinksAccess?.(
					{ req, data },
				);

			if (!access) {
				throw new Forbidden();
			}

			const job = await req.payload.jobs.queue({
				task: "scanLinks",
				queue: "brokenLinkChecker",
				input: undefined,
				overrideAccess: true,
			});

			void req.payload.jobs
				.runByID({
					id: job.id,
					req,
					overrideAccess: true,
				})
				.catch((err) =>
					req.payload.logger.error({
						err,
						msg: "[broken-link-checker]: Scan failed.",
					}),
				);

			return Response.json({ success: true });
		},
	},
];
