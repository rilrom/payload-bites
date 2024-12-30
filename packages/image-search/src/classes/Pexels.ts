import { Provider } from "./Provider.js";

interface PexelsResult {
  id: string;
  alt: string;
  width: number;
  height: number;
  avg_color: string;
  url: string;
  src: {
    medium: string;
    original: string;
  };
  photographer: string;
  photographer_url: string;
}

export class Pexels extends Provider {
  constructor() {
    super("pexels", "Pexels", "https://www.pexels.com/");
  }

  getFetchBaseUrl() {
    return "https://api.pexels.com";
  }

  getFetchHeaders() {
    return { Authorization: `${this.getApiKey()}` };
  }

  async getFeatured() {
    const data = await this.fetch(
      "GET",
      `/v1/curated?per_page=${this.getFetchLimit()}`,
    );

    return {
      images: this.formatResults(data.photos),
      countOfImages: null,
      countOfPages: null,
    };
  }

  async getSearch(query: string, page: number) {
    const data = await this.fetch(
      "GET",
      `/v1/search?per_page=${this.getFetchLimit()}&page=${page}&query=${query}`,
    );

    return {
      images: this.formatResults(data.photos),
      totalImages: data.total_results,
      totalPages: Math.min(data.total_results / this.getFetchLimit(), 100),
    };
  }

  formatResults(data: PexelsResult[]) {
    return data.map((image) => ({
      id: image.id,
      alt: image.alt || "",
      width: image.width,
      height: image.height,
      color: image.avg_color,
      urls: {
        view: image.src.medium,
        original: image.src.original,
        download: image.url,
      },
      attribution: {
        name: image.photographer,
        link: image.photographer_url,
      },
    }));
  }
}
