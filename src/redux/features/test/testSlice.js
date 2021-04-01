import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value : 0
}

const testSlice = createSlice({
    name: 'tests',
    initialState,
    reducers: {
        up(state, action) {
            state.value += action.payload
        },
        down(state, action) {
            state.value -= action.payload
        }
    }
})

export const { up, down } = testSlice.actions

export default testSlice.reducer