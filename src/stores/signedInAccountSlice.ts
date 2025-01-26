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
    workspace?: IWorkspace,
    workspaces?: IWorkspace[],
    externalWorkspaces?: (IWorkspace & {ownerId:string, ownerNameId: string, ownerAccountType: string})[],
    clientDevice?: IClientDevice,
    accessToken?: IAccessToken,

    visitedAccount?: IAccount,
    visitedAccountRole?: IRole,
    visitedAccountRoles?: IRole[],
    visitedAccountWorkspace?: IWorkspace,
    visitedAccountWorkspaceRole?: IRole,
    visitedAccountWorkspaceRoles?: IRole[],

    mergedFeatures?: IFeature[],
    appFeatures?: IFeature[]
}

export interface IOptSignedInUser {
    // token?: string|undefined,
    accountData?: IAccount|undefined,
    isSignedIn?: boolean|undefined,
    appRole?: IRole,
    appRoles?: IRole[],
    workspace?: IWorkspace|undefined,
    workspaces?: IWorkspace[]|undefined,
    externalWorkspaces?: (IWorkspace & {ownerId:string, ownerNameId: string, ownerAccountType: string})[]|undefined,
    clientDevice?: IClientDevice|undefined,
    accessToken?: IAccessToken|undefined

    mergedFeatures?: IFeature[],
    appFeatures?: IFeature[]|undefined,

    visitedAccount?: IAccount,
    visitedAccountRole?: IRole,
    visitedAccountRoles?: IRole[],
    visitedAccountWorkspace?: IWorkspace,
    visitedAccountWorkspaceRole?: IRole,
    visitedAccountWorkspaceRoles?: IRole[],
}

const initialState:ISignedInUser = {
    // token: undefined,
    accountData: undefined,
    isSignedIn: undefined,
    appRole: undefined,
    appRoles: undefined,
    workspace: undefined,
    workspaces: undefined,
    externalWorkspaces: undefined,
    clientDevice: undefined,
    accessToken: undefined,

    mergedFeatures: undefined,
    appFeatures: undefined,

    visitedAccount: undefined,
    visitedAccountRole: undefined,
    visitedAccountRoles: undefined,
    visitedAccountWorkspace: undefined,
    visitedAccountWorkspaceRole: undefined,
    visitedAccountWorkspaceRoles: undefined
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
            if (action.payload.hasOwnProperty('workspace')) state.workspace = action.payload.workspace
            if (action.payload.hasOwnProperty('workspaces')) state.workspaces = action.payload.workspaces
            if (action.payload.hasOwnProperty('externalWorkspaces')) state.externalWorkspaces = action.payload.externalWorkspaces
            if (action.payload.hasOwnProperty('clientDevice')) state.clientDevice = action.payload.clientDevice
            if (action.payload.hasOwnProperty('accessToken')) state.accessToken = action.payload.accessToken

            if (action.payload.hasOwnProperty('mergedFeatures')) state.mergedFeatures = action.payload.mergedFeatures
            if (action.payload.hasOwnProperty('appFeatures')) state.appFeatures = action.payload.appFeatures

            if (action.payload.hasOwnProperty('visitedAccount')) state.visitedAccount = action.payload.visitedAccount
            if (action.payload.hasOwnProperty('visitedAccountRole')) state.visitedAccountRole = action.payload.visitedAccountRole
            if (action.payload.hasOwnProperty('visitedAccountRoles')) state.visitedAccountRoles = action.payload.visitedAccountRoles
            if (action.payload.hasOwnProperty('visitedAccountWorkspace')) state.visitedAccountWorkspace = action.payload.visitedAccountWorkspace
            if (action.payload.hasOwnProperty('visitedAccountWorkspaceRole')) state.visitedAccountWorkspaceRole = action.payload.visitedAccountWorkspaceRole
            if (action.payload.hasOwnProperty('visitedAccountWorkspaceRoles')) state.visitedAccountWorkspaceRoles = action.payload.visitedAccountWorkspaceRoles
        },
        clearAccountData: (state) => {
            // state.token = undefined
            state.accountData = undefined
            state.isSignedIn = false
            state.appRole = undefined
            state.appRoles = undefined
            state.workspace = undefined
            state.workspaces = undefined
            state.externalWorkspaces = undefined
            state.clientDevice = undefined
            state.accessToken = undefined

            state.mergedFeatures = undefined
            state.appFeatures = undefined

            state.visitedAccount = undefined
            state.visitedAccountRole = undefined
            state.visitedAccountRoles = undefined
            state.visitedAccountWorkspace = undefined
            state.visitedAccountWorkspaceRole = undefined
            state.visitedAccountWorkspaceRoles = undefined
        }
    }
})

export const { setAccountData, clearAccountData } = SignedInUser.actions
export default SignedInUser.reducer