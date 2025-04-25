import OwnerApi from '../../dataEndpoints/apiCoreA/ownerApi'
import { IAccessInfo } from '../../stores/signedInAccountSlice'
import {
    IAccount,
    IAccountUpdate,
    IAccountInfo,
    IAccountConfig,
    IContactInfo,
    IRoleRef,
    ILimitedTransaction,
    IPassword,
    IClientDevice,
    IAccessToken,
    IAccountAccountRef,
    IWorkspace,
    IWorkspaceAccountRef
} from '../../types/account';
// import { IRole } from '../../types/role';
// import { IFeature } from '../../types/feature';

class OwnerService {
    public static getOwner():Promise<{data: IAccount}> {
        return OwnerApi.getOwner()
    }

    public static updateOwner(account: IAccountUpdate):Promise<{data: IAccount}> {
        return OwnerApi.updateOwner(account)
    }

    public static reqOwnerCompleteInfo():Promise<{data: IAccessInfo}> {
        return OwnerApi.getOwnerCompleteInfo()
    }

    // get account access info
    public static reqAccountAccessInfo(accountId:string):Promise<{data: IAccessInfo}> {
        return OwnerApi.getOwnerAccountAccessInfo(accountId)
    }

    // get account workspace access info
    public static reqAccountWorkspaceAccessInfo(accountId:string, workspaceId:string):Promise<{data: IAccessInfo}> {
        return OwnerApi.getOwnerWorkspaceAccessInfo(accountId, workspaceId)
    }

    // account info
    public static updateAccountInfo(accountId:string, accountInfo: IAccountInfo):Promise<{data: IAccountInfo}> {
        return OwnerApi.updateAccountInfo(accountId, accountInfo)
    }

    public static createAccountInfo(accountId:string, accountInfo: IAccountInfo):Promise<{data: IAccountInfo}> {
        return OwnerApi.createAccountInfo(accountId, accountInfo)
    }

    public static deleteAccountInfo(accountId:string, accountInfoId:string):Promise<{data: IAccountInfo}> {
        return OwnerApi.deleteAccountInfo(accountId, accountInfoId)
    }

    // account config
    public static updateAccountConfig(accountId:string, configId:string, value:string):Promise<{data: IAccountConfig}> {
        return OwnerApi.updateAccountConfig(accountId, configId, value)
    }

    // contact Info
    public static updateContactInfo(accountId:string, ContactInfo:IContactInfo):Promise<{data: IContactInfo}> {
        return OwnerApi.updateContactInfo(accountId, ContactInfo)
    }

    public static createContactInfo(accountId:string, ContactInfo:IContactInfo):Promise<{data: IContactInfo}> {
        return OwnerApi.createContactInfo(accountId, ContactInfo)
    }

    public static deleteContactInfo(accountId:string, ContactInfoId:string):Promise<{data: IContactInfo}> {
        return OwnerApi.deleteContactInfo(accountId, ContactInfoId)
    }

    // roles
    public static updateAccountRole(accountId:string, AccountRole:{_id: string, isActive?:boolean, roleId?:string}):Promise<{data: IRoleRef}> {
        return OwnerApi.updateAccountRole(accountId, AccountRole)
    }

    public static createAccountRole(accountId:string, roleRefId:string):Promise<{data: IRoleRef}> {
        return OwnerApi.createAccountRole(accountId, {roleId: roleRefId})
    }

    public static deleteAccountRole(accountId:string, AccountRoleId:string):Promise<{data: IRoleRef}> {
        return OwnerApi.deleteAccountRole(accountId, AccountRoleId)
    }

    // limited transaction
    public static updateLT(accountId:string, lt:ILimitedTransaction):Promise<{data: ILimitedTransaction}> {
        return OwnerApi.updateAccountLT(accountId, lt)
    }

    // owner password
    public static createPassword(accountId:string, passInfo:{currPassword:string, newPassword:string}):Promise<{data: IPassword}> {
        return OwnerApi.createAccountPassword(accountId, passInfo)
    }

    // owner client device
    public static getClientDeviceById(account:IAccount, clientDeviceId:string):IClientDevice|undefined {

        if (account && account.clientDevices) {
            for (const clientDevice of account.clientDevices) {
                if (clientDevice._id === clientDeviceId) return clientDevice
            }
        }

        return undefined
    }

    public static updateClientDevice(accountId:string, clientDevice:{_id?:string, ua?:string, description?:string, disabled?:boolean}):Promise<{data: IClientDevice}> {
        return OwnerApi.updateClientDevice(accountId, clientDevice)
    }

    public static createClientDevice(accountId:string, clientDevice:IClientDevice):Promise<{data: IClientDevice}> {
        return OwnerApi.createClientDevice(accountId, clientDevice)
    }

    public static deleteClientDevice(accountId:string, clientDeviceId:string):Promise<{data: IClientDevice}> {
        return OwnerApi.deleteClientDevice(accountId, clientDeviceId)
    }

