import config from "@payload-config";
import { getPayload as getPayloadBase } from "payload";

export const getPayload = async () => {
	const payload = await getPayloadBase({ config });

	return payload;
};
