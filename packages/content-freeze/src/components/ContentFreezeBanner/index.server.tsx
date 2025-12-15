import { type ServerComponentProps } from "payload";

import { ContentFreezeBannerClient } from "./index.client.js";

interface ContentFreezeBannerRscProps extends ServerComponentProps {
  slug: string;
}

export const ContentFreezeBannerRsc = async (props: ContentFreezeBannerRscProps) => {
  const { payload, slug } = props;

  let enableContentFreeze = false;
  let message: string | undefined;

  try {
    const freezeSettings = await payload.findGlobal({
      slug,
    });

    enableContentFreeze = freezeSettings?.enableContentFreeze === true;
    message = freezeSettings?.message || undefined;
  } catch (error) {
    console.error("[content-freeze]: error fetching content freeze settings", error);
  }

  return <ContentFreezeBannerClient enableContentFreeze={enableContentFreeze} message={message} />;
};
