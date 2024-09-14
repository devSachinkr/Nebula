import { createNewChannel } from "@/actions/channel"
import { getGroupChannels } from "@/actions/groups"
import { IGroupInfo, IGroups } from "@/components/global/sidebar"
import ToastNotify from "@/components/global/ToastNotify"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { useState } from "react"

const useNavbar = () => {
    const pathName = usePathname()
    const [section, setSection] = useState<string>(pathName)
    const onSetSection = (currPage: string) => {
        setSection(currPage)
    }
    return { section, onSetSection }
}

const useSidebar = ({ groupId }: { groupId: string }) => {
    const { data: groups } = useQuery({
        queryKey: ["user-groups"],
    }) as { data: IGroups }
    const { data: groupInfo } = useQuery({
        queryKey: ["group-info"],
    }) as { data: IGroupInfo }
    const { data: channels }:{data:any} = useQuery({
        queryKey: ["group-channels"],
        queryFn:()=>getGroupChannels(groupId)
    })
    const client = useQueryClient()

    const { isPending, mutate, isError, variables } = useMutation({
        mutationFn: (data: {
            id: string
            name: string
            icon: string
            createdAt: Date
            groupId: string | null
        }) =>
            createNewChannel(groupId, {
                id: data.id,
                name: data.name,
                icon: data.icon,
            }),
        onSettled: async () => {
            return await client.invalidateQueries({
                queryKey: ["group-channels"],
            })
        },
    })
    if (isPending) {
        ToastNotify({
            title: "Success",
            msg: "Channel created",
        })
    }
    if (isError) {
        ToastNotify({
            title: "Oops!",
            msg: "Something went wrong",
        })
    }

    return { groupInfo, groups, mutate, variables, isPending, channels }
}



export { useNavbar, useSidebar }
