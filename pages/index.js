import Head from 'next/head'
import Feeds from '../components/home/Feeds'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <meta name="description" content="Instagram clone by Sylvester" />
        <title>Instagram clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />
      {/* Feed */}
      <Feeds />
      {/* Modal */}

    </div>
  )
}
