import { createSlice } from "@reduxjs/toolkit";

export const SignedInUser = createSlice({
    name: 'signedInUser',
    initialState: {
        token: undefined,
        userData: undefined
    },

    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        clearData: (state) => {
            state.token = undefined
            state.userData = undefined
        }
    }
})

export const { setToken, setUserData, clearData } = SignedInUser.actions
export default SignedInUser.reducer