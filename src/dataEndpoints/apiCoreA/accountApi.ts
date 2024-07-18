import apiHelper from "./apiHelper";
import { IPageQuery } from "../../types/mixTypes";
import { IAccount, IAccountInfo, IContactInfo, IRoleRef, IAccountUpdate, ILimitedTransaction, IClientDevice, IAccessToken } from "../../types/account";
import appComponentsHandler from '../../utils/appComponentsHandler'

class AccountApi {
    public static getAccounts(query:IPageQuery = {}) {
        const page =  query.hasOwnProperty('page')? 'page=' + query.page: null
        const pageSize = query.hasOwnProperty('pageSize')? 'pageSize=' + query.pageSize: null

        const queries = [page, pageSize].filter(item => item)
        const strQueries = queries.join('&')

        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users${ queries.length? '?' + strQueries: '' }`
        })
    }

    public static getAccount(id:string) {
        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ id }`
        })
    }

    public static updateAccount(account:IAccountUpdate) {
        const data:IAccountUpdate = {
            _id: account._id
        }

        if (account.username !== undefined) data['username'] = account.username
        if (account.disabled !== undefined) data['disabled'] = account.disabled
        if (account.verified !== undefined) data['verified'] = account.verified

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ account._id }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static createAccount(account:IAccount) {
        const data = {
            'username': account.username,
            'disabled': account.disabled,
            'verified': account.verified
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteAccount(id:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ id }`
        })
    }


    // user info
    public static updateAccountInfo(accountId:string, accountInfo:IAccountInfo) {
        const data:IAccountInfo = {
            '_id': accountInfo._id,
            'key': accountInfo.key,
            'value': accountInfo.value,
            'type': accountInfo.type
        }

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/userInfos/${ accountInfo._id }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static createAccountInfo(accountInfo:string, userInfo:IAccountInfo) {
        const data:IAccountInfo = {
            'key': userInfo.key,
            'value': userInfo.value,
            'type': userInfo.type
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountInfo }/userInfos`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteAccountInfo(accountId:string, accountInfoId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/userInfos/${ accountInfoId }`
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
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/contactInfos/${ contactInfo._id }`,
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
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/contactInfos`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteContactInfo(accountId:string, contactInfoId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/contactInfos/${ contactInfoId }`
        })
    }

    // user roles
    public static activateAccountRole(accountId:string, roleRefId:string) {
        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/roles/${ roleRefId }/activate`,
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
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/roles/${ accountRole._id }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static createAccountRole(accountId:string, accountRole:IRoleRef) {
        const data:IRoleRef = {
            'roleId': accountRole.roleId,
            'isActive': accountRole.isActive
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/roles`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteAccountRole(accountId:string, roleRefId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/roles/${ roleRefId }`
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
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/limitedTransactions/${ lt._id }`,
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
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/clientDevices/${ clientDevice._id }`,
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
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/clientDevices`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteClientDevice(accountId:string, clientDeviceId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/clientDevices/${ clientDeviceId }`
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
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/clientDevices/${ clientDeviceId }/accessTokens/${ token._id }`,
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
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/clientDevices/${ clientDeviceId }/accessTokens`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteClientDeviceToken(accountId:string, clientDeviceId:string, clientDeviceTokenId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/clientDevices/${ clientDeviceId }/accessTokens/${ clientDeviceTokenId }`
        })
    }

    // user password
    public static createAccountPassword(accountId:string, passInfo: {currPassword:string, newPassword:string}) {
        const data:{accountId:string, currentPassword:string, newPassword:string} = {
            'accountId': accountId,
            'newPassword': passInfo.newPassword,
            'currentPassword': passInfo.currPassword
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/passwords`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteAccountPassword(accountId:string, passwordId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/passwords/${ passwordId }`
        })
    }


    // workspaces
    public static updateWorkspace(accountId:string, workspaceId:string, name:string, description:string, isActive:boolean, disabled:boolean) {
        const data = {
            'name': name,
            'description': description,
            'isActive': isActive,
            'disabled': disabled
        }

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/workspaces/${ workspaceId }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static createWorkspace(accountId:string, name:string, description:string, isActive:boolean, disabled:boolean) {
        const data = {
            'name': name,
            'description': description,
            'isActive': isActive,
            'disabled': disabled
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/workspaces`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteWorkspace(accountId:string, workspaceId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/workspaces/${ workspaceId }`
        })
    }

    // workspace user references
    public static getWorkspaceAccountRef(accountId:string, workspaceId:string, accountRefId:string) {
        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/workspaces/${ workspaceId }/userRefs/${accountRefId  }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        })
    }

    public static getWorkspaceAccountRefs(accountId:string, workspaceId:string) {
        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/workspaces/${ workspaceId }/userRefs`,
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
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/workspaces/${ workspaceId }/userRefs/${ accountRefId }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static createWorkspaceAccountRef(
        accountId:string,
        workspaceId:string,
        username:string,
        readAccess: boolean,
        updateAccess: boolean,
        createAccess: boolean,
        deleteAccess: boolean,
        disabled: boolean) {
        const data = {
            'username': username,
            'readAccess': readAccess,
            'updateAccess': updateAccess,
            'createAccess': createAccess,
            'deleteAccess': deleteAccess,
            'disabled': disabled
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/workspaces/${ workspaceId }/userRefs`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteWorkspaceAccountRef(accountId:string, workspaceId:string, accountRefId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `users/${ accountId }/workspaces/${ workspaceId }/userRefs/${ accountRefId }`
        })
    }
}

export default AccountApi