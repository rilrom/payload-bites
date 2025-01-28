"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { isImage } from "payload/shared";
import {
  FieldError,
  fieldBaseClass,
  useForm,
  useFormProcessing,
  useField,
  useDocumentInfo,
  EditDepthProvider,
  useTranslation,
  useUploadEdits,
  Button,
  Drawer,
  DrawerToggler,
  Dropzone,
  Thumbnail,
  useModal,
  EditUpload,
  FileDetails,
  PreviewSizes,
  toast,
} from "@payloadcms/ui";
import type {
  FormState,
  SanitizedCollectionConfig,
  UploadEdits,
} from "payload";

import { SearchImages } from "../SearchImages/index.js";
import type {
  TranslationsKeys,
  TranslationsObject,
} from "../../translations.js";

import "./index.scss";

const baseClass = "file-field";

export const editDrawerSlug = "edit-upload";
export const searchImagesDrawerSlug = "search-images";
export const sizePreviewSlug = "preview-sizes";

const validate = (value: File) => {
  if (!value && value !== undefined) {
    return "A file is required.";
  }

  return true;
};

type UploadActionsArgs = {
  readonly customActions?: React.ReactNode[];
  readonly enableAdjustments: boolean;
  readonly enablePreviewSizes: boolean;
  readonly mimeType: string;
};

export const UploadActions = ({
  customActions,
  enableAdjustments,
  enablePreviewSizes,
  mimeType,
}: UploadActionsArgs) => {
  const { t } = useTranslation();

  const fileTypeIsAdjustable =
    isImage(mimeType) &&
    mimeType !== "image/svg+xml" &&
    mimeType !== "image/jxl";

  if (!fileTypeIsAdjustable && (!customActions || customActions.length === 0)) {
    return null;
  }

  return (
    <div className={`${baseClass}__upload-actions`}>
      {fileTypeIsAdjustable && (
        <React.Fragment>
          {enablePreviewSizes && (
            <DrawerToggler
              className={`${baseClass}__previewSizes`}
              slug={sizePreviewSlug}
            >
              {t("upload:previewSizes")}
            </DrawerToggler>
          )}
          {enableAdjustments && (
            <DrawerToggler
              className={`${baseClass}__edit`}
              slug={editDrawerSlug}
            >
              {t("upload:editImage")}
            </DrawerToggler>
          )}
        </React.Fragment>
      )}

      {customActions &&
        customActions.map((CustomAction, i) => {
          return <React.Fragment key={i}>{CustomAction}</React.Fragment>;
        })}
    </div>
  );
};

export type UploadProps = {
  readonly collectionSlug: string;
  readonly customActions?: React.ReactNode[];
  readonly initialState?: FormState;
  readonly onChange?: (file?: File) => void;
  readonly uploadConfig: SanitizedCollectionConfig["upload"];
  readonly serverURL: string;
  readonly api: string;
};

