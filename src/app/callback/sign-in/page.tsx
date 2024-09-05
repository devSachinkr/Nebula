import { onSignInUser } from "@/actions/auth"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import React from "react"

const page = async () => {
    const user = await currentUser()
    if (!user) return redirect("/sign-in")
    const isAuthenticated = await onSignInUser(user.id)
    if (isAuthenticated.status === 201) return redirect("/group/create")
    if (isAuthenticated.status === 207)
        return redirect(
            `/group/${isAuthenticated.groupId}/channel/${isAuthenticated.channelId}`,
        )
    if (isAuthenticated.status !== 201) {
        redirect("/sign-in")
    }
}

export default page
