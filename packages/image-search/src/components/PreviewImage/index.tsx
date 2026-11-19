"use client";

import "./index.css";

import { Drawer, useModal, useTranslation } from "@payloadcms/ui";

import type { ProviderResult } from "../../classes/Provider.js";
import type {
	TranslationsKeys,
	TranslationsObject,
} from "../../translations.js";

const baseClass = "preview-image";

type PreviewImageProps = {
	slug: string;
	selectedImage: ProviderResult | null;
	onSelect: (url: string, download?: string) => void;
};

export const PreviewImage = (props: PreviewImageProps) => {
	const { slug, selectedImage, onSelect } = props;

	const { closeModal } = useModal();

	const { t } = useTranslation<TranslationsObject, TranslationsKeys>();

	return (
		<Drawer
			slug={slug}
			title={t("imageSearch:previewImage")}
			headerActions={[
				{
					label: t("general:cancel"),
					onClick: () => closeModal(slug),
					style: "secondary",
				},
				{
					disabled: !selectedImage,
					label: t("imageSearch:selectImage"),
					onClick: () => {
						if (!selectedImage) {
							return;
						}

						onSelect(
							selectedImage.urls.original,
							selectedImage.urls?.downloadLocation,
						);
						closeModal(slug);
					},
					style: "primary",
				},
			]}
		>
			{selectedImage && (
				<div className={baseClass}>
					<img
						className={`${baseClass}__image`}
						src={selectedImage.urls.original}
						alt={selectedImage.alt}
					/>
				</div>
			)}
		</Drawer>
	);
};
