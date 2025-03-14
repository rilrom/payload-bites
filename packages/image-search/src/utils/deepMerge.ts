export function isObject(item: unknown): item is object {
  return !!item && typeof item === "object" && !Array.isArray(item);
}

export function deepMerge<T extends object, R>(target: T, source: R): T {
  const output = { ...target } as any;
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject((source as any)[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: (source as any)[key] });
        } else {
          output[key] = deepMerge((target as any)[key], (source as any)[key]);
        }
      } else {
        Object.assign(output, { [key]: (source as any)[key] });
      }
    });
  }

  return output;
}
