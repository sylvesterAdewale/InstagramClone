import Head from 'next/head'
import Feeds from '../components/home/Feeds'
import Header from '../components/Header'
import Loader from '../components/Loader'
import Modal from '../components/Modal'

export default function Home() {

  return (
    <div className={`min-h-screen`}>
      <Head>
        <meta name="description" content="Instagram clone by Sylvester" />
        <title>Instagram clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Loader />
      <Header />
      <Feeds />
      <Modal />
    </div>
  )
}
