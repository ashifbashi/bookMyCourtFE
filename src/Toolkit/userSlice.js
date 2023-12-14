import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
    userDetails:JSON.parse(localStorage.getItem('user'))  ?? {},
}


const generalSlice = createSlice({
    name: 'user',
    initialState:INITIAL_STATE,
    reducers:{
        setUserDetail:(state, action)=>{
             state.userDetails = action.payload
        }
        // setUserRole:(state, action)=>{
        //     console.log(action)
        //     debugger
        //     state.userRole = action.payload
        // }
    }
})


export const {setUserDetail}=generalSlice.actions
export default generalSlice.reducer