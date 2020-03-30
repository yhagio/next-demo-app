import cookie from 'js-cookie';

import { defaultLocale, LOCALE_KEY } from './config';

const initLocale = (): string => {
  // Check if user has locale setting already
  const setting = cookie.get(LOCALE_KEY);
  // const setting = localStorage.getItem(LOCALE_KEY);
  if (setting) {
    return setting;
  }

  // Use browser's language
  const [browserLocale] = navigator.language.split('-');
  if (browserLocale) {
    return browserLocale;
  }

  // Use default (English)
  return defaultLocale;
}

export default initLocale;