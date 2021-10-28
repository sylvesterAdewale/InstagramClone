import { getProviders, signIn} from 'next-auth/react';
import Header from '../../components/Header';
import Image from 'next/image'

const signin = ({ providers }) => {
    return (
        <>
            <Header />
            <div className="mt-20 flex flex-col items-center justify-center">
                <img src="/Instlogo.png" className="w-60" />
                <p className="font-medium">This isn't a REAL APP, This was built for improvement purpose only</p>
                {Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                    <button className="py-2 px-3 mt-10 bg-blue-400 text-white font-medium
                     rounded" onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
                        Sign in with {provider.name}
                    </button>
                    </div>
                ))}
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders()

    return {
        props: {
            providers
        }
    }
}

export default signin
