import { createClient } from "@/lib/supabase/browser-client"
import { onOnline } from "@/redux/slices/online-member"
import { AppDispatch } from "@/redux/store"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

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

export { useGroupChat }
