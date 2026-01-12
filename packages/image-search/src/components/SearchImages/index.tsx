"use client";

import "./index.scss";

import {
	Drawer,
	LinkIcon,
	Pagination,
	SearchFilter,
	Select,
	toast,
	useModal,
	useTranslation,
} from "@payloadcms/ui";
import { useCallback, useEffect, useState } from "react";
import { Masonry } from "react-plock";

import type { ProviderResult } from "../../classes/Provider.js";
import type {
	TranslationsKeys,
	TranslationsObject,
} from "../../translations.js";
import { fetchWithCache } from "../../utils/fetchWithCache.js";
import { PreviewImage } from "../PreviewImage/index.js";
import { ZoomIcon } from "../ZoomIcon/index.js";

const baseClass = "search-images";

export const previewImageDrawerSlug = "preview-image";

type ProviderOption = {
	label: string;
	value: string;
};

type SearchImagesProps = {
	serverURL: string;
	api: string;
	onSelect: (value: string) => void;
};

export const SearchImages = (props: SearchImagesProps) => {
	const { serverURL, api, onSelect } = props;

	const { openModal } = useModal();

	const { t } = useTranslation<TranslationsObject, TranslationsKeys>();

	const [providerOptions, setProviderOptions] = useState<ProviderOption[]>([]);
	const [selectedProvider, setSelectedProvider] =
		useState<ProviderOption | null>(null);
	const [loading, setLoading] = useState(true);
	const [value, setValue] = useState("");
	const [images, setImages] = useState<ProviderResult[] | null>(null);
	const [totalPages, setTotalPages] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState<number | null>(null);
	const [selectedImage, setSelectedImage] = useState<ProviderResult | null>(
		null,
	);

	const addDefaultError = useCallback(() => {
		toast.error(t("error:unknown"));
	}, [t]);

	const resetImages = useCallback(() => {
		setImages(null);
		setTotalPages(null);
		setCurrentPage(1);
		setSelectedImage(null);
	}, []);

	const getProviderOptions = useCallback(async () => {
		try {
			const response = await fetch(`${serverURL}${api}/providers`);

			const json = await response.json();

			if (json.error) {
				setLoading(false);
				return toast.error(json.error);
			}

			const providers = json.data.map(
				(provider: { name: string; key: string }) => ({
					label: provider.name,
					value: provider.key.toLowerCase(),
				}),
			);

			setProviderOptions(providers);
			setSelectedProvider(providers[0]);
		} catch {
			setLoading(false);
			addDefaultError();
		}
	}, [serverURL, api, addDefaultError]);

	const getFeaturedPhotos = useCallback(async () => {
		try {
			setLoading(true);
			resetImages();

			const json = await fetchWithCache(
				`${serverURL}${api}/providers/${selectedProvider?.value}/featured`,
			);

			if (json.error) {
				return toast.error(json.error);
			}

			setImages(json.data.images);
		} catch {
			addDefaultError();
			resetImages();
		} finally {
			setLoading(false);
		}
	}, [resetImages, serverURL, api, selectedProvider?.value, addDefaultError]);

	const getPhotos = useCallback(
		async (query: string, page = 1) => {
			try {
				setLoading(true);
				resetImages();

				const json = await fetchWithCache(
					`${serverURL}${api}/providers/${selectedProvider?.value}/search?query=${query}&page=${page}`,
				);

				if (json.error) {
					return toast.error(json.error);
				}

				setImages(json.data.images);
				setTotalPages(json.data.totalPages);
				setCurrentPage(page);
			} catch {
				addDefaultError();
				resetImages();
			} finally {
				setLoading(false);
			}
		},
		[resetImages, serverURL, api, selectedProvider?.value, addDefaultError],
	);

	const handleSearchFilterChange = useCallback((search: string) => {
		setValue(search);
	}, []);

	const handleSelectChange = useCallback((select: ProviderOption) => {
		setSelectedProvider(select);
	}, []);

	const handleSearch = useCallback(() => {
		if (value.length > 0) {
			getPhotos(value);
		} else {
			getFeaturedPhotos();
		}
	}, [getFeaturedPhotos, getPhotos, value]);

	const handleSelect = async (url: string, download?: string) => {
		onSelect(url);

		if (!download) {
			return;
		}

		// We don't want this to prevent users from continuing if this request fails
		try {
			await fetch(
				`${serverURL}${api}/providers/${selectedProvider?.value}/track-download?url=${download}`,
			);
		} catch {
			return null;
		}
	};

	useEffect(() => {
		if (!selectedProvider) {
			getProviderOptions();

			return;
		}

		handleSearch();
	}, [getProviderOptions, handleSearch, selectedProvider]);

	return (
		<div className={baseClass}>
			<h2>{t("imageSearch:searchImages")}</h2>

			<div className={`${baseClass}__fields`}>
				<SearchFilter label="" handleChange={handleSearchFilterChange} />
				<Select
					options={providerOptions}
					value={selectedProvider as ProviderOption}
					onChange={(value) => handleSelectChange(value as ProviderOption)}
					isClearable={false}
					isSearchable={false}
					isCreatable={false}
				/>
			</div>

			{loading && (
				<div className={`${baseClass}__loading`}>{t("general:loading")}...</div>
			)}

			{!loading && images?.length === 0 && (
				<div className={`${baseClass}__noResults`}>
					{t("imageSearch:noResults")}
				</div>
			)}

			{!loading && images && images?.length > 0 && (
				<>
					<div className={`${baseClass}__results`}>
						<Masonry
							items={images}
							config={{
								columns: [2, 3, 4, 5, 6],
								gap: [16, 16, 16, 16, 16],
								media: [768, 992, 1200, 1400, 1600],
								useBalancedLayout: true,
							}}
							render={(data) => (
								<div className={`${baseClass}__card`}>
									<button
										type="button"
										className={`${baseClass}__button`}
										onClick={() =>
											handleSelect(
												data.urls.original,
												data.urls?.downloadLocation,
											)
										}
										style={{ backgroundColor: data.color }}
									>
										<img
											src={data.urls.view}
											alt={data.alt}
											width={data.width}
											height={data.height}
										/>
									</button>
									<div className={`${baseClass}__topOverlay`}>
										<button
											type="button"
											className={`${baseClass}__button`}
											onClick={() => {
												setSelectedImage(data);
												openModal(previewImageDrawerSlug);
											}}
										>
											<ZoomIcon />
										</button>
									</div>
									<div className={`${baseClass}__bottomOverlay`}>
										<a
											className={`${baseClass}__download`}
											href={data.urls.download}
											target="_blank"
											rel="noopener noreferrer"
										>
											<LinkIcon />
										</a>
										<a
											className={`${baseClass}__attribution`}
											href={data.attribution.link}
											target="_blank"
											rel="noopener noreferrer"
										>
											{data.attribution.name}
										</a>
									</div>
								</div>
							)}
						/>
					</div>

					{currentPage && totalPages && totalPages > 1 && (
						<div className={`${baseClass}__pagination`}>
							<Pagination
								hasNextPage={currentPage < totalPages}
								hasPrevPage={currentPage > 1}
								nextPage={
									currentPage < totalPages ? currentPage + 1 : undefined
								}
								numberOfNeighbors={3}
								page={currentPage}
								prevPage={currentPage > 1 ? currentPage - 1 : undefined}
								totalPages={totalPages}
								onChange={(page: number) => getPhotos(value, page)}
							/>
						</div>
					)}

					<p className={`${baseClass}__provider`}>
						{t("imageSearch:imageLibrary", {
							provider: selectedProvider?.label,
						})}
					</p>
				</>
			)}

			<Drawer Header={null} slug={previewImageDrawerSlug}>
				<PreviewImage
					slug={previewImageDrawerSlug}
					selectedImage={selectedImage}
					onSelect={handleSelect}
				/>
			</Drawer>
		</div>
	);
};
