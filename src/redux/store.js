import {configureStore} from '@reduxjs/toolkit';
import userReducer from './features/UserSlice';
import memoReducer from './features/memoSlice';


//Redux Concept : Action(Dispatch) -> Reducer(Slice) -> Store -> UI -> Action ...
//reducer 放入 store
export const store = configureStore({
    reducer: {
        user: userReducer,
        memo: memoReducer,
    },
})