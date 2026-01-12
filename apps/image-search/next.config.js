import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: "/",
				destination: "/admin",
				permanent: true,
			},
		];
	},
	experimental: {
		serverActions: {
			// Temporary until https://github.com/payloadcms/payload/pull/15078 is resolved
			bodySizeLimit: "10mb",
		},
	},
};

export default withPayload(nextConfig);
