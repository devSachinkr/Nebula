"use client"
import { useGroupChat } from "@/hooks/group"
import { useSidebar } from "@/hooks/navbar"
import { CarotSort } from "@/icons"
import { cn } from "@/lib/utils"
import React from "react"
import DropDown from "@/components/global/drop-down"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Group, Plus } from "lucide-react"
import { v4 } from "uuid"
import SideBarMenu from "./menu"

type Props = {
    groupId: string
    userId: string
    mobile?: boolean
}
export interface IGroupInfo {
    status: number
    groupInfo:
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
    useGroupChat({ userId })
    return (
        <div
            className={cn(
                "h-screen flex-col gap-y-10 sm:px-5",
                !mobile
                    ? "hidden bg-black md:w-[300px] fixed md:flex "
                    : "w-full flex ",
            )}
        >
            {groups.groups && groups.groups.length > 0 && (
                <DropDown
                    title="Groups"
                    trigger={
                        <div className=" w-full flex items-center justify-between text-themeTextGray md:border-[1px] border-themeGray p-3 rounded-xl">
                            <div className="flex gap-x-3 items-center">
                                <img
                                    src={`https://ucarecdn.com/${groupInfo.groupInfo?.icon as string}/`}
                                    alt="icon"
                                    className="w-10 rounded-lg"
                                />
                                <p className="text-sm">
                                    {
                                        groupInfo.groupInfo?.name
                                    }
                                </p>
                            </div>
                            <span>
                                <CarotSort />
                            </span>
                        </div>
                    }
                >
                    {groups &&
                        groups.groups.length > 0 &&
                        groups.groups.map((g) => (
                            <Link
                                key={g.id}
                                href={`/group/${g.id}/channel/${channels?.channel?.[0]?.id!}`}
                            >
                                <Button
                                    variant={"ghost"}
                                    className="flex gap-2 w-full justify-start hover:bg-themeGray items-center"
                                >
                                    <Group />
                                    {g.name}
                                </Button>
                            </Link>
                        ))}
                </DropDown>
            )}
            <div className="flex flex-col gap-y-5">
                <div className="flex justify-between items-center">
                    <p className="text-xs text-[#F7ECE9]">CHANNELS</p>
                    { 
                    // @ts-ignore
                        userId===groupInfo.groupInfo?.userId &&(
                            <Plus
                            size={16}
                            className={cn(
                                'text-themeTextGray cursor-pointer',
                                isPending && 'opacity-70',
                            )}
                            {
                                ...(!isPending && {
                                    onClick:()=>{
                                        mutate({
                                            id:v4(),
                                            icon:'general',
                                            name:'Unnamed',
                                            createdAt:new Date(),
                                            groupId:groupId
                                        })
                                    }
                                })
                            }
                            />
                        )
                    }

                </div>
                <SideBarMenu
                 channels={channels?.data!}
                 optimisticChannel={variables}
                 loading={isPending}
                 groupId={groupId}
                 groupUserId={groupInfo.groupInfo?.userId!}
                userId={userId}
                />
            </div>
        </div>
    )
}

export default Sidebar
