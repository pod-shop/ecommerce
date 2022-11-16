import { DefaultSeoProps } from 'next-seo';

export default {
  titleTemplate: '%s - Crealo',
  defaultTitle: 'Crealo',
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0'
    }
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico'
    },
    {
      rel: 'manifest',
      href: '/manifest.json'
    }
  ],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    site_name: 'Crealo',
    title: 'Crealo',
    description: '',
    url: 'https://crealo.com.do/'
  },
  twitter: {
    site: 'Crealo',
    cardType: 'summary',
  },
} as DefaultSeoProps;
