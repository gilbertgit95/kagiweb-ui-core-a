import AccountApi from "../../dataEndpoints/apiCoreA/accountApi"
import { IAccessInfo } from "../../stores/signedInAccountSlice"
import { IAccount, IAccountInfo, IContactInfo,TContactInfoType, IAccountUpdate } from "../../types/account"
import { IPagination, IPageQuery } from "../../types/mixTypes"

class AccountService {
    public static getAccounts(query:IPageQuery):Promise<{data: IPagination<IAccount>}> {
        return AccountApi.getAccounts(query)
    }

    public static getAccountInfo(account:IAccount, key:string):IAccountInfo|undefined {
        for (const info of account?.accountInfos || []) {
            if (info.key === key) return info
        }

        return undefined
    }

    public static getAccountCompleteInfo(id:string):Promise<{data: IAccessInfo}> {
        return AccountApi.getAccountCompleteInfo(id)
    }

    public static getContactInfo(account:IAccount, type:TContactInfoType):IContactInfo|undefined {
        for (const info of account?.contactInfos || []) {
            if (info.type === type) return info
        }

        return undefined
    }

    public static getAccount(id:string):Promise<{data: IAccount}> {
        return AccountApi.getAccount(id)
    }

    public static updateAccount(account:IAccountUpdate):Promise<{data: IAccount}> {
        return AccountApi.updateAccount(account)
    }

    public static createAccount(account:IAccount):Promise<{data: IAccount}> {
        return AccountApi.createAccount(account)
    }

    public static deleteAccount(id:string):Promise<{data: IAccount}> {
        return AccountApi.deleteAccount(id)
    }
}

export default AccountService