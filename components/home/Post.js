import { useEffect, useState } from "react"
import {
    BookmarkIcon,
    DotsHorizontalIcon,
    ChatIcon,
    HeartIcon,
    EmojiHappyIcon,
    PaperAirplaneIcon
} from '@heroicons/react/outline'
import { HeartIcon as HeartFilledIcon} from '@heroicons/react/solid'
import { useSession } from 'next-auth/react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "@firebase/firestore";
import { db } from '../../firebase';
import Moment from 'react-moment';


const Post = ({id, username, userImg, caption, image}) => {
    
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const {data: session} = useSession()
    const [likes, setLikes] = useState([])
    const [hasLiked, setHasLiked] = useState(false)

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc")), snapshot => {
            setComments(snapshot.docs)
        })
        return () => {
            unsubscribe();
        };
    }, [db, id])
    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "posts", id, "likes")), snapshot => {
            setLikes(snapshot.docs)
        })
        return () => {
            unsubscribe();
        };
    }, [db, id])
    
    useEffect(() => {
        setHasLiked(likes.findIndex((like) => (like.id === session?.user?.uid)) !== -1)
    }, [likes])
    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, "posts", id, "likes", session.user.uid))
        } else {
            await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
                username: session.user.username,
            })
        }
    }
    const sendComment = async (e) => {
        e.preventDefault()

        const commentToSend = comment
        setComment("")

        await addDoc(collection(db, "posts", id, "comments"), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp(),
        })
    }
    return (
        <div key={id} className="bg-white border my-7 pb-4 rounded-sm">
            <div className="flex items-center p-4">
                <img className="h-12 mr-3 p-1 w-12 rounded-full object-cover" src={userImg} alt="" />
                <p className="font-bold flex-1">{username}</p>
                <DotsHorizontalIcon className="h-5 w-5 cursor-pointer" />
            </div> 
            {image && 
            <img src={image} className="object-cover w-full" alt="" />}
            {/* buttons */}
            
            {session && (<div className="flex items-center justify-between px-4 pt-4">
                <div className="flex space-x-4">
                    {hasLiked ?
                        <HeartFilledIcon onClick={likePost} className="btn text-red-500" /> : 
                        <HeartIcon onClick={likePost} className="btn" />
                    }
                    <ChatIcon className="btn" />
                    <PaperAirplaneIcon className="btn rotate-45" />
                </div>
                <BookmarkIcon className="btn" />
            </div>)}
            {/* captions */}
            <p className="pt-1 p-4 truncate">
                {likes.length > 0 && (
                    <p className="text-sm font-medium pb-2">{likes.length} likes</p>
                )}
                <span className="font-bold mr-2">{username} </span>{caption}
            </p>
            {/* comments */}
            {comments.length > 0 && (
                <div className="m-4 ml-10 max-h-20 overflow-y-auto mt-1 space-y-2">
                    {comments.map(comment => (
                        <div key={comment.id} className="flex items-center justify-center space-x-1">
                            <img className="h-7 w-7 rounded-full object-cover" src={comment.data().userImage} alt="" />
                            <p className="flex-1"><span className="mr-2 font-medium">{comment.data().username}</span>{comment.data().comment}</p>
                            <Moment className="text-gray-600 text-xs" fromNow>
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>
                    ))}
                </div>
            )}
            {/* input box */}
            {session && (<form className="flex items-center px-4">
                <EmojiHappyIcon className="h-7 mr-1" />
                <input value={comment} onChange={e => {setComment(e.target.value)}} type="text" className="focus:outline-none mx-1 flex-1" placeholder="Add a comment..." />
                <button type="submit" onClick={sendComment} disabled={!comment.trim()} className="text-blue-400 font-medium">Post</button>
            </form>)}
        </div>
    )
}

export default Post
