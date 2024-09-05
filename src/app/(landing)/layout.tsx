import React from "react"
import LandingNav from "./_components/navbar/landing-nav"

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <div className="flex flex-col container relative">
            <LandingNav />
            {children}
        </div>
    )
}

export default layout
