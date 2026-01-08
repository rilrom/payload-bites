"use client";

import {
	Button,
	toast,
	useConfig,
	usePayloadAPI,
	useRouteCache,
	useTranslation,
} from "@payloadcms/ui";
import { intervalToDuration } from "date-fns";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";

import type {
	TranslationsKeys,
	TranslationsObject,
} from "../../translations.js";
import { Card } from "../Card/index.js";
import { Loading } from "../Loading/index.js";
import styles from "./index.module.scss";

export const ScanActions = () => {
	const { config } = useConfig();
	const { clearRouteCache } = useRouteCache();
	const { t } = useTranslation<TranslationsObject, TranslationsKeys>();
	const [cacheBust, dispatchCacheBust] = useReducer((state) => state + 1, 0);
	const [elapsed, setElapsed] = useState("");

	const [{ data }, { setParams }] = usePayloadAPI(
		`${config.routes.api}/broken-link-checker/status`,
	);

	const previousJobRef = useRef(undefined);

	const addDefaultError = useCallback(() => {
		toast.error(t("brokenLinkChecker:scanningFailed"));
	}, [t]);

	const refresh = useCallback(() => {
		setParams({ cacheBust });

		dispatchCacheBust();
	}, [cacheBust, setParams]);

	const update = useCallback(() => {
		if (!data?.job) {
			setElapsed("00:00:00");

			return;
		}

		const duration = intervalToDuration({
			start: new Date(data.job.createdAt),
			end: new Date(),
		});

		setElapsed(
			[duration.hours, duration.minutes, duration.seconds]
				.map((v) => String(v ?? 0).padStart(2, "0"))
				.join(":"),
		);
	}, [data]);

	const queueJob = useCallback(async () => {
		try {
			const response = await fetch(
				`${config.routes.api}/broken-link-checker/scan`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({}),
				},
			);

			const json = await response.json();

			if (response.status < 400) {
				toast.success(t("brokenLinkChecker:scanningSucceeded") || json.message);

				refresh();

				return;
			}

			if (json.errors) {
				json.errors.forEach((error: any) => toast.error(error.message));
			} else {
				addDefaultError();
			}

			return false;
		} catch {
			addDefaultError();
		}
	}, [addDefaultError, config.routes.api, refresh, t]);

	useEffect(() => {
		const refreshInterval = setInterval(refresh, 5000);

		return () => clearInterval(refreshInterval);
	}, [refresh]);

	useEffect(() => {
		const updateInterval = setInterval(update, 1000);

		return () => clearInterval(updateInterval);
	}, [update]);

	useEffect(() => {
		if (previousJobRef.current && !data?.job) {
			clearRouteCache();
		}

		previousJobRef.current = data?.job;
	}, [clearRouteCache, data?.job]);

	if (data?.errors) {
		return (
			<Card>
				<p className={styles.error}>
					{t("brokenLinkChecker:somethingWentWrong")}
				</p>
			</Card>
		);
	}

	if (!data?.success) {
		return (
			<Card>
				<Loading className={styles.loading} />
			</Card>
		);
	}

	return (
		<Card>
			<p>
				{data?.job
					? t("brokenLinkChecker:scanInProgress", { elapsed })
					: t("brokenLinkChecker:noScanInProgress")}
			</p>

			{data?.job ? (
				<Loading />
			) : (
				<Button onClick={queueJob} className={styles.button}>
					{t("brokenLinkChecker:startNewScan")}
				</Button>
			)}
		</Card>
	);
};
