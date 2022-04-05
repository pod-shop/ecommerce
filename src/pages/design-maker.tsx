import { ReactNode } from 'react';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import Layout from '@/components/layouts/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DesignMaker from '@/modules/designer';
import { NextPageWithLayout } from '@/pages/_app';

const DesignMakerPage: NextPageWithLayout = () => {
  const { t } = useTranslation('design_maker');

  return (
    <>
      <NextSeo title={t('title')} description={t('description')} />
      <div className='design-maker-container'>
        <DesignMaker />
      </div>
    </>
  )
}

DesignMakerPage.getLayout = (page: ReactNode) => {
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
        ['common', 'design_maker', 'header', 'footer']
      ))
    },
  }
}

export default DesignMakerPage;
