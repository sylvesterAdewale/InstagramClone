import Head from 'next/head'
import Feeds from '../components/home/Feeds'
import Header from '../components/Header'
import Loader from '../components/Loader'
import { useRecoilState } from "recoil"
import { modalState } from "../atoms/ModalAtoms"
import Modal from '../components/Modal'

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
      <Feeds />
      <Modal />
    </div>
  )
}
