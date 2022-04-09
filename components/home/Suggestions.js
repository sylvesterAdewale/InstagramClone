import { useEffect, useState } from "react";
import { faker } from '@faker-js/faker';

function Suggestions() {
    const [suggestions, SetSuggestions] = useState([]);

    useEffect(() => {
        const suggestions = [...Array(5)].map((_, i) => ({
            name: faker.name.findName(),
            avatar: faker.image.avatar(),
            company: faker.company.companyName(),
            id: i
        }));
        SetSuggestions(suggestions)
    }, [])

    return (
        <div className="mt-4 ml-10">
            <div className="flex items-center justify-between text-sm mb-5">
                <h3 className="font-bold text-gray-400">Suggestions for you</h3>
                <button className="text-gray-600 font-semibold">See All</button>
            </div>
            {suggestions.map(profile => (
                <div key={profile.id} className="flex items-center justify-between mt-3">
                    <img src={profile.avatar} alt="" className="w-10 h-10 rounded-full border p-[2px]" />
                    <div className="flex-1 ml-4">
                        <h3 className="font-bold">{profile.name}</h3>
                        <h4 className="text-xs text-gray-400">{profile.company}</h4>
                    </div>
                    <button className="text-blue-400 text-xs font-bold">Follow</button>
                </div>
            ))} 
        </div>
    )
}

export default Suggestions
 