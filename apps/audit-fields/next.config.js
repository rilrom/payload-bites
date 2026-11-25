import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
	agentRules: false,
	async redirects() {
		return [
			{
				source: "/",
				destination: "/admin",
				permanent: true,
			},
		];
	},
};

export default withPayload(nextConfig);
