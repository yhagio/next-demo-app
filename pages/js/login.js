// @ts-nocheck
import I18nProvider from 'next-translate/I18nProvider'
import React from 'react'
import C from '../../pages_/login'
import ns0 from '../../locales/js/common.json'
import ns1 from '../../locales/js/nav.json'
import ns2 from '../../locales/js/signup.json'

const namespaces = { 'common': ns0, 'nav': ns1, 'signup': ns2 }

export default function Page(p){
  return (
    <I18nProvider lang="js" namespaces={namespaces} isStaticMode>
      <C {...p} />
    </I18nProvider>
  )
}

Page = Object.assign(Page, { ...C })

if(C.getInitialProps) {
  Page.getInitialProps = ctx => C.getInitialProps({ ...ctx, lang: 'js'})
}





export * from '../../pages_/login'
