const VERSION = "v1.3.0";

export class CacheManager {
  private getVersionedKey(query: string) {
    return `${VERSION}${query}`;
  }

  exists(query: string) {
    const data = this.get(query);

    return data !== null;
  }

  get(query: string) {
    const versionedKey = this.getVersionedKey(query);

    const itemStr = localStorage.getItem(versionedKey);

    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);

    if (item.expiry && new Date().getTime() > item.expiry) {
      localStorage.removeItem(versionedKey);

      return null;
    }

    return item.value;
  }

  set(query: string, data: unknown, ttl?: number): void {
    const versionedKey = this.getVersionedKey(query);

    const item = {
      value: data,
      expiry: ttl ? new Date().getTime() + ttl : null,
    };

    localStorage.setItem(versionedKey, JSON.stringify(item));
  }
}
