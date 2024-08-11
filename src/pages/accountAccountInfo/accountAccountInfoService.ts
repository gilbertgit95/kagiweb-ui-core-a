import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
import { IAccount, IAccountInfo } from '../../types/account'

class AccountAccountInfoService {
    public static getAccountInfoById(account:IAccount, accountInfoId:string):IAccountInfo|undefined {

        if (account && account.accountInfos) {
            for (const info of account.accountInfos) {
                if (info._id === accountInfoId) return info
            }
        }

        return undefined
    }

    public static updateAccountInfo(accountId:string, accountInfo:IAccountInfo):Promise<{data: IAccountInfo}> {
        return AccountApi.updateAccountInfo(accountId, accountInfo)
    }

    public static createAccountInfo(accountId:string, accountInfo:IAccountInfo):Promise<{data: IAccountInfo}> {
        return AccountApi.createAccountInfo(accountId, accountInfo)
    }

    public static deleteAccountInfo(accountId:string, accountInfoId:string):Promise<{data: IAccountInfo}> {
        return AccountApi.deleteAccountInfo(accountId, accountInfoId)
    }
}

export default AccountAccountInfoService