    // owner client device token
    public static updateClientDeviceToken(accountId:string, clientDeviceId:string, token:{_id?:string, ipAddress?:string, description?:string, disabled?:boolean}):Promise<{data: IAccessToken}> {
        return OwnerApi.updateClientDeviceToken(accountId, clientDeviceId, token)
    }

    public static createClientDeviceToken(accountId:string, clientDeviceId:string, token:IAccessToken & {expiration:number|undefined}):Promise<{data: IAccessToken}> {
        return OwnerApi.createClientDeviceToken(accountId, clientDeviceId, token)
    }

    public static deleteClientDeviceToken(accountId:string, clientDeviceId:string, clientDeviceTokenId:string):Promise<{data: IAccessToken}> {
        return OwnerApi.deleteClientDeviceToken(accountId, clientDeviceId, clientDeviceTokenId)
    }

    // account refs
    public static getAccountRef(accountId:string, accountRefId:string):Promise<{data: IAccountAccountRef & {nameId?:string} | null}> {
        return OwnerApi.getAccountRef(
            accountId,
            accountRefId
        )
    }

    public static getAccountRefs( accountId:string):Promise<{data: (IAccountAccountRef & {nameId?:string})[]}> {
        return OwnerApi.getAccountRefs(
            accountId
        )
    }

    public static updateAccountRef(
        accountId:string,
        accountRefId:string,
        disabled: boolean):Promise<{data: IAccountAccountRef}> {
        return OwnerApi.updateAccountRef(
            accountId,
            accountRefId,
            disabled
        )
    }

    public static createAccountRef(
        accountId:string,
        nameId:string,
        disabled: boolean):Promise<{data: IAccountAccountRef}> {
        return OwnerApi.createAccountRef(
            accountId,
            nameId,
            disabled
        )
    }

    public static deleteAccountRef(accountId:string, accountRefId:string):Promise<{data: IAccountAccountRef}> {
        return OwnerApi.deleteAccountRef(accountId, accountRefId)
    }

    public static updateAccountRefConfig(accountId:string, accountRefId:string, accountConfigId:string, value:string):Promise<{data: IAccountConfig}> {
        return OwnerApi.updateAccountAccountRefAccountConfig(accountId, accountRefId, accountConfigId, value)
    }

    // workspaces
    public static updateWorkspace(accountId:string, workspaceId:string, name:string, description:string, disabled:boolean):Promise<{data: IWorkspace}> {
        return OwnerApi.updateWorkspace(accountId, workspaceId, name, description, disabled)
    }

    public static createWorkspace(accountId:string, name:string, description:string, disabled:boolean):Promise<{data: IWorkspace}> {
        return OwnerApi.createWorkspace(accountId, name, description, disabled)
    }

    public static deleteWorkspace(accountId:string, clientDeviceId:string):Promise<{data: IWorkspace}> {
        return OwnerApi.deleteWorkspace(accountId, clientDeviceId)
    }

    // workspace account refs
    public static getWorkspaceAccountRef(accountId:string, workspaceId:string, accountRefId:string):Promise<{data: IWorkspaceAccountRef & {nameId?:string} | null}> {
        return OwnerApi.getWorkspaceAccountRef(
            accountId,
            workspaceId,
            accountRefId
        )
    }

    public static getWorkspaceAccountRefs( accountId:string, workspaceId:string):Promise<{data: (IWorkspaceAccountRef & {nameId?:string})[]}> {
        return OwnerApi.getWorkspaceAccountRefs(
            accountId,
            workspaceId
        )
    }

    public static updateWorkspaceAccountRef(
        accountId:string,
        workspaceId:string,
        accountRefId:string,
        disabled: boolean):Promise<{data: IWorkspaceAccountRef}> {
        return OwnerApi.updateWorkspaceAccountRef(
            accountId,
            workspaceId,
            accountRefId,
            disabled
        )
    }

    public static createWorkspaceAccountRef(
        accountId:string,
        workspaceId:string,
        nameId:string,
        disabled: boolean):Promise<{data: IWorkspaceAccountRef}> {
        return OwnerApi.createWorkspaceAccountRef(
            accountId,
            workspaceId,
            nameId,
            disabled
        )
    }

    public static deleteWorkspaceAccountRef(accountId:string, workspaceId:string, accountRefId:string):Promise<{data: IWorkspaceAccountRef}> {
        return OwnerApi.deleteWorkspaceAccountRef(accountId, workspaceId, accountRefId)
    }

    public static updateWorkspaceAccountRefAccountConfig(accountId:string, workspaceId:string, accountRefId:string, accountConfigId:string, value:string):Promise<{data: IAccountConfig}> {
        return OwnerApi.updateWorkspaceAccountRefAccountConfig(accountId, workspaceId, accountRefId, accountConfigId, value)
    }
}

export default OwnerService