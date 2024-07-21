import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
// import { ISignedInUser } from '../../stores/signedInAccountSlice'
import { IPassword } from '../../types/account'

class AccountPasswordService {
    // public static getRoleFeatures(roleId:string|undefined):Promise<{data: IPassword[]}> {
    //     return featureApi.getRoleFeatures(roleId)
    // }

    // public static getFeature(id:string):Promise<{data: IPassword}> {
    //     return featureApi.getFeature(id)
    // }

    // public static updateFeature(feature:IPassword):Promise<{data: IPassword}> {
    //     return featureApi.updateFeature(feature)
    // }

    public static createPassword(accountId:string, passInfo:{currPassword:string, newPassword:string}):Promise<{data: IPassword}> {
        return AccountApi.createAccountPassword(accountId, passInfo)
    }

    public static deletePassword(accountId:string, passwordId:string):Promise<{data: IPassword}> {
        return AccountApi.deleteAccountPassword(accountId, passwordId)
    }
}

export default AccountPasswordService