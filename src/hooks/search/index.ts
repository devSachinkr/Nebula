"use client"

import { searchGroups } from "@/actions/groups"
import { onClearSearch, onSearch } from "@/redux/slices/search"
import { AppDispatch } from "@/redux/store"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const useSearch = ({ searchType }: { searchType: "POSTS" | "GROUPS" }) => {
    const [query, setQuery] = useState<string>("")
    const [debounce, setDebounce] = useState<string>("")
    const dispatch: AppDispatch = useDispatch()
    const searchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }
    useEffect(() => {
        const delayTimeoutId = setTimeout(() => {
            setDebounce(query)
        }, 1000)
        return () => clearTimeout(delayTimeoutId)
    }, [query, 1000])

    const { refetch, data, isFetched, isFetching } = useQuery({
        queryKey: ["search-data", debounce],
        queryFn: async ({ queryKey }) => {
            if (searchType === "GROUPS") {
                const res = await searchGroups(searchType, queryKey[1])
                return res
            }
        },
        enabled: false,
    })
    if (isFetching) {
        dispatch(
            onSearch({
                isSearching: true,
                data: [],
            }),
        )
    }
    if (isFetched) {
        dispatch(
            onSearch({
                isSearching: false,
                status: data?.status as number,
                data: data?.data || [],
                debounce,
            }),
        )
    }

    useEffect(() => {
        if (debounce) refetch()
        if (!debounce) dispatch(onClearSearch())
        return () => {
            debounce
        }
    }, [debounce])
    return {query,searchQuery}
}

export { useSearch }
