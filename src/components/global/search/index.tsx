"use client"
import { Input } from "@/components/ui/input"
import { useSearch } from "@/hooks/search"
import { cn } from "@/lib/utils"
import { SearchIcon } from "lucide-react"
import React from "react"

type Props = {
    searchType: "POSTS" | "GROUPS"
    className?: string
    placeholder?: string
    iconStyle?: string
    glass?: boolean
    inputStyle?: string
}

const Search = ({
    searchType,
    className,
    placeholder,
    iconStyle,
    glass,
    inputStyle,
}: Props) => {
    const { query, searchQuery } = useSearch({ searchType })
    return (
        <div
            className={cn(
                "border-2 flex gap-2 items-center",
                className,
                glass &&
                    "bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-2xl bg-opacity-20",
            )}
        >
            <SearchIcon className={cn(iconStyle || "text-themeGray")} />
            <Input
                onChange={searchQuery}
                value={query}
                className={cn("bg-transparent border-0", inputStyle)}
                placeholder={placeholder}
                type="text"
            />
        </div>
    )
}

export default Search
