"use client";

import { useCallback, useEffect, useState } from "react";
import {
  LinkIcon,
  Pagination,
  SearchFilter,
  Select,
  toast,
  useTranslation,
} from "@payloadcms/ui";
import { Masonry } from "masonic";

import { ProviderResult } from "../../classes/Provider.js";
import { fetchWithCache } from "../../utils/fetchWithCache.js";
import type {
  TranslationsKeys,
  TranslationsObject,
} from "../../translations.js";

import "./index.scss";

const baseClass = "search-images";

type ProviderOption = {
  label: string;
  value: string;
};

type SearchImagesProps = {
  apiRoutePath: string;
  onSelect: (value: string) => void;
};

export const SearchImages = (props: SearchImagesProps) => {
  const { apiRoutePath, onSelect } = props;

  const { t } = useTranslation<TranslationsObject, TranslationsKeys>();

  const [providerOptions, setProviderOptions] = useState<ProviderOption[]>([]);
  const [selectedProvider, setSelectedProvider] =
    useState<ProviderOption | null>(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");
  const [images, setImages] = useState<ProviderResult[] | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number | null>(null);

  const resetImages = useCallback(() => {
    setImages(null);
    setTotalPages(null);
    setCurrentPage(1);
  }, []);

  const getProviderOptions = useCallback(async () => {
    try {
      const data = await fetchWithCache(`${apiRoutePath}/providers`);

      const providers = data.map((provider: { name: string; key: string }) => ({
        label: provider.name,
        value: provider.key.toLowerCase(),
      }));

      setProviderOptions(providers);
      setSelectedProvider(providers[0]);
    } catch {
      toast.error("Unable to fetch providers");
    }
  }, [apiRoutePath]);

  const getFeaturedPhotos = useCallback(async () => {
    try {
      setLoading(true);
      resetImages();

      const data = await fetchWithCache(
        `${apiRoutePath}/providers/${selectedProvider?.value}/featured`,
      );

      setImages(data.images);
    } catch {
      toast.error("Unable to fetch featured images");
      resetImages();
    } finally {
      setLoading(false);
    }
  }, [apiRoutePath, resetImages, selectedProvider?.value]);

  const getPhotos = useCallback(
    async (query: string, page = 1) => {
      try {
        setLoading(true);
        resetImages();

        const data = await fetchWithCache(
          `${apiRoutePath}/providers/${selectedProvider?.value}/search?query=${query}&page=${page}`,
        );

        setImages(data.images);
        setTotalPages(data.totalPages);
        setCurrentPage(page);
      } catch {
        toast.error("Unable to fetch images");
        resetImages();
      } finally {
        setLoading(false);
      }
    },
    [apiRoutePath, resetImages, selectedProvider?.value],
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
              columnGutter={16}
              items={images}
              render={({ data }) => (
                <div className={`${baseClass}__card`}>
                  <button
                    className={`${baseClass}__button`}
                    onClick={() => onSelect(data.urls.original)}
                    style={{ backgroundColor: data.color }}
                  >
                    <img
                      src={data.urls.view}
                      alt={data.alt}
                      width={data.width}
                      height={data.height}
                    />
                  </button>
                  <a
                    href={data.urls.download}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${baseClass}__download`}
                  >
                    <LinkIcon />
                  </a>
                  <a
                    href={data.attribution.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${baseClass}__attribution`}
                  >
                    {data.attribution.name}
                  </a>
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
    </div>
  );
};
