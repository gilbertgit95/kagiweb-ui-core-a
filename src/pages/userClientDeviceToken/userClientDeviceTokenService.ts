import userApi from '../../dataEndpoints/apiCoreA/userApi'
// import { ISignedInUser } from '../../stores/signedInUserSlice'
import { IUser, IAccessToken } from '../../types/user'
import { IFeatureRef } from '../../types/role'
import { IPagination, IPageQuery } from '../../types/mixTypes'
import UserClientDeviceService from '../userClientDevice/userClientDeviceService'

class UserClientDeviceTokenService {
    public static getClientDeviceAccessTokenById(user:IUser, clientDeviceId:string, accessTokenId:string):IAccessToken|undefined {

        const clientDevice = UserClientDeviceService.getClientDeviceById(user, clientDeviceId)
        // check client devices if existed
        if (clientDevice && clientDevice.accessTokens) {
            // then loop to all access token of the client device
            for (const accessToken of clientDevice.accessTokens) {
                // if the jwt we are looking matches with an entry
                // in the client device access tokens, just return true
                if (accessToken._id === accessTokenId) return accessToken
            }
        }

        return undefined
    }

    // public static getRoleFeatures(roleId:string|undefined):Promise<{data: IFeatureRef[]}> {
    //     return featureApi.getRoleFeatures(roleId)
    // }

    // public static getFeature(id:string):Promise<{data: IFeatureRef}> {
    //     return featureApi.getFeature(id)
    // }

    public static updateClientDeviceToken(userId:string, clientDeviceId:string, token:IAccessToken):Promise<{data: IAccessToken}> {
        return userApi.updateClientDeviceToken(userId, clientDeviceId, token)
    }

    public static createClientDeviceToken(userId:string, clientDeviceId:string, token:IAccessToken):Promise<{data: IAccessToken}> {
        return userApi.createClientDeviceToken(userId, clientDeviceId, token)
    }

    public static deleteClientDeviceToken(userId:string, clientDeviceId:string, clientDeviceTokenId:string):Promise<{data: IAccessToken}> {
        return userApi.deleteClientDeviceToken(userId, clientDeviceId, clientDeviceTokenId)
    }
}

export default UserClientDeviceTokenService