import { CacheManager } from "../classes/CacheManager.js";

export const fetchWithCache = async (queryPath: string) => {
  const cache = new CacheManager();

  if (cache.exists(queryPath)) {
    return cache.get(queryPath);
  }

  const response = await fetch(queryPath);
  const json = await response.json();

  cache.set(queryPath, json.data);

  return json.data;
};
