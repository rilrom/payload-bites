export class CacheManager {
  exists(query: string) {
    const data = this.get(query);

    return data !== null;
  }

  get(query: string) {
    const itemStr = localStorage.getItem(query);

    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);

    if (item.expiry && new Date().getTime() > item.expiry) {
      localStorage.removeItem(query);

      return null;
    }

    return item.value;
  }

  set(query: string, data: unknown, ttl?: number): void {
    const item = {
      value: data,
      expiry: ttl ? new Date().getTime() + ttl : null,
    };

    localStorage.setItem(query, JSON.stringify(item));
  }
}
