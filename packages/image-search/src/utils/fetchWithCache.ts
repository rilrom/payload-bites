import { CacheManager } from "../classes/CacheManager.js";

export const fetchWithCache = async (queryPath: string) => {
  const cache = new CacheManager();

  if (cache.exists(queryPath)) {
    return cache.get(queryPath);
  }

  const response = await fetch(queryPath);
  const json = await response.json();

  if (response.status < 400) {
    const expiry = 24 * 60 * 60 * 1000; // 24 hours
    cache.set(queryPath, json, expiry);
  }

  return json;
};
