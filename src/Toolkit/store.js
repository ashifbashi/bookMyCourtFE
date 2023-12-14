import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice';
import courtSlice from './courtSlice';




export const store = configureStore({
    reducer:{
        user:userSlice,
        court:courtSlice
    }
})
