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
    const response = await fetch(new URL(urlPath, this.getFetchBaseUrl()), {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getSearch(query: string, page: number) {
    return {};
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async trackDownload(url: string) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formatResults(data: object): ProviderResult[] {
    return [];
  }
}
