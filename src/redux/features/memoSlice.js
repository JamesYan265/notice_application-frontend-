import { createSlice } from "@reduxjs/toolkit";

//初始值為空 Data Type為Obejct
//小心 : 初始值的value數值有繼承效果, 假即設定為Object後,後面全都是Object
//由於memo為要取出多列Object數值,所以memo要列為Array Data type
const initialState = { value : []};

export const memoSlice = createSlice({
    //Slice名稱
    name: "memo",
    //初始數值
    initialState,
    reducers: {
        //state = 為未變更之值, action為執行動作後(payload)的數值
        setMemo : (state, action) => {
            state.value = action.payload
        },
    },
});

export const { setMemo } = memoSlice.actions;
export default memoSlice.reducer;