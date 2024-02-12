import { createSlice } from "@reduxjs/toolkit";



const generalSlice = createSlice({
    name: 'user',
    initialState:{
        userDetails:{},
        userRole:''
    },
    reducers:{
        setUserDetail:(state, action)=>{
             state.userDetails = {name:'sample'}
        },
        setUserRole:(state, action)=>{
            state.userRole = 'admin'
        }
    }
})


export const {setUserDetail, setUserRole}=generalSlice.actions
export default generalSlice.reducer