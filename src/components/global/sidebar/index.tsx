"use client"
import { useGroupChat } from "@/hooks/group"
import { useSidebar } from "@/hooks/navbar"
import React from "react"

type Props = {
    groupId: string
    userId: string
    mobile?: boolean
}
export interface IGroupInfo {
    status: number
    group:
        | {
              id: string
              name: string
              category: string
              thumbnail: string | null
              description: string | null
              gallery: string[]
              jsonDescription: string | null
              htmlDescription: string | null
              privacy: boolean
              active: boolean
              createdAt: Date
              userId: string
              icon: string
          }
        | undefined
}

export interface IChannels {
    id: string
    name: string
    icon: string
    createdAt: Date
    groupId: string | null
}

export interface IGroups {
    status: number
    groups:
        | {
              icon: string | null
              id: string
              name: string
          }[]
        | []
}

const Sidebar = ({ groupId, userId, mobile }: Props) => {
    const { channels, groupInfo, groups, isPending, mutate, variables } =
        useSidebar({
            groupId,
        })
        useGroupChat({userId})
    return <div>Sidebar</div>
}

export default Sidebar
