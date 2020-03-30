import { useContext } from "react";

import { LocaleContext } from "../context/localeContext";

export default function useTranslation() {
  const { locale } = useContext(LocaleContext)

  function t(key: string): string {
    if (!locale.translations[key]) {
      console.warn(`Translation '${key}' for locale '${locale}' not found.`);
      return `t.${key}`;
    }
    return locale.translations[key] || ""
  }

  return {
    t,
    locale: locale.lang
  }
}