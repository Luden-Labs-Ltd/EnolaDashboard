export interface LanguageOption {
  code: "en" | "he";
  labelKey: string;
}

export const languageOptions: LanguageOption[] = [
  { code: "en", labelKey: "Common.english" },
  { code: "he", labelKey: "Common.hebrew" },
];

