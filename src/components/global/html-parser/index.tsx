import React, { useEffect, useState } from "react"
import parse from "html-react-parser"
type Props = {
    html: string
}

const HtmlParser = (props: Props) => {
    const [mounted, setMounted] = useState<boolean>(false)
    useEffect(() => {
        setMounted(true)
        return () => setMounted(true)
    }, [])
    return (
        <div className="[&_h1]:text-4xl [&_h2]:text-3xl [&_blockqoute]:italic [&_iframe]:aspect-video [&_h3]:text-2xl text-themeTextGray flex flex-col gap-y-3">
            {mounted && parse(props.html)}
        </div>
    )
}

export default HtmlParser
