"use client"

import { deleteChannel, updateChannelInfo } from "@/actions/channel"
import ToastNotify from "@/components/global/ToastNotify"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"

const useChannelInfo = () => {
    const channelRef = useRef<HTMLAnchorElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const triggerRef = useRef<HTMLButtonElement | null>(null)
    const [channel, setChannel] = useState<string | undefined>(undefined)
    const [edit, setEdit] = useState<boolean>(false)
    const [icon, setIcon] = useState<string | undefined>(undefined)
    const client = useQueryClient()

    const editChannel = ({ id }: { id: string | undefined }) => {
        setChannel(id)
        setEdit(true)
    }
    const onSetIcon = ({ icon }: { icon: string | undefined }) => {
        setIcon(icon)
    }
    const { isPending, mutate, variables } = useMutation({
        mutationFn: (data: { name?: string; icon?: string }) =>
            updateChannelInfo(channel!, data.name, data.icon),
        onMutate: () => {
            setEdit(false)
            onSetIcon({ icon: undefined })
        },
        onSuccess: (data) => {
            return ToastNotify({
                title: `${data?.status === 204 ? "Success" : "Oops!"}`,
                msg: data?.message!,
            })
        },
        onSettled: async () => {
            return await client.invalidateQueries({
                queryKey: ["group-channels"],
            })
        },
    })
    const { variables: deleteVariables, mutate: deleteMutate } = useMutation({
        mutationFn: (data: { id: string }) => deleteChannel(data.id),
        onSuccess: (data) => {
            return ToastNotify({
                title: `${data?.status === 204 ? "Success" : "Oops!"}`,
                msg: data?.message!,
            })
        },
        onSettled: async () => {
            return await client.invalidateQueries({
                queryKey: ["group-channels"],
            })
        },
    })

    const endChannelEdit = (e: Event) => {
        if (inputRef.current && channelRef.current && triggerRef.current) {
            if (
                !inputRef.current.contains(e.target as Node | null) &&
                !channelRef.current.contains(e.target as Node | null) &&
                !triggerRef.current.contains(e.target as Node | null) &&
                !document.getElementById("icon-list")
            ) {
                if (inputRef.current.value) {
                    mutate({
                        name: inputRef.current.value,
                    })
                }
                if (icon) {
                    mutate({
                        icon,
                    }) 
                } else {
                    setEdit(false)
                }
            }
        }
    }
    useEffect(() => {
        document.addEventListener("click", endChannelEdit, false)
        return () =>
            document.removeEventListener("click", endChannelEdit, false)
    }, [icon])
    const channelDelete=(id:string)=>deleteMutate({id})
    return {
        editChannel,
        edit,
        inputRef,
        variables,
        isPending,
        channel,
        onSetIcon,
        channelDelete,
        icon,
        deleteVariables,
        triggerRef,
        channelRef,
        deleteMutate
    }
}

export { useChannelInfo }
