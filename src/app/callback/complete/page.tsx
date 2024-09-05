import React from "react"
import { currentUser } from "@clerk/nextjs/server"
import { onSignUpUser } from "@/actions/auth"
import { redirect } from "next/navigation"
const page = async () => {
    const user = await currentUser()
    if (!user) redirect("/sign-in")
    const complete = await onSignUpUser({
        clerkId: user.id,
        firstName: user.firstName!,
        lastName: user.lastName!,
        image: user.imageUrl,
    })
    if (complete.status === 201) {
        redirect("/group/create")
    }
    if (complete.status !== 201) {
        redirect("/sign-in")
    }
}

export default page
