import { authUser } from "@/actions/auth"
import {
    getAllGroupMembers,
    getGroupChannels,
    getGroupInfo,
    getGroupSubscriptions,
    getUserGroups,
} from "@/actions/groups"
import Sidebar from "@/components/global/sidebar"
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query"
import { redirect } from "next/navigation"
import React from "react"
import {Navbar} from "./_components/navbar"

type Props = {
    children: React.ReactNode
    params: {
        groupId: string
    }
}

const layout = async ({ children, params: { groupId } }: Props) => {
    const query = new QueryClient()
    const user = await authUser()
    if (!user || !user.id) {
        redirect("/sign-in")
    }

    // GROUP_INFO
    await query.prefetchQuery({
        queryKey: ["group-info"],
        queryFn: () => getGroupInfo(groupId),
    })

    // GET_ALL_USER_GROUPS
    await query.prefetchQuery({
        queryKey: ["user-groups"],
        queryFn: () => getUserGroups(user.id!),
    })

    // GET_CHANNELS
    await query.prefetchQuery({
        queryKey: ["group-channels", groupId],
        queryFn: () => getGroupChannels(groupId),
    })

    // GROUP_SUBSCRIPTIONS
    await query.prefetchQuery({
        queryKey: ["group-subscriptions", groupId],
        queryFn: () => getGroupSubscriptions(groupId),
    })

    // MEMBERS_CHAT

    await query.prefetchQuery({
        queryKey: ["members-chat", groupId],
        queryFn: () => getAllGroupMembers(groupId),
    })
    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className="flex h-screen md:pt-5">
                <Sidebar groupId={groupId} userId={user.id} />
                <div
                    className="md:ml-[300px] flex flex-col flex-1
            bg-[#101011] md:rounded-tl-xl overflow-y-auto border-l-[1px] border-t-[1px] border-[#28282D]"
                >
                    <Navbar groupId={groupId} userId={user.id} />
                    {children}
                    {/* <MobileNav groupId={groupId} /> */}
                </div>
            </div>
        </HydrationBoundary>
    )
}

export default layout
