import apiHelper from './apiHelper';
import { IUserUpdate, IUserInfo, IContactInfo, IRoleRef, ILimitedTransaction, IClientDevice, IAccessToken } from '../../types/account';
import appComponentsHandler from '../../utils/appComponentsHandler'

class OwnerApi {
    public static getOwner() {
        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + 'owner'
        })
    }

    public static updateOwner(user:IUserUpdate) {
        const data:IUserUpdate = {
            _id: user._id
        }

        if (user.username !== undefined) data['username'] = user.username
        if (user.disabled !== undefined) data['disabled'] = user.disabled
        if (user.verified !== undefined) data['verified'] = user.verified

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

    // user info
    public static updateUserInfo(userId:string, userInfo:IUserInfo) {
        const data:IUserInfo = {
            '_id': userInfo._id,
            'key': userInfo.key,
            'value': userInfo.value,
            'type': userInfo.type
        }

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/userInfos/${ userInfo._id }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static createUserInfo(userId:string, userInfo:IUserInfo) {
        const data:IUserInfo = {
            'key': userInfo.key,
            'value': userInfo.value,
            'type': userInfo.type
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/userInfos`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteUserInfo(userId:string, userInfoId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/userInfos/${ userInfoId }`
        })
    }

    // contact info
    public static updateContactInfo(userId:string, contactInfo:IContactInfo) {
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

    public static createContactInfo(userId:string, contactInfo:IContactInfo) {
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

    public static deleteContactInfo(userId:string, contactInfoId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/contactInfos/${ contactInfoId }`
        })
    }

    // roles
    public static activateUserRole(userId:string, roleRefId:string) {
        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/roles/${ roleRefId }/activate`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        })
    }

    public static updateUserRole(userId:string, userRole:{_id: string, isActive?:boolean, roleId?:string}) {
        const data = {
            'roleId': userRole.roleId,
            'isActive': userRole.isActive
        }

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/roles/${ userRole._id }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static createUserRole(userId:string, userRole:IRoleRef) {
        const data:IRoleRef = {
            'roleId': userRole.roleId,
            'isActive': userRole.isActive
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/roles`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteUserRole(userId:string, roleRefId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/roles/${ roleRefId }`
        })
    }

    // limited transaction
    public static updateUserLT(userId:string, lt:ILimitedTransaction) {
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
    public static createUserPassword(userId:string, passInfo: {currPassword:string, newPassword:string}) {
        const data:{userId:string, currentPassword:string, newPassword:string} = {
            'userId': userId,
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
    public static updateClientDevice(userId:string, clientDevice:{_id?:string, ua?:string, description?:string, disabled?:boolean}) {
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

    public static createClientDevice(userId:string, clientDevice:IClientDevice) {
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

    public static deleteClientDevice(userId:string, clientDeviceId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/clientDevices/${ clientDeviceId }`
        })
    }

    // client device token
    public static updateClientDeviceToken(userId:string, clientDeviceId:string, token:{_id?:string, ipAddress?:string, description?:string, disabled?:boolean}) {
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

    public static createClientDeviceToken(userId:string, clientDeviceId:string, token:IAccessToken & {expiration:number|undefined}) {
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

    public static deleteClientDeviceToken(userId:string, clientDeviceId:string, clientDeviceTokenId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/clientDevices/${ clientDeviceId }/accessTokens/${ clientDeviceTokenId }`
        })
    }

    // workspaces
    public static updateWorkspace(userId:string, workspaceId:string, name:string, description:string, isActive:boolean, disabled:boolean) {
        const data = {
            'name': name,
            'description': description,
            'isActive': isActive,
            'disabled': disabled
        }

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/workspaces/${ workspaceId }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static createWorkspace(userId:string, name:string, description:string, isActive:boolean, disabled:boolean) {
        const data = {
            'name': name,
            'description': description,
            'isActive': isActive,
            'disabled': disabled
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/workspaces`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteWorkspace(userId:string, workspaceId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/workspaces/${ workspaceId }`
        })
    }

    // workspace user references
    public static getWorkspaceUserRef(userId:string, workspaceId:string, userRefId:string) {
        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/workspaces/${ workspaceId }/userRefs/${userRefId  }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        })
    }

    public static getWorkspaceUserRefs(userId:string, workspaceId:string) {
        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/workspaces/${ workspaceId }/userRefs`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        })
    }
    
    public static updateWorkspaceUserRef(
        userId:string,
        workspaceId:string,
        userRefId:string,
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
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/workspaces/${ workspaceId }/userRefs/${ userRefId }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static createWorkspaceUserRef(
        userId:string,
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
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/workspaces/${ workspaceId }/userRefs`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteWorkspaceUserRef(userId:string, workspaceId:string, userRefId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/workspaces/${ workspaceId }/userRefs/${ userRefId }`
        })
    }
}

export default OwnerApi