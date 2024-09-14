import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
import { IAccount, IAccessToken } from '../../types/account'
import AccountClientDeviceService from '../accountClientDevice/accountClientDeviceService'

class AccountClientDeviceTokenService {
    public static getClientDeviceAccessTokenById(account:IAccount, clientDeviceId:string, accessTokenId:string):IAccessToken|undefined {

        const clientDevice = AccountClientDeviceService.getClientDeviceById(account, clientDeviceId)
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

export default AccountClientDeviceTokenService