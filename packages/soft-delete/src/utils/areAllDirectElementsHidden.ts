export const areAllDirectElementsHidden = (parent: Element) => {
  const children = parent.children;

  for (let i = 0; i < children.length; i++) {
    const child = children.item(i);

    if (child) {
      const style = window.getComputedStyle(child);

      if (style.display !== "none") {
        return false;
      }
    }
  }

  return true;
};
