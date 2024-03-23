import apiHelper from './apiHelper';
import Config from '../../config';
import { IUserUpdate, IUserInfo } from '../../types/user';

class OwnerApi {
    public static getOwner() {
        return apiHelper.privateReq({
            method: 'GET',
            url: Config.ServerAddress + Config.RootApiEndpoint + 'owner'
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
            url: Config.ServerAddress + Config.RootApiEndpoint + `owner`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static getOwnerCompleteInfo() {
        return apiHelper.privateReq({
            method: 'GET',
            url: Config.ServerAddress + Config.RootApiEndpoint + 'owner/completeInfo'
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
            url: Config.ServerAddress + Config.RootApiEndpoint + `owner/userInfos/${ userInfo._id }`,
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
            url: Config.ServerAddress + Config.RootApiEndpoint + `owner/userInfos`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteUserInfo(userId:string, userInfoId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: Config.ServerAddress + Config.RootApiEndpoint + `owner/userInfos/${ userInfoId }`
        })
    }
}

export default OwnerApi