export interface ProviderResult {
	id: string;
	alt: string;
	width: number;
	height: number;
	color: string;
	urls: {
		view: string;
		original: string;
		download: string;
		downloadLocation?: string;
	};
	attribution: {
		name: string;
		link: string;
	};
}

export class InvalidProviderRequestError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "InvalidProviderRequestError";
	}
}

export class Provider {
	key: string;
	name: string;
	url: string;
	isConfigured: boolean;

	constructor(key: string, name: string, url: string) {
		this.key = key.toUpperCase();
		this.name = name;
		this.url = url;
		this.isConfigured = !!this.getApiKey();
	}

	async fetch(method: string, urlPath: string, data?: object) {
		const baseUrl = new URL(this.getFetchBaseUrl());
		const requestUrl = new URL(urlPath, baseUrl);

		if (requestUrl.origin !== baseUrl.origin) {
			throw new InvalidProviderRequestError(
				`Refusing to send ${this.name} request to ${requestUrl.origin}`,
			);
		}

		const response = await fetch(requestUrl, {
			method,
			headers: this.getFetchHeaders(),
			...(data && { body: JSON.stringify(data) }),
		});

		return response.json();
	}

	getApiKey() {
		return process.env[`API_KEY_${this.key}`];
	}

	getFetchBaseUrl() {
		return "";
	}

	getFetchHeaders() {
		return {};
	}

	getFetchLimit() {
		return 25;
	}

	async getFeatured() {
		return {};
	}

	async getSearch(_query: string, _page: number) {
		return {};
	}

	async trackDownload(_url: string) {
		return null;
	}

	formatResults(_data: object): ProviderResult[] {
		return [];
	}
}
