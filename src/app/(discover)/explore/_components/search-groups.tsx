import { Loader } from "@/components/loader"
import { GroupStateProps } from "@/redux/slices/search"
import React from "react"
import GroupCard from "./group-card"
import { NoResult } from "@/components/global/search/no-results"
import InfiniteScrollObserver from "@/components/global/Infinite-scroll-observer"

type Props = {
    searching: boolean | undefined
    query?: string | undefined
    data: GroupStateProps[]
}

export const SearchGroups = ({ data, searching, query }: Props) => {
    return (
        <div className="container grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6 mt-36">
            <Loader
                loading={searching!}
                className="lg:col-span-3 md:col-span-2"
            >
                {data.length > 0 ? (
                    data.map((g) => (
                        <GroupCard key={g.id} {...g} desc={g.description} />
                    ))
                ) : (
                    <NoResult />
                )}
            </Loader>
            {data.length > 5 && (
                <InfiniteScrollObserver
                    action="GROUPS"
                    identifier={query as string}
                    paginate={data.length}
                    search
                >
                    <PaginatedGroups />
                </InfiniteScrollObserver>
            )}
        </div>
    )
}
