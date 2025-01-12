import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFeature } from "../types/feature";
import { IRole } from "../types/role";
import { IAccount, IWorkspace, IAccessToken, IClientDevice } from "../types/account";

export interface ISignedInUser {
    // token?: string,
    accountData?: IAccount,
    isSignedIn?: boolean,
    appRole?: IRole,
    appRoles?: IRole[],
    accountRole?: IRole,
    accountRoles?: IRole[],
    workspaceRole?: IRole,
    workspaceRoles?: IRole[],
    mergedFeatures?: IFeature[],
    features?: IFeature[],
    workspace?: IWorkspace,
    workspaces?: IWorkspace[],
    externalWorkspaces?: (IWorkspace & {ownerId:string, ownerNameId: string, ownerAccountType: string})[],
    clientDevice?: IClientDevice,
    accessToken?: IAccessToken
}

export interface IOptSignedInUser {
    // token?: string|undefined,
    accountData?: IAccount|undefined,
    isSignedIn?: boolean|undefined,
    appRole?: IRole,
    appRoles?: IRole[],
    accountRole?: IRole,
    accountRoles?: IRole[],
    workspaceRole?: IRole,
    workspaceRoles?: IRole[],
    mergedFeatures?: IFeature[],
    features?: IFeature[]|undefined,
    workspace?: IWorkspace|undefined,
    workspaces?: IWorkspace[]|undefined,
    externalWorkspaces?: (IWorkspace & {ownerId:string, ownerNameId: string, ownerAccountType: string})[]|undefined,
    clientDevice?: IClientDevice|undefined,
    accessToken?: IAccessToken|undefined
}

const initialState:ISignedInUser = {
    // token: undefined,
    accountData: undefined,
    isSignedIn: undefined,
    appRole: undefined,
    appRoles: undefined,
    accountRole: undefined,
    accountRoles: undefined,
    workspaceRole: undefined,
    workspaceRoles: undefined,
    mergedFeatures: undefined,
    features: undefined,
    workspace: undefined,
    workspaces: undefined,
    externalWorkspaces: undefined,
    clientDevice: undefined,
    accessToken: undefined
}

export const SignedInUser = createSlice({
    name: 'signedInAccount',
    initialState,

    reducers: {
        setAccountData: (
            state,
            action: PayloadAction<IOptSignedInUser>
        ) => {
            // if (action.payload.hasOwnProperty('token')) state.token = action.payload.token
            if (action.payload.hasOwnProperty('accountData')) state.accountData = action.payload.accountData
            if (action.payload.hasOwnProperty('isSignedIn')) state.isSignedIn = action.payload.isSignedIn
            if (action.payload.hasOwnProperty('appRole')) state.appRole = action.payload.appRole
            if (action.payload.hasOwnProperty('appRoles')) state.appRoles = action.payload.appRoles
            if (action.payload.hasOwnProperty('accountRole')) state.accountRole = action.payload.accountRole
            if (action.payload.hasOwnProperty('accountRoles')) state.accountRoles = action.payload.accountRoles
            if (action.payload.hasOwnProperty('workspaceRole')) state.workspaceRole = action.payload.workspaceRole
            if (action.payload.hasOwnProperty('workspaceRoles')) state.workspaceRoles = action.payload.workspaceRoles
            if (action.payload.hasOwnProperty('mergedFeatures')) state.mergedFeatures = action.payload.mergedFeatures
            if (action.payload.hasOwnProperty('features')) state.features = action.payload.features
            if (action.payload.hasOwnProperty('workspace')) state.workspace = action.payload.workspace
            if (action.payload.hasOwnProperty('workspaces')) state.workspaces = action.payload.workspaces
            if (action.payload.hasOwnProperty('externalWorkspaces')) state.externalWorkspaces = action.payload.externalWorkspaces
            if (action.payload.hasOwnProperty('clientDevice')) state.clientDevice = action.payload.clientDevice
            if (action.payload.hasOwnProperty('accessToken')) state.accessToken = action.payload.accessToken
        },
        clearAccountData: (state) => {
            // state.token = undefined
            state.accountData = undefined
            state.isSignedIn = false
            state.appRole = undefined
            state.appRoles = undefined
            state.accountRole = undefined
            state.accountRoles = undefined
            state.workspaceRole = undefined
            state.workspaceRoles = undefined
            state.mergedFeatures = undefined
            state.features = undefined
            state.workspace = undefined
            state.workspaces = undefined
            state.externalWorkspaces = undefined
            state.clientDevice = undefined
            state.accessToken = undefined
        }
    }
})

export const { setAccountData, clearAccountData } = SignedInUser.actions
export default SignedInUser.reducer