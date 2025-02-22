import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFeature } from "../types/feature";
import { IRole } from "../types/role";
import { IAccount, IWorkspace, IAccessToken, IClientDevice } from "../types/account";

export interface IAccessInfo {
    // token?: string,
    accountData?: IAccount,
    isSignedIn?: boolean,
    workspace?: IWorkspace,
    workspaces?: IWorkspace[],
    externalWorkspaces?: (IWorkspace & {ownerId:string, ownerNameId: string, ownerAccountType: string})[],
    clientDevice?: IClientDevice,
    accessToken?: IAccessToken,
    activeNotifications?: number,

    appRole?: IRole,
    appRoles?: IRole[],
    appFeatures?: IFeature[],

    visitedAccount?: IAccount,
    visitedAccountRole?: IRole,
    // visitedAccountRoles?: IRole[],
    visitedAccountFeatures?: IFeature[],

    visitedAccountWorkspace?: IWorkspace,
    visitedAccountWorkspaceRole?: IRole,
    // visitedAccountWorkspaceRoles?: IRole[],
    visitedAccountWorkspaceFeatures?: IFeature[],

    mergedFeatures?: IFeature[]
}

export interface IOptAccessInfo {
    // token?: string|undefined,
    accountData?: IAccount|undefined,
    isSignedIn?: boolean|undefined,
    workspace?: IWorkspace|undefined,
    workspaces?: IWorkspace[]|undefined,
    externalWorkspaces?: (IWorkspace & {ownerId:string, ownerNameId: string, ownerAccountType: string})[]|undefined,
    clientDevice?: IClientDevice|undefined,
    accessToken?: IAccessToken|undefined,
    activeNotifications?: number,

    appRole?: IRole,
    appRoles?: IRole[],
    appFeatures?: IFeature[]|undefined,

    visitedAccount?: IAccount,
    visitedAccountRole?: IRole,
    // visitedAccountRoles?: IRole[],
    visitedAccountFeatures?: IFeature[],

    visitedAccountWorkspace?: IWorkspace,
    visitedAccountWorkspaceRole?: IRole,
    // visitedAccountWorkspaceRoles?: IRole[],
    visitedAccountWorkspaceFeatures?: IFeature[],

    mergedFeatures?: IFeature[]
}

const initialState:IAccessInfo = {
    // token: undefined,
    accountData: undefined,
    isSignedIn: undefined,
    workspace: undefined,
    workspaces: undefined,
    externalWorkspaces: undefined,
    clientDevice: undefined,
    accessToken: undefined,
    activeNotifications: undefined,

    appRole: undefined,
    appRoles: undefined,
    appFeatures: undefined,

    visitedAccount: undefined,
    visitedAccountRole: undefined,
    // visitedAccountRoles: undefined,
    visitedAccountFeatures: undefined,

    visitedAccountWorkspace: undefined,
    visitedAccountWorkspaceRole: undefined,
    // visitedAccountWorkspaceRoles: undefined,
    visitedAccountWorkspaceFeatures: undefined,

    mergedFeatures: undefined
}

export const AccessInfo = createSlice({
    name: 'signedInAccount',
    initialState,

    reducers: {
        setAccountData: (
            state,
            action: PayloadAction<IOptAccessInfo>
        ) => {
            // if (action.payload.hasOwnProperty('token')) state.token = action.payload.token
            if (action.payload.hasOwnProperty('accountData')) state.accountData = action.payload.accountData
            if (action.payload.hasOwnProperty('isSignedIn')) state.isSignedIn = action.payload.isSignedIn
            if (action.payload.hasOwnProperty('workspace')) state.workspace = action.payload.workspace
            if (action.payload.hasOwnProperty('workspaces')) state.workspaces = action.payload.workspaces
            if (action.payload.hasOwnProperty('externalWorkspaces')) state.externalWorkspaces = action.payload.externalWorkspaces
            if (action.payload.hasOwnProperty('clientDevice')) state.clientDevice = action.payload.clientDevice
            if (action.payload.hasOwnProperty('accessToken')) state.accessToken = action.payload.accessToken
            if (action.payload.hasOwnProperty('activeNotifications')) state.activeNotifications = action.payload.activeNotifications

            if (action.payload.hasOwnProperty('appRole')) state.appRole = action.payload.appRole
            if (action.payload.hasOwnProperty('appRoles')) state.appRoles = action.payload.appRoles
            if (action.payload.hasOwnProperty('appFeatures')) state.appFeatures = action.payload.appFeatures

            if (action.payload.hasOwnProperty('visitedAccount')) state.visitedAccount = action.payload.visitedAccount
            if (action.payload.hasOwnProperty('visitedAccountRole')) state.visitedAccountRole = action.payload.visitedAccountRole
            // if (action.payload.hasOwnProperty('visitedAccountRoles')) state.visitedAccountRoles = action.payload.visitedAccountRoles
            if (action.payload.hasOwnProperty('visitedAccountFeatures')) state.visitedAccountFeatures = action.payload.visitedAccountFeatures
    
            if (action.payload.hasOwnProperty('visitedAccountWorkspace')) state.visitedAccountWorkspace = action.payload.visitedAccountWorkspace
            if (action.payload.hasOwnProperty('visitedAccountWorkspaceRole')) state.visitedAccountWorkspaceRole = action.payload.visitedAccountWorkspaceRole
            // if (action.payload.hasOwnProperty('visitedAccountWorkspaceRoles')) state.visitedAccountWorkspaceRoles = action.payload.visitedAccountWorkspaceRoles
            if (action.payload.hasOwnProperty('visitedAccountWorkspaceFeatures')) state.visitedAccountWorkspaceFeatures = action.payload.visitedAccountWorkspaceFeatures

            if (action.payload.hasOwnProperty('mergedFeatures')) state.mergedFeatures = action.payload.mergedFeatures
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
            state.activeNotifications = undefined

            state.mergedFeatures = undefined
            state.appFeatures = undefined

            state.visitedAccount = undefined
            state.visitedAccountRole = undefined
            // state.visitedAccountRoles = undefined
            state.visitedAccountFeatures = undefined

            state.visitedAccountWorkspace = undefined
            state.visitedAccountWorkspaceRole = undefined
            // state.visitedAccountWorkspaceRoles = undefined
            state.visitedAccountWorkspaceFeatures = undefined
        }
    }
})

export const { setAccountData, clearAccountData } = AccessInfo.actions
export default AccessInfo.reducer