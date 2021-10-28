import Image from 'next/image'
import { HomeIcon } from '@heroicons/react/solid'
import {
    SearchIcon,
    PaperAirplaneIcon,
    PlusCircleIcon,
    HeartIcon,
    UserGroupIcon,
    MenuAlt2Icon
} from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Header = () => {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <div className="bg-white border-b shadow-sm p-2 sticky top-0 z-50">
            <div className="flex items-center md:mx-auto md:max-w-3xl xl:max-w-5xl justify-between text-black">
                <div onClick={() => {router.push("/")}} className="flex items-center cursor-pointer">
                    <Image src="/Instlogo.png" width={103} height={29} />
                </div>
                <div className="flex items-center justify-between px-2 py-1 rounded border focus:border-black focus:border-2">
                    <div className="px-2">
                        <SearchIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <input type="search" name="" id="" placeholder="Search" className="outline-none" />
                </div>
                <div className="flex items-center justify-end space-x-3">
                    <HomeIcon onClick={() => {router.push("/")}} className="icon" />
                    <MenuAlt2Icon className="h-6 w-6 md:hidden cursor-pointer hover:scale-125 transition-all ease-in-out duration-150" />
                    {session ? (
                        <>
                            <div className="relative icon">
                                <span className="absolute -top-1 z-20 -right-1 text-xs font-medium w-4 h-4 text-center bg-red-500 text-white rounded-full animate-pulse">3</span>
                                <PaperAirplaneIcon className="icon rotate-45" />
                            </div>
                            <PlusCircleIcon className="icon" />
                            <UserGroupIcon className="icon" />
                            <HeartIcon className="icon" />
                            <div className="cursor-pointer">
                                <Image src={session.user?.image} width={40} height={40} onClick={signOut} className="rounded-full" objectFit="cover" />
                            </div>
                        </>
                    ) : (
                        <button onClick={signIn}>Sign In</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header
