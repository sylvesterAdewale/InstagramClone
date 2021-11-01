import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil"
import { modalState } from "../atoms/ModalAtoms"
import { XIcon } from '@heroicons/react/outline';
import { CameraVideo } from "./icons/CameraVideo";
import { db, storage} from "../firebase"
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "@firebase/firestore";
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString } from "@firebase/storage"
 
function Modal() {
    const [open, setOpen] = useRecoilState(modalState);
    const [preImg, setPreImg] = useState(null)
    const [preVid, setPreVid] = useState(null)
    const [loading, setLoading] = useState(false)
    const captionRef = useRef(null);
    const { data: session } = useSession();

    const uploadPost = async () => {
        if (loading) return;
        setLoading(true);

        const docRef = await addDoc(collection(db, "posts"), {
            username: session.user.username,
            caption: captionRef.current.value,
            profileImg: session.user.image,
            timestamp: serverTimestamp(),
        })

        const imageRef = ref(storage, `posts/${docRef.id}/image`);
        if (preImg) {
            await uploadString(imageRef, preImg, "data_url").then( async snapshot => {
                const downloadUrl = await getDownloadURL(fileRef)
    
                await updateDoc(doc(db, "posts", docRef.id), {
                    image: downloadUrl,
                })
            });
        }
        const videoRef = ref(storage, `posts/${docRef.id}/video`);
        if (preVid) {
            await uploadString(videoRef, preVid, "data_url").then(async snapshot => {
                const downloadUrl = await getDownloadURL(fileRef)
    
                await updateDoc(doc(db, "posts", docRef.id), {
                    video: downloadUrl,
                })
            })
        }

        setLoading(false);
        setOpen(false);
        setPreImg(null);
        setPreVid(null);

    }

    const addImage = (e) => {
        const reader = new FileReader();

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            if (e.target.files[0].type.match("image.*")) {
                setPreImg(readerEvent.target.result);
            }
            if (e.target.files[0].type.match("video.*")) {
                setPreVid(readerEvent.target.result);
            }
        };
    }

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        }
        else (
            document.body.style.overflow = "auto"
        )
    })



    return (
        <> {open &&
            (<div 
                className="w-full h-full fixed top-0 left-0 !overflow-hidden z-[100] flex flex-col items-center justify-center">
                <XIcon onClick={() => {setOpen(false); setPreImg(null), setLoading(false)}} className="w-8 h-8 cursor-pointer text-white absolute top-8 right-8 z-[101]" />
                <div onClick={() => {setOpen(false); setPreImg(null), setLoading(false)}} className="w-full h-full absolute !overflow-hidden z-[70] flex flex-col items-center justify-center bg-black bg-opacity-80"></div>
                <div className={`w-[400px] md:w-[500px] bg-white rounded-xl absolute z-[101] ${open && ('modal')}`}>
                    <p className="w-full py-3 border-b text-center font-medium">Create new post</p>
                    {preImg || preVid ? (
                        <div className="relative">
                            <XIcon onClick={() => {setPreImg(null), setPreVid(null), setLoading(false)}} className="text-black z-[102] absolute w-7 top-2 right-2 cursor-pointer" />
                            {preImg && <img src={preImg} className="px-5 h-[400px] object-contain" />}
                            {preVid && <video src={preVid} className="px-5 h-[400px] object-contain" autoPlay="true" />}
                        </div>
                    ) :
                        <div className="w-full h-[300px] md:h-[400px] flex flex-col items-center justify-center">
                            <CameraVideo className="w-20" />
                            <p className="text-lg text-gray-500 py-1">Upload image or video here</p>
                            <button className="py-2 px-6 bg-blue-400 relative text-white font-medium rounded-lg my-2">
                                <input onChange={addImage} type="file" className="opacity-0 absolute w-full h-full top-0 left-0" />
                                Select from device</button>
                        </div>}
                        {preImg || preVid ? (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <textarea ref={captionRef} className="focus:outline-none" placeholder="Write a caption..." cols={35} rows={3} autoComplete="off" autoCorrect="off" spellCheck="false"></textarea>
                            <button disabled={loading} onClick={uploadPost} className="py-2 px-6 disabled:opacity-80 bg-blue-400 relative text-white font-medium rounded-lg my-2" type="submit">
                                {loading ? (
                                    <div className="sm-load"></div>
                                ) : "Upload Post" }
                            </button>
                        </div>
                    ): null}
                </div>
                
            </div>) }
        </>
    )
}

export default Modal
