export const getTranslateValueOrDefault = (
  t: TFunction,
  translateKey: string | undefined,
  defaultValue: string
) => {
  try {
    if (!translateKey) {
        return defaultValue
    }
    // @ts-ignore
    if (t(translateKey) !== translateKey) {
      // @ts-ignore
      return t(translateKey);
    }
    return defaultValue;
  } catch (error) {
    return defaultValue;
  }
};
