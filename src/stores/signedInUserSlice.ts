import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFeature } from "../types/feature";
import { IRole } from "../types/role";
import { IUser, IWorkspace } from "../types/user";

export interface ISignedInUser {
    // token?: string,
    userData?: IUser,
    isSignedIn?: boolean,
    role?: IRole,
    roles?: IRole[],
    features?: IFeature[],
    workspace?: IWorkspace,
    workspaces?: IWorkspace[],
    externalWorkspaces?: (IWorkspace & {ownerId:string, ownerUsername: string, ownerAccountType: string})[]
}

export interface IOptSignedInUser {
    // token?: string|undefined,
    userData?: IUser|undefined,
    isSignedIn?: boolean|undefined,
    role?: IRole|undefined,
    roles?: IRole[]|undefined,
    features?: IFeature[]|undefined,
    workspace?: IWorkspace|undefined,
    workspaces?: IWorkspace[]|undefined,
    externalWorkspaces?: (IWorkspace & {ownerId:string, ownerUsername: string, ownerAccountType: string})[]|undefined
}

const initialState:ISignedInUser = {
    // token: undefined,
    userData: undefined,
    isSignedIn: undefined,
    role: undefined,
    roles: undefined,
    features: undefined,
    workspace: undefined,
    workspaces: undefined,
    externalWorkspaces: undefined
}

export const SignedInUser = createSlice({
    name: 'signedInUser',
    initialState,

    reducers: {
        setUserData: (
            state,
            action: PayloadAction<IOptSignedInUser>
        ) => {
            // if (action.payload.hasOwnProperty('token')) state.token = action.payload.token
            if (action.payload.hasOwnProperty('userData')) state.userData = action.payload.userData
            if (action.payload.hasOwnProperty('isSignedIn')) state.isSignedIn = action.payload.isSignedIn
            if (action.payload.hasOwnProperty('role')) state.role = action.payload.role
            if (action.payload.hasOwnProperty('roles')) state.roles = action.payload.roles
            if (action.payload.hasOwnProperty('features')) state.features = action.payload.features
            if (action.payload.hasOwnProperty('workspace')) state.workspace = action.payload.workspace
            if (action.payload.hasOwnProperty('workspaces')) state.workspaces = action.payload.workspaces
            if (action.payload.hasOwnProperty('externalWorkspaces')) state.externalWorkspaces = action.payload.externalWorkspaces
        },
        clearUserData: (state) => {
            // state.token = undefined
            state.userData = undefined
            state.isSignedIn = false
            state.role = undefined
            state.roles = undefined
            state.features = undefined
            state.workspace = undefined
            state.workspaces = undefined
            state.externalWorkspaces = undefined
        }
    }
})

export const { setUserData, clearUserData } = SignedInUser.actions
export default SignedInUser.reducer