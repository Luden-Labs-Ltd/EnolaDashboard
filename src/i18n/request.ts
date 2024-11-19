import {getRequestConfig} from 'next-intl/server';
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const language = await cookies().get('currentLanguage')?.value
  const locale = language ? language : 'en';
 
  return {
    locale,
    messages: (await import(`../../localization/${locale}.json`)).default
  };
});