import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type GroupStateProps = {
    id: string
    name: string
    category: string
    userId: string
    gallery: string[]
    thumbnail: string | null
    description: string | null
    jsonDescription: string | null
    privacy: "PRIVATE" | "PUBLIC"
    htmlDescription: string | undefined
    createdAt: Date
}
type initialStateType = {
    isSearching?: boolean
    status?: number | undefined
    data: GroupStateProps[]
    debounce?: string
}

const initialState: initialStateType = {
    isSearching: false,
    status: undefined,
    data: [],
    debounce: "",
}

export const Search = createSlice({
    name: "search",
    initialState,
    reducers: {
        onSearch: (state, action: PayloadAction<initialStateType>) => {
            return { ...action.payload }
        },
        onClearSearch: (state) => {
            ;(state.data = []),
                (state.isSearching = false),
                (state.status = undefined),
                (state.debounce = "")
        },
    },
})
export const { onClearSearch, onSearch } = Search.actions

export default Search.reducer
