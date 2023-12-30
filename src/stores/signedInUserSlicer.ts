import { createSlice } from "@reduxjs/toolkit";

export const SignedInUser = createSlice({
    name: 'SignedInUser',
    initialState: {
        userData: undefined
    },

    reducers: {

    }
})

export const {} = SignedInUser.actions
export default SignedInUser.reducer