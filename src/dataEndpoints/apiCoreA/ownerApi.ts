import apiHelper from './apiHelper';
import { IAccountUpdate, IAccountInfo, IContactInfo, IRoleRef, ILimitedTransaction, IClientDevice, IAccessToken } from '../../types/account';
import appComponentsHandler from '../../utils/appComponentsHandler'

class OwnerApi {
    public static getOwner() {
        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + 'owner'
        })
    }

    public static updateOwner(account:IAccountUpdate) {
        const data:IAccountUpdate = {
            _id: account._id
        }

        if (account.nameId !== undefined) data['nameId'] = account.nameId
        if (account.disabled !== undefined) data['disabled'] = account.disabled
        if (account.verified !== undefined) data['verified'] = account.verified

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static getOwnerCompleteInfo() {
        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + 'owner/completeInfo'
        })
    }

    // account info
    public static updateAccountInfo(accountId:string, accountInfo:IAccountInfo) {
        const data:IAccountInfo = {
            '_id': accountInfo._id,
            'key': accountInfo.key,
            'value': accountInfo.value,
            'type': accountInfo.type
        }

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/accountInfos/${ accountInfo._id }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static createAccountInfo(accountId:string, accountInfo:IAccountInfo) {
        const data:IAccountInfo = {
            'key': accountInfo.key,
            'value': accountInfo.value,
            'type': accountInfo.type
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/accountInfos`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteAccountInfo(accountId:string, accountInfoId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/accountInfos/${ accountInfoId }`
        })
    }

    // account config
    public static updateAccountConfig(accountId:string, accountConfigId:string, value:string) {
        const data:{value:string} = {
            'value': value
        }

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/accountConfigs/${ accountConfigId }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    // contact info
    public static updateContactInfo(accountId:string, contactInfo:IContactInfo) {
        const data:IContactInfo = {
            '_id': contactInfo._id,
            'type': contactInfo.type,
            'value': contactInfo.value
        }

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/contactInfos/${ contactInfo._id }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static createContactInfo(accountId:string, contactInfo:IContactInfo) {
        const data:IContactInfo = {
            'type': contactInfo.type,
            'value': contactInfo.value
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/contactInfos`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteContactInfo(accountId:string, contactInfoId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/contactInfos/${ contactInfoId }`
        })
    }

    // roles
    public static activateAccountRole(accountId:string, roleRefId:string) {
        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/roles/${ roleRefId }/activate`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        })
    }

    public static updateAccountRole(accountId:string, accountRole:{_id: string, isActive?:boolean, roleId?:string}) {
        const data = {
            'roleId': accountRole.roleId,
            'isActive': accountRole.isActive
        }

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/roles/${ accountRole._id }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static createAccountRole(accountId:string, accountRole:IRoleRef) {
        const data:IRoleRef = {
            'roleId': accountRole.roleId
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/roles`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteAccountRole(accountId:string, roleRefId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/roles/${ roleRefId }`
        })
    }

    // limited transaction
    public static updateAccountLT(accountId:string, lt:ILimitedTransaction) {
        const data = {
            'limit': lt.limit,
            'attempts': lt.attempts,
            'key': lt.key,
            'value': lt.value,
            'disabled': lt.disabled,
            // 'type': lt.type,
            // 'recipient': lt.recipient,
        }

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/limitedTransactions/${ lt._id }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    // owner passwords
    public static createAccountPassword(accountId:string, passInfo: {currPassword:string, newPassword:string}) {
        const data:{accountId:string, currentPassword:string, newPassword:string} = {
            'accountId': accountId,
            'newPassword': passInfo.newPassword,
            'currentPassword': passInfo.currPassword
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/passwords`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    // client device
    public static updateClientDevice(accountId:string, clientDevice:{_id?:string, ua?:string, description?:string, disabled?:boolean}) {
        const data:{_id?:string, ua?:string, description?:string, disabled?:boolean} = {
            'ua': clientDevice.ua,
            'description': clientDevice.description,
            'disabled': clientDevice.disabled
        }

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/clientDevices/${ clientDevice._id }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static createClientDevice(accountId:string, clientDevice:IClientDevice) {
        const data:IClientDevice = {
            'ua': clientDevice.ua,
            'description': clientDevice.description,
            'disabled': clientDevice.disabled
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/clientDevices`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteClientDevice(accountId:string, clientDeviceId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/clientDevices/${ clientDeviceId }`
        })
    }

    // client device token
    public static updateClientDeviceToken(accountId:string, clientDeviceId:string, token:{_id?:string, ipAddress?:string, description?:string, disabled?:boolean}) {
        const data:{_id?:string, ipAddress?:string, description?:string, disabled?:boolean} = {
            'description': token.description,
            'ipAddress': token.ipAddress,
            'disabled': token.disabled
        }

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/clientDevices/${ clientDeviceId }/accessTokens/${ token._id }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static createClientDeviceToken(accountId:string, clientDeviceId:string, token:IAccessToken & {expiration:number|undefined}) {
        const data:{_id?:string, ipAddress?:string, description?:string, disabled?:boolean, expiration:number|undefined} = {
            'expiration': token.expiration,
            'description': token.description,
            'ipAddress': token.ipAddress,
            'disabled': token.disabled
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/clientDevices/${ clientDeviceId }/accessTokens`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteClientDeviceToken(accountId:string, clientDeviceId:string, clientDeviceTokenId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/clientDevices/${ clientDeviceId }/accessTokens/${ clientDeviceTokenId }`
        })
    }

    // workspaces
    public static updateWorkspace(accountId:string, workspaceId:string, name:string, description:string, disabled:boolean) {
        const data = {
            'name': name,
            'description': description,
            'disabled': disabled
        }

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/workspaces/${ workspaceId }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static createWorkspace(accountId:string, name:string, description:string, disabled:boolean) {
        const data = {
            'name': name,
            'description': description,
            'disabled': disabled
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/workspaces`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteWorkspace(accountId:string, workspaceId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/workspaces/${ workspaceId }`
        })
    }

    // workspace account references
    public static getWorkspaceAccountRef(accountId:string, workspaceId:string, accountRefId:string) {
        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/workspaces/${ workspaceId }/accountRefs/${accountRefId  }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        })
    }

    public static getWorkspaceAccountRefs(accountId:string, workspaceId:string) {
        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/workspaces/${ workspaceId }/accountRefs`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        })
    }
    
    public static updateWorkspaceAccountRef(
        accountId:string,
        workspaceId:string,
        accountRefId:string,
        readAccess: boolean,
        updateAccess: boolean,
        createAccess: boolean,
        deleteAccess: boolean,
        disabled: boolean) {
        const data = {
            'readAccess': readAccess,
            'updateAccess': updateAccess,
            'createAccess': createAccess,
            'deleteAccess': deleteAccess,
            'disabled': disabled
        }

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/workspaces/${ workspaceId }/accountRefs/${ accountRefId }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static createWorkspaceAccountRef(
        accountId:string,
        workspaceId:string,
        nameId:string,
        readAccess: boolean,
        updateAccess: boolean,
        createAccess: boolean,
        deleteAccess: boolean,
        disabled: boolean) {
        const data = {
            'nameId': nameId,
            'readAccess': readAccess,
            'updateAccess': updateAccess,
            'createAccess': createAccess,
            'deleteAccess': deleteAccess,
            'disabled': disabled
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/workspaces/${ workspaceId }/accountRefs`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteWorkspaceAccountRef(accountId:string, workspaceId:string, accountRefId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/workspaces/${ workspaceId }/accountRefs/${ accountRefId }`
        })
    }
}

export default OwnerApi