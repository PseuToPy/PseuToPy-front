import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getGrammar, convertCode } from "../../../api";

const sliceName = "editor";

const initialState = {
    grammar: [],
    pseutopyCode: [],
    pythonCode: []
}

export const fetchGrammar = createAsyncThunk(
    `${sliceName}/grammar`,
    async (language) => {
        const data = await getGrammar(language);
        return data;
    }
)

export const convertPseudocode = createAsyncThunk(
    `${sliceName}/convert`,
    async ({instructions, language}) => {
        console.log(instructions);
        const data = await convertCode(instructions, language);
        return data;
    }
)

const editorSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        writePseutopy: (state, action) => {
            state.pseutopyCode = action.payload;
        }
    },
    extraReducers: {
        [fetchGrammar.fulfilled]: (state, action) => {
            state.grammar = action.payload;
        },
        [convertPseudocode.fulfilled]: (state, action) => {
            state.pythonCode = action.payload.code;
        }
    }
});

export const { writePseutopy } = editorSlice.actions;
export default editorSlice.reducer;