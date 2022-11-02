import { createSlice } from "@reduxjs/toolkit";

//初始值為空 Data Type為Obejct
//小心 : 初始值的value數值有繼承效果, 即設定為Object後,後面全都是Object
const initialState = { value : {}};

export const userSlice = createSlice({
    //Slice名稱
    name: "user",
    //初始數值
    initialState,
    reducers: {
        //state = 為未變更之值, action為執行動作後(payload)的數值
        setUser : (state, action) => {
            state.value = action.payload
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;