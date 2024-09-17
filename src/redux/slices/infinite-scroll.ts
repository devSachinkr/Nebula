import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
    data: unknown[]
}
const initialState: InitialState = {
    data: [],
}
export const InfiniteScroll = createSlice({
    name: "infiniteScroll",
    initialState,
    reducers: {
        onInfiniteScroll: (state, action: PayloadAction<InitialState>) => {
            const list = state.data.find((d: any) =>
                action.payload.data.find((payload: any) => d.id === payload.id),
            )
            if (!list) {
                state.data = [...state.data, ...action.payload.data]
            }
        },
        onClearList: (state, action: PayloadAction<InitialState>) => {
            state.data = action.payload.data
        },
    },
})
export const { onClearList, onInfiniteScroll } = InfiniteScroll.actions
export default InfiniteScroll.reducer
