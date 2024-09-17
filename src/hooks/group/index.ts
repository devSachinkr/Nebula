"use client"
import { getGroupInfo, updateGroupSettings } from "@/actions/groups"
import { createClient } from "@/lib/supabase/browser-client"
import { onOnline } from "@/redux/slices/online-member"
import { AppDispatch } from "@/redux/store"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { JSONContent } from "novel"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { groupSettingSchema } from "@/components/forms/group/schema"
import { createUploadClient } from "@/lib/upload-care"
import ToastNotify from "@/components/global/ToastNotify"
import { useRouter } from "next/navigation"
const useGroupChat = ({ userId }: { userId: string }) => {
    const dispatch: AppDispatch = useDispatch()
    // @ts-ignore
    useEffect(() => {
        const supabase = createClient()
        const channel = supabase.channel("tracking")

        channel
            .on("presence", { event: "sync" }, () => {
                const state: any = channel.presenceState()
                for (const user in state) {
                    dispatch(
                        onOnline({
                            members: [
                                {
                                    id: state[user][0].member.userId,
                                },
                            ],
                        }),
                    )
                }
            })
            .subscribe(async (status) => {
                if (status === "SUBSCRIBED") {
                    await channel.track({
                        member: {
                            userId,
                        },
                    })
                }
            })

        return () => channel.unsubscribe()
    }, [])

    return {}
}

const useGroupSettingForm = ({ groupId }: { groupId: string }) => {
    const { data } = useQuery({
        queryKey: ["group-info"],
        queryFn: () => getGroupInfo(groupId),
    })

    const jsonContent = data?.groupInfo?.jsonDescription
        ? JSON.parse(data?.groupInfo?.jsonDescription as string)
        : undefined
    const [jsonDesc, setJsonDesc] = useState<JSONContent | undefined>(
        jsonContent,
    )
    const [desc, setDesc] = useState<string | undefined>(
        data?.groupInfo?.description || undefined,
    )
    const {
        register,
        formState: { errors },
        reset,
        watch,
        setValue,
        handleSubmit,
    } = useForm<z.infer<typeof groupSettingSchema>>({
        mode: "onChange",
        resolver: zodResolver(groupSettingSchema),
        defaultValues: {},
    })
    const [preview, setPreview] = useState<string | undefined>(undefined)
    const [thumbnail, setThumbnail] = useState<string | undefined>(undefined)
    const router = useRouter()
    const setDescription = () => {
        const jsonContent = JSON.stringify(jsonDesc)
        setValue("jsondescription", jsonContent)
        setValue("description", desc)
    }

    const { mutate: mutateGroupSetting, isPending } = useMutation({
        mutationKey: ["group-setting"],
        mutationFn: async ({
            thumbnail,
            icon,
            description,
            htmldescription,
            jsondescription,
            name,
        }: z.infer<typeof groupSettingSchema>) => {
            const upload = await createUploadClient()
            if (thumbnail && thumbnail.length > 0) {
                {
                    const file = thumbnail[0]
                    const res = await upload.uploadFile(file)
                    const updateDb = await updateGroupSettings({
                        groupId,
                        type: "IMAGE",
                        value: res.uuid,
                        path: `/group/${groupId}/settings`,
                    })
                    if (updateDb.status !== 200) {
                        return ToastNotify({
                            title: "Oops!",
                            msg: updateDb.message,
                        })
                    }
                    if (updateDb.status === 200) {
                        ToastNotify({
                            title: "Success",
                            msg: `${updateDb.message}`,
                        })
                    }
                }
            }
            if (icon && icon.length > 0) {
                {
                    const file = icon[0]
                    const res = await upload.uploadFile(file)
                    const updateDb = await updateGroupSettings({
                        groupId,
                        type: "ICON",
                        value: res.uuid,
                        path: `/group/${groupId}/settings`,
                    })
                    if (updateDb.status !== 200) {
                        return ToastNotify({
                            title: "Oops!",
                            msg: updateDb.message,
                        })
                    }
                    if (updateDb.status === 200) {
                        ToastNotify({
                            title: "Success",
                            msg: `${updateDb.message}`,
                        })
                    }
                }
            }
            if (description) {
                const updateDb = await updateGroupSettings({
                    groupId,
                    type: "DESCRIPTION",
                    value: description,
                    path: `/group/${groupId}/settings`,
                })
                if (updateDb.status !== 200) {
                    return ToastNotify({
                        title: "Oops!",
                        msg: updateDb.message,
                    })
                }
                if (updateDb.status === 200) {
                    ToastNotify({
                        title: "Success",
                        msg: `${updateDb.message}`,
                    })
                }
            }
            if (htmldescription) {
                const updateDb = await updateGroupSettings({
                    groupId,
                    type: "HTMLDESCRIPTION",
                    value: htmldescription,
                    path: `/group/${groupId}/settings`,
                })
                if (updateDb.status !== 200) {
                    return ToastNotify({
                        title: "Oops!",
                        msg: updateDb.message,
                    })
                }
            }
            if (jsondescription) {
                const updateDb = await updateGroupSettings({
                    groupId,
                    type: "JSONDESCRIPTION",
                    value: jsondescription,
                    path: `/group/${groupId}/settings`,
                })
                if (updateDb.status !== 200) {
                    return ToastNotify({
                        title: "Oops!",
                        msg: updateDb.message,
                    })
                }
            }
            if (name) {
                const updateDb = await updateGroupSettings({
                    groupId,
                    type: "NAME",
                    value: name,
                    path: `/group/${groupId}/settings`,
                })
                if (updateDb.status !== 200) {
                    return ToastNotify({
                        title: "Oops!",
                        msg: updateDb.message,
                    })
                }
                if (updateDb.status === 200) {
                    ToastNotify({
                        title: "Success",
                        msg: `${updateDb.message}`,
                    })
                }
            }
            if (
                !name &&
                !description &&
                !htmldescription &&
                !jsondescription &&
                !thumbnail &&
                !icon
            ) {
                return ToastNotify({
                    title: "Oops!",
                    msg: "No changes detected",
                })
            }
        },
    })
    const onSubmit = handleSubmit(async (data) => {
        mutateGroupSetting({ ...data })
    })
    if (data?.status !== 200) {
        router.push(`/group/create`)
    }
    useEffect(() => {
        const previews = watch(({ thumbnail, icon }) => {
            if (!icon) return
            if (icon[0]) {
                console.log(URL.createObjectURL(icon[0]))
                setPreview(URL.createObjectURL(icon[0]))
            }
            if (thumbnail[0]) {
                console.log(URL.createObjectURL(thumbnail[0]))
                setThumbnail(URL.createObjectURL(thumbnail[0]))
            }
        })
        return () => {
            previews.unsubscribe()
        }
    }, [watch])

    useEffect(() => {
        setDescription()
    }, [jsonDesc, desc])
    return {
        onSubmit,
        register,
        errors,
        preview,
        thumbnail,
        setThumbnail,
        setPreview,
        desc,
        setDesc,
        jsonDesc,
        setJsonDesc,
        handleSubmit,
        data,
        isPending,
    }
}

export { useGroupChat, useGroupSettingForm }
