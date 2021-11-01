import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import {
    BookmarkIcon,
    DotsHorizontalIcon,
    ChatIcon,
    HeartIcon,
    EmojiHappyIcon,
    PaperAirplaneIcon
} from '@heroicons/react/outline'
import { HeartIcon as HeartFilledIcon, PlayIcon} from '@heroicons/react/solid'
import { useEffect, useRef, useState } from 'react'
import { db } from '../../firebase';

function Posts() {
    const [posts, setPosts] = useState();
    const videoRef = useRef();
    const [play, setPlay] = useState(true)

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), snapshot => {
            setPosts(snapshot.docs)
        })
        
        return () => {
            unsubscribe();
        };
    }, [db])
    function togglePlay() {
        document.querySelectorAll(".vid")?.forEach(_ => {
            if (videoRef.current.paused || videoRef.current.ended) {
                videoRef.current.play()
                setPlay(false)
            } else {
                videoRef.current.pause()
                setPlay(true)
            }
        })
    }

    return (
        <div>
           {posts?.map(post => (
                <div key={post.id} className="bg-white border my-7 pb-4 rounded-sm">
                    <div className="flex items-center p-4">
                        <img className="h-12 mr-3 p-1 w-12 rounded-full object-cover" src={post.data().profileImg} alt="" />
                        <p className="font-bold flex-1">{post.data().username}</p>
                        <DotsHorizontalIcon className="h-5 w-5 cursor-pointer" />
                    </div>
                    {/* img */}
                    {post.data().video && 
                    <div onClick={togglePlay} className="relative bg-black flex flex-col items-center justify-center">
                        <PlayIcon className={`text-white opacity-0 z-50 h-28 absolute transition-all duration-300 ${play && "opacity-80"} `} />
                        <video ref={videoRef} className="vid object-contain">
                            <source src={post.data().video} />
                        </video>
                    </div>
                    }
                    {post.data().image && 
                    <img src={post.data().image} className="object-cover w-full" alt="" />}
                    {/* buttons */}
                    <div className="flex items-center justify-between px-4 pt-4">
                        <div className="flex space-x-4">
                            <HeartIcon className="btn" />
                            <ChatIcon className="btn" />
                            <PaperAirplaneIcon className="btn rotate-45" />
                        </div>
                        <BookmarkIcon className="btn" />
                    </div>
                    {/* captions */}
                    <p className="p-4 truncate">
                        <span className="font-bold mr-2">{post.data().username} </span>{post.data().caption}
                    </p>
                    {/* comments */}

                    {/* input box */}
                    <div className="flex items-center px-4">
                        <EmojiHappyIcon className="h-7 mr-1" />
                        <input type="text" className="focus:outline-none mx-1 flex-1" placeholder="Add a comment..." />
                        <button className="text-blue-400 font-medium">Post</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Posts
