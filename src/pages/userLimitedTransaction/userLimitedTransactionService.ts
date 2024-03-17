import userApi from '../../dataEndpoints/apiCoreA/userApi'
// import { ISignedInUser } from '../../stores/signedInUserSlice'
import { IUser, ILimitedTransaction } from '../../types/user'
// import { IFeatureRef } from '../../types/role'
// import { IPagination, IPageQuery } from '../../types/mixTypes'

class UserLimitedTransactionService {
    public static getLimitedTransactionById(user:IUser, limitedTransactionId:string):ILimitedTransaction|undefined {

        if (user && user.limitedTransactions) {
            for (const lt of user.limitedTransactions) {
                if (lt._id === limitedTransactionId) return lt
            }
        }

        return undefined
    }
    // public static getRoleFeatures(roleId:string|undefined):Promise<{data: IFeatureRef[]}> {
    //     return userApi.getRoleFeatures(roleId)
    // }

    // public static getFeature(id:string):Promise<{data: IFeatureRef}> {
    //     return userApi.getFeature(id)
    // }

    public static updateLT(userId:string, lt:ILimitedTransaction):Promise<{data: ILimitedTransaction}> {
        return userApi.updateUserLT(userId, lt)
    }

    // public static createRoleFeature(roleId:string, featureId:string):Promise<{data: IFeatureRef}> {
    //     return userApi.createRoleFeature(roleId, featureId)
    // }

    // public static deleteRoleFeature(roleId:string, featureRefId:string):Promise<{data: IFeatureRef}> {
    //     return userApi.deleteRoleFeature(roleId, featureRefId)
    // }
}

export default UserLimitedTransactionService