import { createSlice } from "@reduxjs/toolkit";

export const SignedInUser = createSlice({
    name: 'signedInUser',
    initialState: {
        token: undefined,
        userData: undefined,
        isSignedIn: false,
        role: undefined,
        features: undefined,
        activeWorkspace: undefined
    },

    reducers: {
        setData: (state, {payload}) => {
            if (payload.token) state.token = payload.token
            if (payload.userData) state.userData = payload.userData
            if (payload.isSignedIn) state.isSignedIn = payload.isSignedIn
            if (payload.role) state.role = payload.role
            if (payload.features) state.features = payload.features
            if (payload.activeWorkspace) state.activeWorkspace = payload.activeWorkspace
        },
        clearData: (state) => {
            state.token = undefined
            state.userData = undefined
            state.isSignedIn = false
            state.role = undefined
            state.features = undefined
            state.activeWorkspace = undefined
        }
    }
})

export const { setData, clearData } = SignedInUser.actions
export default SignedInUser.reducer