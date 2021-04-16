import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getGrammar, convertCode } from "../../../api";

import TranslationStatus from "../../../model/editor/translationStatus";

const sliceName = "editor";

const initialState = {
    grammar: [],
    pseutopyCode: [],
    translationStatus: null,
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
            const { code, message, status } = action.payload;
            state.pythonCode = code;
            state.translationStatus = {
                status,
                message
            }
        }
    }
});

export const { writePseutopy } = editorSlice.actions;
export default editorSlice.reducer;