import { Loader } from "@/components/loader"
import React from "react"

const loading = () => {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <Loader loading={true}></Loader>
        </div>
    )
}

export default loading
