export const getLastMatchingAncestor = (
  element?: HTMLElement | null,
  selector?: string,
): HTMLElement | null => {
  let lastMatchingAncestor = null;
  let currentElement = element?.parentElement;

  while (currentElement) {
    if (selector && currentElement.matches(selector)) {
      lastMatchingAncestor = currentElement;
    }
    currentElement = currentElement.parentElement;
  }

  return lastMatchingAncestor;
};
