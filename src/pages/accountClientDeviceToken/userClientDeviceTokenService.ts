import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
// import { ISignedInUser } from '../../stores/signedInAccountSlice'
import { IAccount, IAccessToken } from '../../types/account'
import UserClientDeviceService from '../accountClientDevice/userClientDeviceService'

class UserClientDeviceTokenService {
    public static getClientDeviceAccessTokenById(user:IAccount, clientDeviceId:string, accessTokenId:string):IAccessToken|undefined {

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

    public static updateClientDeviceToken(accountId:string, clientDeviceId:string, token:{_id?:string, ipAddress?:string, description?:string, disabled?:boolean}):Promise<{data: IAccessToken}> {
        return AccountApi.updateClientDeviceToken(accountId, clientDeviceId, token)
    }

    public static createClientDeviceToken(accountId:string, clientDeviceId:string, token:IAccessToken & {expiration:number|undefined}):Promise<{data: IAccessToken}> {
        return AccountApi.createClientDeviceToken(accountId, clientDeviceId, token)
    }

    public static deleteClientDeviceToken(accountId:string, clientDeviceId:string, clientDeviceTokenId:string):Promise<{data: IAccessToken}> {
        return AccountApi.deleteClientDeviceToken(accountId, clientDeviceId, clientDeviceTokenId)
    }
}

export default UserClientDeviceTokenService