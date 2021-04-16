import { configureStore } from '@reduxjs/toolkit'

import testReducer from '../features/test/testSlice'
import editorReducer from '../features/editor'

const store = configureStore({
    reducer: {
        test: testReducer,
        editor: editorReducer
    }
})

export default store