export class CacheManager {
  exists(query: string) {
    return this.get(query) ? true : false;
  }

  get(query: string) {
    const data = sessionStorage.getItem(query);
    return data ? JSON.parse(data) : null;
  }

  set(query: string, data: unknown) {
    return sessionStorage.setItem(query, JSON.stringify(data));
  }
}
