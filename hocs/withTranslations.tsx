import React from 'react'
import nextCookie from 'next-cookies';
import cookie from 'js-cookie'
import { NextPage } from 'next'
import Error from 'next/error'
// import { getDisplayName } from 'next/dist/next-server/lib/utils'
import { LocaleProvider } from '../context/localeContext'
import { ILocaleProps } from '../context/localeContext'
import Axios from 'axios';
import { defaultLocale, LOCALE_KEY } from '../translations/config';

interface LangProps {
  [key: string]: any;
  locale?: ILocaleProps
  translations?: { [key: string]: string }
}

export default (namespace: string) => (WrappedPage: NextPage<any>) => {
  const WithTranslations: NextPage<any, LangProps> = ({ locale, translations, ...pageProps }) => {
    // if (!locale || !translations) {
    //   return <Error statusCode={500} />
    // }
    return (
      <LocaleProvider lang={locale || defaultLocale} translations={translations || {}} namespace={namespace}>
        <WrappedPage {...pageProps} />
      </LocaleProvider>
    )
  }

  WithTranslations.getInitialProps = async ctx => {
    const { myAppLocale } = nextCookie(ctx);

    let pageProps = {}
    if (WrappedPage.getInitialProps) {
      pageProps = await WrappedPage.getInitialProps(ctx)
    }
    const url = process.env.NODE_ENV === 'production' ? 'https://simple-i18n-example.fwojciec.now.sh' : 'http://localhost:3000'
    try {
      const { data: translations } = await Axios.get(`${url}/api/${myAppLocale || defaultLocale}?namespace=${namespace}`);
      console.log(namespace, translations)
      return { ...pageProps, locale: myAppLocale, translations }
    } catch (err) {
      console.error(err?.response?.data?.error)
      return <Error statusCode={err?.response?.status || 500} />
    }
  }

  // WithTranslations.displayName = `withAPILang(${getDisplayName(WrappedPage)})`

  return WithTranslations
}