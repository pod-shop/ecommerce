import { useTranslation } from 'next-i18next';

const Home = () => {
  const { t } = useTranslation('home');

  return (
    <>
      <h1>Home</h1>
    </>
  )
}

export default Home;
