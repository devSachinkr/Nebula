import GlassSheet from "@/components/global/glass-sheet/glass-sheet"
import Search from "@/components/global/search"
import Sidebar from "@/components/global/sidebar"
import UserWidget from "@/components/global/user-widget"
import { Button } from "@/components/ui/button"
import { CheckBadge } from "@/icons"
import { currentUser } from "@clerk/nextjs/server"
import { Menu } from "lucide-react"
import Link from "next/link"
import React from "react"

type Props = {
    groupId: string
    userId: string
}

export const Navbar = async ({ groupId, userId }: Props) => {
    const user = await currentUser()
    return (
      <div className="bg-[#1A1A1D] py-2 px-3 md:px-7 md:py-5 flex gap-5 justify-between md:justify-end items-center">
        <GlassSheet trigger={<Menu className="md:hidden cursor-pointer" />}>
          <Sidebar groupId={groupId} userId={userId} mobile />
        </GlassSheet>
        <Search
          searchType="POSTS"
          className="rounded-full border-themeGray bg-black !opacity-100 px-3"
          placeholder="Search..."
        />
        <Link href={`/group/create`} className="hidden md:inline">
          <Button
            variant="outline"
            className="bg-themeBlack rounded-2xl flex gap-2 border-themeGray hover:bg-themeGray"
          >
            <CheckBadge />
            Create Group
          </Button>
        </Link>
        <UserWidget userId={userId} userImageUrl={user?.imageUrl!} groupId={groupId} />
      </div>
    )
  }