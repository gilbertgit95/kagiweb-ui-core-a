import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFeature } from "../types/feature";
import { IRole } from "../types/role";
import { IUser } from "../types/user";
import { IWorkspace } from "../types/workspace";

export interface ISignedInUser {
    token: string|undefined,
    userData: IUser|undefined,
    isSignedIn: boolean|false,
    role: IRole|undefined,
    roles: IRole[]|undefined,
    features: IFeature[]|undefined,
    workspace: IWorkspace|undefined,
    workspaces: IWorkspace[]|undefined
}

export interface IOptSignedInUser {
    token?: string|undefined,
    userData?: IUser|undefined,
    isSignedIn?: boolean|false,
    role?: IRole|undefined,
    roles?: IRole[]|undefined,
    features?: IFeature[]|undefined,
    workspace?: IWorkspace|undefined,
    workspaces?: IWorkspace[]|undefined
}

const initialState:ISignedInUser = {
    token: undefined,
    userData: undefined,
    isSignedIn: false,
    role: undefined,
    roles: undefined,
    features: undefined,
    workspace: undefined,
    workspaces: undefined
}

export const SignedInUser = createSlice({
    name: 'signedInUser',
    initialState,

    reducers: {
        setUserData: (
            state,
            action: PayloadAction<IOptSignedInUser>
        ) => {
            if (action.payload.token) state.token = action.payload.token
            if (action.payload.userData) state.userData = action.payload.userData
            if (action.payload.isSignedIn) state.isSignedIn = action.payload.isSignedIn
            if (action.payload.role) state.role = action.payload.role
            if (action.payload.roles) state.roles = action.payload.roles
            if (action.payload.features) state.features = action.payload.features
            if (action.payload.workspace) state.workspace = action.payload.workspace
            if (action.payload.workspaces) state.workspaces = action.payload.workspaces
        },
        clearUserData: (state) => {
            state.token = undefined
            state.userData = undefined
            state.isSignedIn = false
            state.role = undefined
            state.roles = undefined
            state.features = undefined
            state.workspace = undefined
            state.workspaces = undefined
        }
    }
})

export const { setUserData, clearUserData } = SignedInUser.actions
export default SignedInUser.reducer