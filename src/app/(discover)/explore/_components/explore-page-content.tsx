"use client"
import { useAppSelector } from "@/redux/store"
import dynamic from "next/dynamic"
import React from "react"

type Props = {
    layout: "SLIDER" | "LIST"
    category?: string
}

const ExplorePageContent = ({ layout, category }: Props) => {
    const { isSearching, data, status, debounce } = useAppSelector(
        (state) => state.searchReducer,
    )
    const SearchGroups = dynamic(
        () => import("./search-groups").then((c) => c.SearchGroups),
        {
            ssr: false,
        },
    )
    return (
        <div className="flex flex-col">
            {isSearching || debounce ? (
                <SearchGroups
                    searching={isSearching}
                    query={debounce}
                    data={data}
                />
            ) : (
                <></>
            )}
        </div>
    )
}

export default ExplorePageContent
