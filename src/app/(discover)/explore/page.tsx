import { getGroupByCategory } from "@/actions/groups"
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query"
import React from "react"
import ExplorePageContent from "./_components/explore-page-content"

const page = async () => {
    const query = new QueryClient()

    await query.prefetchQuery({
        queryKey: ["fitness"],
        queryFn: async () =>
            getGroupByCategory({
                category: "fitness",
                page: 0,
            }),
    })
    await query.prefetchQuery({
        queryKey: ["music"],
        queryFn: async () =>
            getGroupByCategory({
                category: "music",
                page: 0,
            }),
    })
    await query.prefetchQuery({
        queryKey: ["lifestyle"],
        queryFn: async () =>
            getGroupByCategory({
                category: "lifestyle",
                page: 0,
            }),
    })
    return (
        <HydrationBoundary state={dehydrate(query)}>
            <ExplorePageContent layout="SLIDER" />
        </HydrationBoundary>
    )
}

export default page
