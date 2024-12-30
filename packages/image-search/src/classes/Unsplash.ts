import { Provider } from "./Provider.js";

interface UnsplashResult {
  id: string;
  alt_description: string;
  urls: {
    thumb: string;
    full: string;
  };
  links: {
    download: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
}

export class Unsplash extends Provider {
  constructor() {
    super("unsplash", "Unsplash", "https://unsplash.com");
  }

  getFetchBaseUrl() {
    return "https://api.unsplash.com";
  }

  getFetchHeaders() {
    return { Authorization: `Client-ID ${this.getApiKey()}` };
  }

  async getFeatured() {
    const data = await this.fetch(
      "GET",
      `/photos/random?featured=true&count=${this.getFetchLimit()}`,
    );

    return {
      images: this.formatResults(data),
      countOfImages: null,
      countOfPages: null,
    };
  }

  async getSearch(query: string, page: number) {
    const data = await this.fetch(
      "GET",
      `/search/photos?per_page=${this.getFetchLimit()}&page=${page}&query=${query}`,
    );

    return {
      images: this.formatResults(data.results),
      totalImages: data.total,
      totalPages: Math.min(data.total_pages, 100),
    };
  }

  formatResults(data: UnsplashResult[]) {
    return data.map((image) => ({
      id: image.id,
      alt: image.alt_description || "",
      urls: {
        view: image.urls?.thumb,
        original: image.urls?.full,
        download: image.links?.download,
      },
      attribution: {
        name: image.user?.name,
        link: image.user?.links?.html,
      },
    }));
  }
}
