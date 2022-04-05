import { ReactNode } from 'react';
import Footer from '@/components/footer';
import Header from '@/components/header';

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout;
