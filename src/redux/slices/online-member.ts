import { createSlice, PayloadAction } from "@reduxjs/toolkit"
type InitialStateProps = {
    members: {
        id: string
    }[]
}

const initialState: InitialStateProps = {
    members: [],
}

export const OnlineTracking = createSlice({
    name: "online",
    initialState,
    reducers: {
        onOnline: (state, action: PayloadAction<InitialStateProps>) => {
            const list = state.members.find((data: any) =>
                action.payload.members.find((p: any) => data.id === p.id),
            )
            if (!list) {
                state.members = [...state.members, ...action.payload.members]
            }
        },
        onOffline: (state, action: PayloadAction<InitialStateProps>) => {
            state.members = state.members.filter((member) => {
                action.payload.members.find((m) => m.id !== member.id)
            })
        },
    },
})

export const { onOffline, onOnline } = OnlineTracking.actions
export default OnlineTracking.reducer
