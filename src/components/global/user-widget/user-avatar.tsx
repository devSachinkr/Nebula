"use client"
import { createClient } from "@/lib/supabase/browser-client"
import { onOffline } from "@/redux/slices/online-member"
import { AppDispatch } from "@/redux/store"
import React from "react"
import { useDispatch } from "react-redux"
import { useClerk } from "@clerk/nextjs"
import DropDown from "../drop-down"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { Logout, Settings } from "@/icons"
import { Button } from "@/components/ui/button"
type Props = {
    groupId: string
    userId?: string
    imageUrl: string
}

const UserAvatar = ({ groupId, imageUrl, userId }: Props) => {
    const { signOut } = useClerk()
    const supabase = createClient()
    const dispatch: AppDispatch = useDispatch()
    const unTrackPresence = async () => {
        await supabase.channel("tracking").untrack()
    }
    const logout = async () => {
        unTrackPresence()
        dispatch(onOffline({ members: [{ id: userId! }] }))
        signOut({ redirectUrl: "/" })
    }

    return (
        <DropDown
            title="Account"
            trigger={
                <Avatar className="cursor-pointer">
                    <AvatarImage src={imageUrl} alt="user" />
                    <AvatarFallback>US</AvatarFallback>
                </Avatar>
            }
        >
            <Link
                href={`/group/${groupId}/settings`}
                className="flex gap-x-2 px-2 items-center hover:bg-accent p-2 rounded-md"
            >
                <Settings /> Settings
            </Link>
            <Button
                onClick={logout}
                variant={"ghost"}
                className="flex gap-x-3 px-2 justify-start w-full mt-3"
            >
                <Logout />
                Logout
            </Button>
        </DropDown>
    )
}

export default UserAvatar
