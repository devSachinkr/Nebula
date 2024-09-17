"use client"

import { getPaginatedPosts, searchGroups } from "@/actions/groups"
import { onInfiniteScroll } from "@/redux/slices/infinite-scroll"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"

const useInfiniteScroll = ({
    action,
    identifier,
    paginate,
    search,
    query,
}: {
    action: "GROUPS" | "POSTS"
    identifier: string
    paginate: number
    search?: boolean
    query?: string
}) => {
    const observerElement = useRef<HTMLDivElement | null>(null)
    const dispatch: AppDispatch = useDispatch()
    const { data } = useAppSelector((state) => state.infiniteScrollReducer)

    const {
        refetch,
        isFetched,
        isFetching,
        data: paginateData,
    } = useQuery({
        queryKey: ["infinite-scroll", identifier],
        queryFn: async () => {
            switch (action) {
                case "GROUPS": {
                    const res = await searchGroups(
                        action,
                        query as string,
                        paginate + data.length,
                    )
                    if (res) {
                        return { data: res.data }
                    }
                    return {
                        status: 404,
                        data: [],
                        message: "Not found",
                    }
                }

                case "POSTS": {
                    const res = await getPaginatedPosts(
                        identifier,
                        paginate + data.length,
                    )
                    if (res.status === 200 && res.data) {
                        return {
                            data: res.data,
                        }
                    }
                    return {
                        status: 404,
                        data: [],
                        message: "Not found",
                    }
                }
            }
        },
        enabled: false,
    })
    if (isFetched && paginateData) {
        // @ts-ignore
        dispatch(onInfiniteScroll({ data: paginateData }))
    }

    useEffect(() => {
        const observer = new window.IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) refetch()
        })
        observer.observe(observerElement.current as Element)
        return () => observer.disconnect()
    }, [])
    return {
        observerElement,
        isFetching,
    }
}
export { useInfiniteScroll }
