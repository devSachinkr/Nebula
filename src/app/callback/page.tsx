import { AuthenticateWithRedirectCallback } from "@clerk/nextjs"
import React from "react"

type Props = {}

const page = (props: Props) => {
    return <AuthenticateWithRedirectCallback />
}

export default page
