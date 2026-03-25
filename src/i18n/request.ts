import { getRequestConfig } from 'next-intl/server';
import { getCookie } from "shared/utils/cookies";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const language = await getCookie('currentLanguage')
  const locale = language ? language : 'en';

  return {
    locale,
    messages: (await import(`../../localization/${locale}.json`)).default
  };
});