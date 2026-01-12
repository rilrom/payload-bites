import { Provider } from "./Provider.js";

export interface PixabayResult {
	id: string;
	imageWidth: number;
	imageHeight: number;
	webformatURL: string;
	largeImageURL: string;
	imageURL: string;
	user: string;
	user_id: number;
}

export class Pixabay extends Provider {
	constructor() {
		super("pixabay", "Pixabay", "https://pixabay.com");
	}

	getFetchBaseUrl() {
		return "https://pixabay.com";
	}

	getFetchHeaders() {
		return {};
	}

	async getFeatured() {
		const data = await this.fetch(
			"GET",
			`/api?key=${this.getApiKey()}&per_page=${this.getFetchLimit()}`,
		);

		return {
			images: this.formatResults(data.hits),
			countOfImages: null,
			countOfPages: null,
		};
	}

	async getSearch(query: string, page: number) {
		const data = await this.fetch(
			"GET",
			`/api?key=${this.getApiKey()}&per_page=${this.getFetchLimit()}&page=${page}&q=${query}`,
		);

		return {
			images: this.formatResults(data.hits),
			totalImages: data.totalHits,
			totalPages: Math.min(data.totalHits, 100),
		};
	}

	formatResults(data: PixabayResult[]) {
		return data.map((image) => ({
			id: image.id,
			alt: "",
			width: image.imageWidth,
			height: image.imageHeight,
			color: "#ccc",
			urls: {
				view: image.webformatURL,
				original: image.imageURL || image.largeImageURL,
				download: image.imageURL || image.largeImageURL,
			},
			attribution: {
				name: image.user,
				link: `https://pixabay.com/users/${image.user}-${image.user_id}/`,
			},
		}));
	}
}
