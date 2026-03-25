export function translateCategoryTitle(
  t: (key: string) => string,
  id: string,
  fallbackTitle: string,
): string {
  const idToKey: Record<string, string> = {
    medical: "Resources.Categories.medical",
    home: "Resources.Categories.home",
    childcare: "Resources.Categories.childcare",
    emotional: "Resources.Categories.emotional",
    legal: "Resources.Categories.legal",
    general: "Resources.Categories.general",
  };

  const key = idToKey[id];
  if (!key) {
    return fallbackTitle;
  }

  try {
    return t(key);
  } catch {
    return fallbackTitle;
  }
}

