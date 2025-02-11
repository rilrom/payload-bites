import { parseCookies } from "payload";

export const getSoftDeleteCookie = (headers: Headers): string | null => {
  const cookies = parseCookies(headers);

  const softDeleteCookie = cookies.get("payload-soft-delete") || null;

  return softDeleteCookie;
};
