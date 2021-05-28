import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getGrammar, convertCode } from "../../../api";

const sliceName = "editor";

const initialState = {
    grammar: [],
    pseutopyCode: "",
    translationStatus: null,
    pythonCode: "",
    requestUpdate: false,
};

/** 
 * Get the grammar via the api
 */
export const fetchGrammar = createAsyncThunk(
    `${sliceName}/grammar`,
    async language => {
        const data = await getGrammar(language);
        return data;
    }
);

/** 
 * Get the converted code via api
 */
export const convertPseudocode = createAsyncThunk(
    `${sliceName}/convert`,
    async ({ instructions, language }) => {
        const data = await convertCode(instructions, language);
        return data;
    }
);

const editorSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        writePseutopy: (state, action) => {
            state.pseutopyCode = action.payload;
        },
        setRequestUpdate: (state, action) => {
            state.requestUpdate = action.payload;
        },
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
            };
            state.requestUpdate = true;
        },
    },
});

export const {
    appendLog,
    clearLogs,
    writePseutopy,
    setRequestUpdate,
} = editorSlice.actions;
export default editorSlice.reducer;
