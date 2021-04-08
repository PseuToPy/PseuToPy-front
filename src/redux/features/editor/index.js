import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getGrammar } from "../../../api";

const sliceName = "editor";

const initialState = {
    grammar: []
}

export const fetchGrammar = createAsyncThunk(
    `${sliceName}/grammar`,
    async (language) => {
        const data = await getGrammar(language);
        return data;
    }
)

const editorSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        grammar2: (state, action) => {
            state.grammar = action.payload
        }
    },
    extraReducers: {
        [fetchGrammar.fulfilled]: (state, action) => {
            state.grammar = action.payload
        }
    }
});

export default editorSlice.reducer;