import { useEffect, useState } from "react"

const Loader = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        !window.onload && setLoading(false)
    })
    return (
        <>
            {loading && (
                <div className="h-full absolute z-50 overflow-hidden bg-white w-full flex items-center justify-center flex-col">
                    <div className="main"></div>
                </div>
            )}
        </>
    )
}

export default Loader
