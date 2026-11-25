import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
	agentRules: false,
};

export default withPayload(nextConfig);
