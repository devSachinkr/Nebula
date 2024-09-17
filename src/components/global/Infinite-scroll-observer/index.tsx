"use client"
import { useInfiniteScroll } from "@/hooks/infinite-query"
import { GroupStateProps } from "@/redux/slices/search"
import React from "react"
import Skeleton from "../skeleton"

type Props = {
    children: React.ReactNode
    action: "GROUPS" | "POSTS"
    identifier: string
    paginate: number
    search?: boolean
    loading?: "POST"
}

const InfiniteScrollObserver = ({
    action,
    children,
    identifier,
    paginate,
    search,
    loading,
}: Props) => {
    const { isFetching, observerElement } = useInfiniteScroll({
        action,
        identifier,
        paginate,
        search,
    })
    return <>
    {children}
    <div
    ref={observerElement}
    >
        {isFetching && <Skeleton element={loading ||"CARD"} />}
    </div>
    </>
}

export default InfiniteScrollObserver
