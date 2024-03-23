import apiHelper from "./apiHelper";
import Config from "../../config";
import { IPageQuery } from "../../types/mixTypes";
import { IUser, IUserInfo, IContactInfo, IRoleRef, IUserUpdate, ILimitedTransaction, IClientDevice, IAccessToken } from "../../types/user";

class UserApi {
    public static getUsers(query:IPageQuery = {}) {
        const page =  query.hasOwnProperty('page')? 'page=' + query.page: null
        const pageSize = query.hasOwnProperty('pageSize')? 'pageSize=' + query.pageSize: null

        const queries = [page, pageSize].filter(item => item)
        const strQueries = queries.join('&')

        return apiHelper.privateReq({
            method: 'GET',
            url: Config.ServerAddress + Config.RootApiEndpoint + `users${ queries.length? '?' + strQueries: '' }`
        })
    }

    public static getUser(id:string) {
        return apiHelper.privateReq({
            method: 'GET',
            url: Config.ServerAddress + Config.RootApiEndpoint + `users/${ id }`
        })
    }

    public static updateUser(user:IUserUpdate) {
        const data:IUserUpdate = {
            _id: user._id
        }

        if (user.username !== undefined) data['username'] = user.username
        if (user.disabled !== undefined) data['disabled'] = user.disabled
        if (user.verified !== undefined) data['verified'] = user.verified

        return apiHelper.privateReq({
            method: 'PUT',
            url: Config.ServerAddress + Config.RootApiEndpoint + `users/${ user._id }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static createUser(user:IUser) {
        const data = {
            'username': user.username,
            'disabled': user.disabled,
            'verified': user.verified
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: Config.ServerAddress + Config.RootApiEndpoint + `users`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteUser(id:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: Config.ServerAddress + Config.RootApiEndpoint + `users/${ id }`
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
            url: Config.ServerAddress + Config.RootApiEndpoint + `users/${ userId }/userInfos/${ userInfo._id }`,
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
            url: Config.ServerAddress + Config.RootApiEndpoint + `users/${ userId }/userInfos`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteUserInfo(userId:string, userInfoId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: Config.ServerAddress + Config.RootApiEndpoint + `users/${ userId }/userInfos/${ userInfoId }`
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
            url: Config.ServerAddress + Config.RootApiEndpoint + `users/${ userId }/contactInfos/${ contactInfo._id }`,
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
            url: Config.ServerAddress + Config.RootApiEndpoint + `users/${ userId }/contactInfos`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteContactInfo(userId:string, contactInfoId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: Config.ServerAddress + Config.RootApiEndpoint + `users/${ userId }/contactInfos/${ contactInfoId }`
        })
    }

    // user roles
    public static updateUserRole(userId:string, userRole:{_id: string, isActive?:boolean, roleId?:string}) {
        const data = {
            'roleId': userRole.roleId,
            'isActive': userRole.isActive
        }

        return apiHelper.privateReq({
            method: 'PUT',
            url: Config.ServerAddress + Config.RootApiEndpoint + `users/${ userId }/roles/${ userRole._id }`,
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
            url: Config.ServerAddress + Config.RootApiEndpoint + `users/${ userId }/roles`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteUserRole(userId:string, roleRefId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: Config.ServerAddress + Config.RootApiEndpoint + `users/${ userId }/roles/${ roleRefId }`
        })
    }

    // limited transaction
    public static updateUserLT(userId:string, lt:ILimitedTransaction) {
        const data = {
            'limit': lt.limit,
            'attempts': lt.attempts,
            'key': lt.key,
            'value': lt.value,
            'expTime': lt.expTime,
            'disabled': lt.disabled,
            // 'type': lt.type,
            // 'recipient': lt.recipient,
        }

        return apiHelper.privateReq({
            method: 'PUT',
            url: Config.ServerAddress + Config.RootApiEndpoint + `users/${ userId }/limitedTransactions/${ lt._id }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    // client device
    public static updateClientDevice(userId:string, clientDevice:{_id?:string, ua?:string, disabled?:boolean}) {
        const data:{_id?:string, ua?:string, disabled?:boolean} = {
            'ua': clientDevice.ua,
            'disabled': clientDevice.disabled
        }

        return apiHelper.privateReq({
            method: 'PUT',
            url: Config.ServerAddress + Config.RootApiEndpoint + `users/${ userId }/clientDevices/${ clientDevice._id }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static createClientDevice(userId:string, clientDevice:IClientDevice) {
        const data:IClientDevice = {
            'ua': clientDevice.ua,
            'disabled': clientDevice.disabled
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: Config.ServerAddress + Config.RootApiEndpoint + `users/${ userId }/clientDevices`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteClientDevice(userId:string, clientDeviceId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: Config.ServerAddress + Config.RootApiEndpoint + `users/${ userId }/clientDevices/${ clientDeviceId }`
        })
    }

    // client device token
    public static updateClientDeviceToken(userId:string, clientDeviceId:string, token:{_id?:string, ipAddress?:string, jwt?:string, disabled?:boolean}) {
        const data:{_id?:string, ipAddress?:string, jwt?:string, disabled?:boolean} = {
            'jwt': token.jwt,
            'ipAddress': token.ipAddress,
            'disabled': token.disabled
        }

        return apiHelper.privateReq({
            method: 'PUT',
            url: Config.ServerAddress + Config.RootApiEndpoint + `users/${ userId }/clientDevices/${ clientDeviceId }/accessTokens/${ token._id }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static createClientDeviceToken(userId:string, clientDeviceId:string, token:IAccessToken) {
        const data:IAccessToken = {
            'jwt': token.jwt,
            'ipAddress': token.ipAddress,
            'disabled': token.disabled
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: Config.ServerAddress + Config.RootApiEndpoint + `users/${ userId }/clientDevices/${ clientDeviceId }/accessTokens`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteClientDeviceToken(userId:string, clientDeviceId:string, clientDeviceTokenId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: Config.ServerAddress + Config.RootApiEndpoint + `users/${ userId }/clientDevices/${ clientDeviceId }/accessTokens/${ clientDeviceTokenId }`
        })
    }

    // user password
    public static createUserPassword(userId:string, passInfo: {currPassword:string, newPassword:string}) {
        const data:{userId:string, currentPassword:string, newPassword:string} = {
            'userId': userId,
            'newPassword': passInfo.newPassword,
            'currentPassword': passInfo.currPassword
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: Config.ServerAddress + Config.RootApiEndpoint + `users/${ userId }/passwords`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteUserPassword(userId:string, passwordId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: Config.ServerAddress + Config.RootApiEndpoint + `users/${ userId }/passwords/${ passwordId }`
        })
    }
}

export default UserApi