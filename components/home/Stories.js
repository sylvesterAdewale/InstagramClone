import faker from 'faker'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react'

const Stories = () => {
    const { data: session } = useSession();
    const [suggestions, SetSuggestions] = useState([]);

    useEffect(() => {
        const suggestions = [...Array(20)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id: i
        }));
        SetSuggestions(suggestions)
    }, [])

    return (
        <div className="p-5 flex space-x-3 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll">
            {session && (
                <div key={session.user?.uid}>
                    <img src={session.user?.image} alt="" className="rounded-full object-contain h-14 w-14 p-[1.5px] border-2 border-red-500 transition-all hover:scale-110 duration-200 ease-in-out cursor-pointer" />
                    <p className="w-14 text-xs text-center truncate">{session.user?.username}</p>
                </div>
            )}
            {suggestions.map(profile => (
                <div key={profile.id}>
                    <img src={profile.avatar} alt="" className="rounded-full object-contain h-14 w-14 p-[1.5px] border-2 border-red-500 transition-all hover:scale-110 duration-200 ease-in-out cursor-pointer" />
                    <p className="w-14 text-xs text-center truncate">{profile.username}</p>
                </div>
            ))}
        </div>
    )
}

export default Stories
