import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from '@firebase/firestore';
import { HeartIcon as HeartFilledIcon} from '@heroicons/react/solid'
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react'
import { db } from '../../firebase';
import Post from './Post';

function Posts() {
    const [posts, setPosts] = useState();

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), snapshot => {
            setPosts(snapshot.docs)
        })
        
        return () => {
            unsubscribe();
        };
    }, [db])

    return (
        <div>
           {posts?.map(post => (
                <Post 
                    key={post.id}
                    id={post.id}
                    username={post.data().username}
                    userImg={post.data().profileImg}
                    image={post.data().image}
                    caption={post.data().caption}
                />
            ))}
        </div>
    )
}

export default Posts
