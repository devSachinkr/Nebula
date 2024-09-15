import { Message } from "@/icons"
import Link from "next/link"
import React from "react"
import Notification from "./notification"
import UserAvatar from "./user-avatar"

type Props = {
    groupId: string
    userId: string
    userImageUrl: string
}

const UserWidget = ({ groupId, userId, userImageUrl }: Props) => {
    return (
        <div className="gap-5 items-center hidden md:flex">
            <Notification/>
            <Link href={`/group/${groupId}/messages`}>
                <Message />
            </Link>
            <UserAvatar
                userId={userId}
                imageUrl={userImageUrl}
                groupId={groupId}
            />
        </div>
    )
}

export default UserWidget
