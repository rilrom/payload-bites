/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. MODIFY AT YOUR OWN RISK. */
import "@payloadcms/next/css";

import config from "@payload-config";
import {
	generatePayloadViewport,
	handleServerFunctions,
	RootLayout,
} from "@payloadcms/next/layouts";
import type { ServerFunctionClient } from "payload";
import type React from "react";

import { importMap } from "./admin/importMap.js";

export const generateViewport = generatePayloadViewport;

type Args = {
	children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async (args) => {
	"use server";
	return handleServerFunctions({
		...args,
		config,
		importMap,
	});
};

const Layout = ({ children }: Args) => (
	<RootLayout
		config={config}
		importMap={importMap}
		serverFunction={serverFunction}
	>
		{children}
	</RootLayout>
);

export default Layout;
