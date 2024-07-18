import AccountApi from "../../dataEndpoints/apiCoreA/accountApi"
// import { ISignedInUser } from "../../stores/signedInUserSlice"
import { IAccount, IAccountInfo, IContactInfo,TContactInfoType, IAccountUpdate } from "../../types/account"
import { IPagination, IPageQuery } from "../../types/mixTypes"

class AccountService {
    public static getAccounts(query:IPageQuery):Promise<{data: IPagination<IAccount>}> {
        return AccountApi.getAccounts(query)
    }

    public static getAccountInfo(account:IAccount, key:string):IAccountInfo|undefined {
        for (const info of account?.userInfos || []) {
            if (info.key === key) return info
        }

        return undefined
    }

    public static getContactInfo(user:IAccount, type:TContactInfoType):IContactInfo|undefined {
        for (const info of user?.contactInfos || []) {
            if (info.type === type) return info
        }

        return undefined
    }

    public static getAccount(id:string):Promise<{data: IAccount}> {
        return AccountApi.getAccount(id)
    }

    public static updateAccount(user:IAccountUpdate):Promise<{data: IAccount}> {
        return AccountApi.updateAccount(user)
    }

    public static createAccount(user:IAccount):Promise<{data: IAccount}> {
        return AccountApi.createAccount(user)
    }

    public static deleteAccount(id:string):Promise<{data: IAccount}> {
        return AccountApi.deleteAccount(id)
    }
}

export default AccountService