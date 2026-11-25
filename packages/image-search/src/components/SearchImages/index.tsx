"use client";

import "./index.css";

import {
	LinkIcon,
	Pagination,
	SearchInput,
	Select,
	toast,
	useDebounce,
	useModal,
	useTranslation,
} from "@payloadcms/ui";
import { useCallback, useEffect, useRef, useState } from "react";
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

const previewImageDrawerSlug = "preview-image";

const MIN_COLUMN_WIDTH = 160;
const MIN_COLUMNS = 2;
const MAX_COLUMNS = 5;
const GAP = 16;

const getColumnCount = (width: number) => {
	return Math.min(
		MAX_COLUMNS,
		Math.max(MIN_COLUMNS, Math.floor((width + GAP) / (MIN_COLUMN_WIDTH + GAP))),
	);
};

type ProviderOption = {
	label: string;
	value: string;
};

type SearchImagesProps = {
	serverURL: string;
	api: string;
	onSelect: (value: string) => void;
	enablePreview: boolean;
};

export const SearchImages = (props: SearchImagesProps) => {
	const { serverURL, api, onSelect, enablePreview } = props;

	const { openModal } = useModal();

	const { t } = useTranslation<TranslationsObject, TranslationsKeys>();

	const [providerOptions, setProviderOptions] = useState<ProviderOption[]>([]);
	const [selectedProvider, setSelectedProvider] =
		useState<ProviderOption | null>(null);
	const [loading, setLoading] = useState(true);
	const [inputValue, setInputValue] = useState("");
	const value = useDebounce(inputValue, 300);
	const [images, setImages] = useState<ProviderResult[] | null>(null);
	const [totalPages, setTotalPages] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState<number | null>(null);
	const [selectedImage, setSelectedImage] = useState<ProviderResult | null>(
		null,
	);
	const [resultsWidth, setResultsWidth] = useState(0);
	const latestRequestRef = useRef(0);

	const resultsRef = useCallback((node: HTMLDivElement) => {
		const observer = new ResizeObserver(([entry]) => {
			if (entry) {
				setResultsWidth(entry.contentRect.width);
			}
		});

		setResultsWidth(node.getBoundingClientRect().width);

		observer.observe(node);

		return () => observer.disconnect();
	}, []);

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
		const requestId = ++latestRequestRef.current;

		try {
			setLoading(true);
			resetImages();

			const json = await fetchWithCache(
				`${serverURL}${api}/providers/${selectedProvider?.value}/featured`,
			);

			if (requestId !== latestRequestRef.current) {
				return;
			}

			if (json.error) {
				return toast.error(json.error);
			}

			setImages(json.data.images);
		} catch {
			if (requestId === latestRequestRef.current) {
				addDefaultError();
				resetImages();
			}
		} finally {
			if (requestId === latestRequestRef.current) {
				setLoading(false);
			}
		}
	}, [resetImages, serverURL, api, selectedProvider?.value, addDefaultError]);

	const getPhotos = useCallback(
		async (query: string, page = 1) => {
			const requestId = ++latestRequestRef.current;

			try {
				setLoading(true);
				resetImages();

				const json = await fetchWithCache(
					`${serverURL}${api}/providers/${selectedProvider?.value}/search?query=${encodeURIComponent(query)}&page=${page}`,
				);

				if (requestId !== latestRequestRef.current) {
					return;
				}

				if (json.error) {
					return toast.error(json.error);
				}

				setImages(json.data.images);
				setTotalPages(json.data.totalPages);
				setCurrentPage(page);
			} catch {
				if (requestId === latestRequestRef.current) {
					addDefaultError();
					resetImages();
				}
			} finally {
				if (requestId === latestRequestRef.current) {
					setLoading(false);
				}
			}
		},
		[resetImages, serverURL, api, selectedProvider?.value, addDefaultError],
	);

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
				`${serverURL}${api}/providers/${selectedProvider?.value}/track-download?url=${encodeURIComponent(download)}`,
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
			<div className={`${baseClass}__fields`}>
				<SearchInput
					aria-label={t("imageSearch:searchImages")}
					className={`${baseClass}__search`}
					value={inputValue}
					onChange={setInputValue}
					onClear={() => setInputValue("")}
				/>
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
					<div className={`${baseClass}__results`} ref={resultsRef}>
						<Masonry
							items={images}
							config={{
								columns: getColumnCount(resultsWidth),
								gap: GAP,
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
									{enablePreview && (
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
									)}
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

			{enablePreview && (
				<PreviewImage
					slug={previewImageDrawerSlug}
					selectedImage={selectedImage}
					onSelect={handleSelect}
				/>
			)}
		</div>
	);
};