export const Upload: React.FC<UploadProps> = (props) => {
  const {
    collectionSlug,
    customActions,
    initialState,
    onChange,
    uploadConfig,
    serverURL,
    api,
  } = props;

  const { t } = useTranslation<TranslationsObject, TranslationsKeys>();
  const { setModified } = useForm();
  const { resetUploadEdits, updateUploadEdits, uploadEdits } = useUploadEdits();
  const { id, docPermissions, savedDocumentData, setUploadStatus } =
    useDocumentInfo();
  const isFormSubmitting = useFormProcessing();
  const { errorMessage, setValue, showError, value } = useField<File>({
    path: "file",
    validate,
  });

  const { openModal, closeModal } = useModal();

  const [fileSrc, setFileSrc] = useState<null | string>(null);
  const [removedFile, setRemovedFile] = useState(false);
  const [filename, setFilename] = useState<string>(value?.name || "");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [fileUrl, setFileUrl] = useState<string>("");

  const urlInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const useServerSideFetch =
    typeof uploadConfig?.pasteURL === "object" &&
    uploadConfig.pasteURL.allowList?.length > 0;

  const handleFileChange = useCallback(
    (newFile?: File) => {
      if (newFile instanceof File) {
        setFileSrc(URL.createObjectURL(newFile));
      }

      setValue(newFile);
      setShowUrlInput(false);

      if (typeof onChange === "function") {
        onChange(newFile);
      }
    },
    [onChange, setValue],
  );

  const renameFile = (fileToChange: File, newName: string): File => {
    // Creating a new File object with updated properties
    const newFile = new File([fileToChange], newName, {
      type: fileToChange.type,
      lastModified: fileToChange.lastModified,
    });
    return newFile;
  };

  const handleFileNameChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedFileName = e.target.value;

      if (value) {
        handleFileChange(renameFile(value, updatedFileName));
        setFilename(updatedFileName);
      }
    },
    [handleFileChange, value],
  );

  const handleFileSelection = useCallback(
    (files: FileList) => {
      const fileToUpload = files?.[0];
      handleFileChange(fileToUpload);
    },
    [handleFileChange],
  );

  const handleFileRemoval = useCallback(() => {
    setRemovedFile(true);
    handleFileChange(undefined);
    setFileSrc("");
    setFileUrl("");
    resetUploadEdits();
    setShowUrlInput(false);
  }, [handleFileChange, resetUploadEdits]);

  const onEditsSave = useCallback(
    (args: UploadEdits) => {
      setModified(true);
      updateUploadEdits(args);
    },
    [setModified, updateUploadEdits],
  );

  const handleUrlSubmit = async (url?: string) => {
    if ((!fileUrl && !url) || uploadConfig?.pasteURL === false) {
      return;
    }

    const finalUrl = url || fileUrl;

    setUploadStatus?.("uploading");

    try {
      // Attempt client-side fetch
      const clientResponse = await fetch(finalUrl);

      if (!clientResponse.ok) {
        throw new Error(`Fetch failed with status: ${clientResponse.status}`);
      }

      const blob = await clientResponse.blob();
      const fileName = decodeURIComponent(finalUrl.split("/").pop() || "");
      const file = new File([blob], fileName, { type: blob.type });

      handleFileChange(file);
      setUploadStatus?.("idle");

      return; // Exit if client-side fetch succeeds
    } catch {
      if (!useServerSideFetch) {
        // If server-side fetch is not enabled, show client-side error
        toast.error("Failed to fetch the file.");
        setUploadStatus?.("failed");

        return;
      }
    }
    // Attempt server-side fetch if client-side fetch fails and useServerSideFetch is true
    try {
      const pasteURL = `/${collectionSlug}/paste-url${id ? `/${id}?` : "?"}src=${encodeURIComponent(finalUrl)}`;
      const serverResponse = await fetch(`${serverURL}${api}${pasteURL}`);

      if (!serverResponse.ok) {
        throw new Error(`Fetch failed with status: ${serverResponse.status}`);
      }

      const blob = await serverResponse.blob();
      const fileName = decodeURIComponent(finalUrl.split("/").pop() || "");
      const file = new File([blob], fileName, { type: blob.type });

      handleFileChange(file);
      setUploadStatus?.("idle");
    } catch {
      toast.error("The provided URL is not allowed.");
      setUploadStatus?.("failed");
    }
  };

  const handleSearchSubmit = async (url: string) => {
    if (!url || uploadConfig?.pasteURL === false) {
      return;
    }

    setFileUrl(url);

    await handleUrlSubmit(url);

    closeModal(searchImagesDrawerSlug);
  };

  useEffect(() => {
    if (initialState?.file?.value instanceof File) {
      setFileSrc(URL.createObjectURL(initialState.file.value));
      setRemovedFile(false);
    }
  }, [initialState]);

  useEffect(() => {
    if (showUrlInput && urlInputRef.current) {
      // urlInputRef.current.focus() // Focus on the remote-url input field when showUrlInput is true
    }
  }, [showUrlInput]);

  useEffect(() => {
    if (isFormSubmitting) {
      setRemovedFile(false);
    }
  }, [isFormSubmitting]);

  const canRemoveUpload =
    docPermissions?.update &&
    "delete" in docPermissions &&
    docPermissions?.delete;

  const hasImageSizes =
    uploadConfig?.imageSizes && uploadConfig.imageSizes.length > 0;
  const hasResizeOptions = Boolean(uploadConfig?.resizeOptions);
  // Explicity check if set to true, default is undefined
  const focalPointEnabled = uploadConfig?.focalPoint === true;

  const { crop: showCrop = true, focalPoint = true } = uploadConfig;

  const showFocalPoint =
    focalPoint && (hasImageSizes || hasResizeOptions || focalPointEnabled);

  const acceptMimeTypes = uploadConfig.mimeTypes?.join(", ");

  return (
    <div className={[fieldBaseClass, baseClass].filter(Boolean).join(" ")}>
      <FieldError message={errorMessage} showError={showError} />
      {savedDocumentData && savedDocumentData.filename && !removedFile && (
        <FileDetails
          collectionSlug={collectionSlug}
          customUploadActions={customActions}
          doc={savedDocumentData}
          enableAdjustments={showCrop || showFocalPoint}
          handleRemove={canRemoveUpload ? handleFileRemoval : undefined}
          hasImageSizes={hasImageSizes}
          imageCacheTag={uploadConfig?.cacheTags && savedDocumentData.updatedAt}
          uploadConfig={uploadConfig}
        />
      )}
      {(!savedDocumentData?.filename || removedFile) && (
        <div className={`${baseClass}__upload`}>
          {!value && !showUrlInput && (
            <Dropzone onChange={handleFileSelection}>
              <div className={`${baseClass}__dropzoneContent`}>
                <div className={`${baseClass}__dropzoneButtons`}>
                  <Button
                    buttonStyle="pill"
                    onClick={() => {
                      if (inputRef.current) {
                        inputRef.current.click();
                      }
                    }}
                    size="small"
                  >
                    {t("upload:selectFile")}
                  </Button>
                  <input
                    accept={acceptMimeTypes}
                    aria-hidden="true"
                    className={`${baseClass}__hidden-input`}
                    hidden
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleFileSelection(e.target.files);
                      }
                    }}
                    ref={inputRef}
                    type="file"
                  />
                  {uploadConfig?.pasteURL !== false && (
                    <>
                      |
                      <Button
                        buttonStyle="pill"
                        onClick={() => {
                          setShowUrlInput(true);
                        }}
                        size="small"
                      >
                        {t("upload:pasteURL")}
                      </Button>
                      |
                      <Button
                        buttonStyle="pill"
                        onClick={() => {
                          openModal(searchImagesDrawerSlug);
                        }}
                        size="small"
                      >
                        {t("imageSearch:searchImages")}
                      </Button>
                    </>
                  )}
                </div>

                <p className={`${baseClass}__dragAndDropText`}>
                  {t("general:or")} {t("upload:dragAndDrop")}
                </p>
              </div>
            </Dropzone>
          )}
          {showUrlInput && (
            <React.Fragment>
              <div className={`${baseClass}__remote-file-wrap`}>
                <input
                  className={`${baseClass}__remote-file`}
                  onChange={(e) => {
                    setFileUrl(e.target.value);
                  }}
                  ref={urlInputRef}
                  type="text"
                  value={fileUrl}
                />
                <div className={`${baseClass}__add-file-wrap`}>
                  <button
                    className={`${baseClass}__add-file`}
                    onClick={() => {
                      void handleUrlSubmit();
                    }}
                    type="button"
                  >
                    {t("upload:addFile")}
                  </button>
                </div>
              </div>
              <Button
                buttonStyle="icon-label"
                className={`${baseClass}__remove`}
                icon="x"
                iconStyle="with-border"
                onClick={() => {
                  setShowUrlInput(false);
                }}
                round
                tooltip={t("general:cancel")}
              />
            </React.Fragment>
          )}
          {value && fileSrc && (
            <React.Fragment>
              <div className={`${baseClass}__thumbnail-wrap`}>
                <Thumbnail
                  collectionSlug={collectionSlug}
                  fileSrc={isImage(value.type) ? fileSrc : undefined}
                />
              </div>
              <div className={`${baseClass}__file-adjustments`}>
                <input
                  className={`${baseClass}__filename`}
                  onChange={handleFileNameChange}
                  type="text"
                  value={filename || value.name}
                />
                <UploadActions
                  customActions={customActions}
                  enableAdjustments={showCrop || showFocalPoint}
                  enablePreviewSizes={
                    hasImageSizes && savedDocumentData?.filename && !removedFile
                  }
                  mimeType={value.type}
                />
              </div>
              <Button
                buttonStyle="icon-label"
                className={`${baseClass}__remove`}
                icon="x"
                iconStyle="with-border"
                onClick={handleFileRemoval}
                round
                tooltip={t("general:cancel")}
              />
            </React.Fragment>
          )}
        </div>
      )}
      <Drawer slug={searchImagesDrawerSlug}>
        <SearchImages
          serverURL={serverURL}
          api={api}
          onSelect={handleSearchSubmit}
        />
      </Drawer>
      {(value || savedDocumentData?.filename) && (
        <EditDepthProvider>
          <Drawer Header={null} slug={editDrawerSlug}>
            <EditUpload
              fileName={value?.name || savedDocumentData?.filename}
              fileSrc={savedDocumentData?.url || fileSrc}
              imageCacheTag={savedDocumentData?.updatedAt}
              initialCrop={uploadEdits?.crop ?? undefined}
              initialFocalPoint={{
                x:
                  uploadEdits?.focalPoint?.x || savedDocumentData?.focalX || 50,
                y:
                  uploadEdits?.focalPoint?.y || savedDocumentData?.focalY || 50,
              }}
              onSave={onEditsSave}
              showCrop={showCrop}
              showFocalPoint={showFocalPoint}
            />
          </Drawer>
        </EditDepthProvider>
      )}
      {savedDocumentData && hasImageSizes && (
        <Drawer
          className={`${baseClass}__previewDrawer`}
          hoverTitle
          slug={sizePreviewSlug}
          title={t("upload:sizesFor", { label: savedDocumentData.filename })}
        >
          <PreviewSizes
            doc={savedDocumentData}
            imageCacheTag={savedDocumentData.updatedAt}
            uploadConfig={uploadConfig}
          />
        </Drawer>
      )}
    </div>
  );
};
