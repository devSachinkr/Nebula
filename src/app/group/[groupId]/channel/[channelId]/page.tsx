import { authUser } from "@/actions/auth"
import { getChannelIfo } from "@/actions/channel"
import { getGroupInfo } from "@/actions/groups"
import { currentUser } from "@clerk/nextjs/server"
import { QueryClient } from "@tanstack/react-query"
import { redirect } from "next/navigation"
import React from "react"

type Props = {
    params: {
        channelId: string
        groupId: string
    }
}

const page = async ({ params: { channelId, groupId } }: Props) => {
    const query = new QueryClient()
    const clerkUser = await currentUser()
    const user = await authUser()
    if (!clerkUser || !user) {
        redirect("/sign-in")
    }
    await query.prefetchQuery({
        queryKey: ["channel-info"],
        queryFn: () => getChannelIfo(channelId),
    })
    await query.prefetchQuery({
        queryKey: ["about-group-info"],
        queryFn: () => getGroupInfo(groupId),
    })
    return <div>page</div>
}

export default page
