import { ReactNode, useEffect } from 'react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import { withTranslateRoutes } from 'next-translate-routes'
import { SWRConfig } from 'swr'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'
import SEO from '@/next-seo.config'
import fetcher from '@/utils/fetcher'
import { ES } from '@/constants/primeReactLocales'
import PrimeReact, { locale as primeReactLocale, addLocale as addPrimeReactLocale } from 'primereact/api'

import 'primereact/resources/themes/mdc-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.min.css'
import '@/styles/globals.scss'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const { locale, defaultLocale } = useRouter();

  useEffect(() => {
    PrimeReact.ripple = true;
    addPrimeReactLocale('es', ES);
  }, []);

  useEffect(() => {
    primeReactLocale(locale || defaultLocale || 'es');
  }, [locale, defaultLocale]);

  return (
    <>
      <DefaultSeo {...SEO} />
      <SessionProvider session={session}>
        <SWRConfig
          value={{
            fetcher
          }}
        >
          {getLayout(<Component {...pageProps} />)}
        </SWRConfig>
      </SessionProvider>
    </>
  );
}

export default withTranslateRoutes(appWithTranslation(MyApp))
