import {
    BookmarkIcon,
    DotsHorizontalIcon,
    ChatIcon,
    HeartIcon,
    EmojiHappyIcon,
    PaperAirplaneIcon
} from '@heroicons/react/outline'
import { HeartIcon as HeartFilledIcon} from '@heroicons/react/solid'

function Posts() {

    const posts = [
        {
            id: "123",
            username: "adewale_sr",
            userImg: "/profile.jpg",
            img: "/profile.jpg",
            caption: "Love this Build"
        },
        {
            id: "13",
            username: "adewale_sr",
            userImg: "/postDummy.jpg",
            img: "/postDummy.jpg",
            caption: "Love this Build"
        }
    ]

    return (
        <div>
            {posts.map(post => (
                <div key={post.id} className="bg-white border my-7 pb-4 rounded-sm">
                    <div className="flex items-center p-4">
                        <img className="h-12 mr-3 p-1 w-12 rounded-full object-cover" src={post.userImg} alt="" />
                        <p className="font-bold flex-1">{post.username}</p>
                        <DotsHorizontalIcon className="h-5 w-5 cursor-pointer" />
                    </div>
                    {/* img */}
                    <img src={post.img} className="object-cover w-full" alt="" />
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
                        <span className="font-bold mr-2">{post.username} </span>{post.caption}
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
