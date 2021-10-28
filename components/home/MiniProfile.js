import { signOut, useSession } from "next-auth/react"

const MiniProfile = () => {
    const { data: session} = useSession();


    return (
        <div className="flex items-center justify-between mt-14 ml-10">
            <img src={session.user?.image} className="h-16 w-16 rounded-full p-[2px] border object-cover" alt="" />
            <div className="flex-1 mx-4">
                <h2 className="font-bold">{session.user?.name}</h2>
                <h3 className="text-sm text-gray-400">{session.user?.username}</h3>
            </div>
            <button className="text-blue-400" onClick={signOut}>Sign out</button>
        </div>
    )
}

export default MiniProfile
