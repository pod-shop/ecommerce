import { useState, useEffect, ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import Layout from '@/components/layouts/Layout';
import { NextPageWithLayout } from '@/pages/_app';
// import AccessDenied from '../components/access-denied'
import { signIn } from 'next-auth/react'
import { Link } from 'next-translate-routes';

export default function ProtectedPage() {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const [content, setContent] = useState()

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/examples/protected')
      const json = await res.json()
      if (json.content) { setContent(json.content) }
    }
    fetchData()
  }, [session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return <><AccessDenied /></> }

  // If session exists, display content
  return (
    <>
      <h1>Protected Page</h1>
      <p><strong>{content || "\u00a0"}</strong></p>
    </>
  )
}

ProtectedPage.getLayout = (page: ReactNode) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

const AccessDenied = () => {
  return (
    <>
      <h1>Access Denied</h1>
      <p>
        {/* <a href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault()
            signIn()
          }}>You must be signed in to view this page</a> */}
        <span
          onClick={(e) => {
            e.preventDefault()
            signIn()
          }}
        >
          <Link href='/api/auth/signin'>You must be signed in to view this page</Link>
        </span>
      </p>
    </>
  )
}
