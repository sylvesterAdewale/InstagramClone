import Head from 'next/head'
import Feeds from '../components/home/Feeds'
import Header from '../components/Header'
import Loader from '../components/Loader'
import Modal from '../components/Modal'
import { useRecoilState } from "recoil"
import { modalState } from "../atoms/ModalAtoms"
import Preloader from '../components/Preloader'

export default function Home() {
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div className={`min-h-screen bg-gray-50 ${open && ("overflow-hidden")}`}>
      <Head>
        <meta name="description" content="Instagram clone by Sylvester" />
        <title>Instagram clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Loader />
      <Header />
      <Preloader />
      <Feeds />
      {/* <Modal /> */}
    </div>
  )
}
