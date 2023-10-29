import { createSlice } from '@reduxjs/toolkit'
export interface authState {
    isAuth: boolean,
    role: string;
}

const initialState: authState = {
    isAuth: false,
    role: "Admin"
}
export const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers:{
        updateAuthStatus:(state,action)=>{
            state.isAuth = action.payload   

        },
        updateAuthRole:(state, action) => {
            state.role = action.payload
        }
    }
});

export const {updateAuthStatus, updateAuthRole} = authSlice.actions;
export default authSlice.reducer