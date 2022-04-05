import { ReactNode } from 'react';
import type { GetStaticProps, GetStaticPropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import Layout from '@/components/layouts/Layout';
import { NextPageWithLayout } from '@/pages/_app';
import Home from '@/modules/home';

const HomePage: NextPageWithLayout = () => {
  const { t } = useTranslation('home');

  return (
    <>
      <NextSeo title={t('title')} description={t('description')} />
      <Home />
    </>
  )
}

HomePage.getLayout = (page: ReactNode) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(
        (locale || defaultLocale || 'es'),
        ['common', 'home', 'header', 'footer']
      ))
    },
  }
}

export default HomePage
