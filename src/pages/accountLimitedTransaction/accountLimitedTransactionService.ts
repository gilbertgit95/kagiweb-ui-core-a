import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
// import { ISignedInUser } from '../../stores/signedInAccountSlice'
import { IAccount, ILimitedTransaction } from '../../types/account'
// import { IFeatureRef } from '../../types/role'
// import { IPagination, IPageQuery } from '../../types/mixTypes'

class AccountLimitedTransactionService {
    public static getLimitedTransactionById(account: IAccount, limitedTransactionId:string):ILimitedTransaction|undefined {

        if (account && account.limitedTransactions) {
            for (const lt of account.limitedTransactions) {
                if (lt._id === limitedTransactionId) return lt
            }
        }

        return undefined
    }
    // public static getRoleFeatures(roleId:string|undefined):Promise<{data: IFeatureRef[]}> {
    //     return AccountApi.getRoleFeatures(roleId)
    // }

    // public static getFeature(id:string):Promise<{data: IFeatureRef}> {
    //     return AccountApi.getFeature(id)
    // }

    public static updateLT(accountId:string, lt:ILimitedTransaction):Promise<{data: ILimitedTransaction}> {
        return AccountApi.updateAccountLT(accountId, lt)
    }

    // public static createRoleFeature(roleId:string, featureId:string):Promise<{data: IFeatureRef}> {
    //     return AccountApi.createRoleFeature(roleId, featureId)
    // }

    // public static deleteRoleFeature(roleId:string, featureRefId:string):Promise<{data: IFeatureRef}> {
    //     return AccountApi.deleteRoleFeature(roleId, featureRefId)
    // }
}

export default AccountLimitedTransactionService