import cookie from 'js-cookie';
import { FC, useState, createContext, useEffect } from 'react';
import { Languages, ITranslations, LOCALE_KEY } from '../translations/config';
import common from '../translations/locales/en/common';

export interface ILocaleProps {
  lang: Languages;
  namespace: string;
  translations: ITranslations
}

interface IContextProps {
  locale: ILocaleProps;
  setLocale: (locale: ILocaleProps) => void;
}

export const LocaleContext = createContext<IContextProps>({
  locale: {
    lang: Languages.EN,   // default language
    translations: common, // default translation pack
    namespace: undefined  // default namespance
  },
  setLocale: () => null
});


export const LocaleProvider: FC<ILocaleProps> = ({ lang, translations, namespace, children }) => {
  const [locale, setLocale] = useState({ lang, translations, namespace })

  useEffect(() => {
    // if (locale.lang !== localStorage.getItem(LOCALE_KEY)) {
    //   localStorage.setItem(LOCALE_KEY, locale.lang)
    // }
    if (locale.lang !== cookie.get(LOCALE_KEY)) {
      cookie.set(LOCALE_KEY, locale.lang);
    }
  }, [locale.lang])

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}