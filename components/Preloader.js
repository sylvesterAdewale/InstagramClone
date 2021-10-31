import Router from "next/router"
import { useState } from "react"

const Preloader = () => {
    const [during, setDuring] = useState(false)
    const [done, isDone] = useState(false)

    Router.events.on("routeChangeStart", () => {
        setDuring(true)
    })
    Router.events.on("routeChangeComplete", () => {
        setDuring(false)
        isDone(true)
    })

    return (
        <div className="absolute top-0 left-0 w-full h-full">
            <div className={`h-4 bg-black w-1/4 ${during && "w-3/4"} ${done && "w-full"}`}>
                how
            </div>
        </div>
    )
}

export default Preloader
