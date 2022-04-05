import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

const Page404: NextPage = () => {
  return (
    <>
      <NextSeo noindex={true} nofollow={true} />
      <h1>404 - Page Not Found</h1>
    </>
  )
}

export default Page404;
