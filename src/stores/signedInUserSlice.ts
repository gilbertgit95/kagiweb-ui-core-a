import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFeature } from "../types/feature";
import { IRole } from "../types/role";
import { IUser } from "../types/user";
import { IWorkspace } from "../types/workspace";

const initialState:{
    token: string|undefined,
    userData: IUser|undefined,
    isSignedIn: boolean|false,
    role: IRole|undefined,
    features: IFeature|undefined,
    activeWorkspace: IWorkspace|undefined
} = {
    token: undefined,
    userData: undefined,
    isSignedIn: false,
    role: undefined,
    features: undefined,
    activeWorkspace: undefined
}

export const SignedInUser = createSlice({
    name: 'signedInUser',
    initialState,

    reducers: {
        setData: (
            state,
            action: PayloadAction<{
                token?: string|undefined,
                userData?: IUser|undefined,
                isSignedIn?: boolean|false,
                role?: IRole|undefined,
                features?: IFeature|undefined,
                activeWorkspace?: IWorkspace|undefined
            }>
        ) => {
            if (action.payload.token) state.token = action.payload.token
            if (action.payload.userData) state.userData = action.payload.userData
            if (action.payload.isSignedIn) state.isSignedIn = action.payload.isSignedIn
            if (action.payload.role) state.role = action.payload.role
            if (action.payload.features) state.features = action.payload.features
            if (action.payload.activeWorkspace) state.activeWorkspace = action.payload.activeWorkspace
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