"use client";

import "./index.css";

import {
	Button,
	Drawer,
	useConfig,
	useModal,
	useTranslation,
	useUploadControls,
} from "@payloadcms/ui";
import { useCallback } from "react";

import type {
	TranslationsKeys,
	TranslationsObject,
} from "../../translations.js";
import { SearchImages } from "../SearchImages/index.js";

export const searchImagesDrawerSlug = "search-images";

const baseClass = "image-search";

interface ImageSearchProps {
	enablePreview: boolean;
}

export const ImageSearch = (props: ImageSearchProps) => {
	const { enablePreview } = props;

	const { setUploadControlFileUrl } = useUploadControls();

	const { config } = useConfig();

	const { openModal, closeModal } = useModal();

	const { t } = useTranslation<TranslationsObject, TranslationsKeys>();

	const handleSearchSubmit = useCallback(
		(url: string) => {
			if (!url) {
				return;
			}

			setUploadControlFileUrl(url);

			closeModal(searchImagesDrawerSlug);
		},
		[setUploadControlFileUrl, closeModal],
	);

	return (
		<>
			<span className={`${baseClass}__or-text`}>{t("general:or")}</span>
			<Button
				buttonStyle="secondary"
				size="medium"
				onClick={() => openModal(searchImagesDrawerSlug)}
			>
				{t("imageSearch:searchImages")}
			</Button>
			<Drawer
				slug={searchImagesDrawerSlug}
				title={t("imageSearch:searchImages")}
			>
				<SearchImages
					serverURL={config.serverURL}
					api={config.routes.api}
					onSelect={handleSearchSubmit}
					enablePreview={enablePreview}
				/>
			</Drawer>
		</>
	);
};
