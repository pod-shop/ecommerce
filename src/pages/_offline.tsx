import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

const OfflinePage: NextPage = () => (
  <>
    <NextSeo title={'next-pwa example'} description={'next-pwa example'} />
    <h1>This is offline fallback page</h1>
    <h2>When offline, any page route will fallback to this page</h2>
  </>
)

export default OfflinePage
