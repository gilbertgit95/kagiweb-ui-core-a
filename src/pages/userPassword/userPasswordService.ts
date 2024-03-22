import userApi from '../../dataEndpoints/apiCoreA/userApi'
// import { ISignedInUser } from '../../stores/signedInUserSlice'
import { IPassword } from '../../types/user'

class UserPasswordService {
    // public static getRoleFeatures(roleId:string|undefined):Promise<{data: IPassword[]}> {
    //     return featureApi.getRoleFeatures(roleId)
    // }

    // public static getFeature(id:string):Promise<{data: IPassword}> {
    //     return featureApi.getFeature(id)
    // }

    // public static updateFeature(feature:IPassword):Promise<{data: IPassword}> {
    //     return featureApi.updateFeature(feature)
    // }

    public static createPassword(userId:string, passInfo:{currPassword:string, newPassword:string}):Promise<{data: IPassword}> {
        return userApi.createUserPassword(userId, passInfo)
    }

    public static deletePassword(userId:string, passwordId:string):Promise<{data: IPassword}> {
        return userApi.deleteUserPassword(userId, passwordId)
    }
}

export default UserPasswordService