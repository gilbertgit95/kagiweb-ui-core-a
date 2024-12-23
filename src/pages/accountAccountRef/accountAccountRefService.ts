import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
import { IAccount, IAccountAccountRef } from '../../types/account'

class AccountAccountRefService {
    public static getAccountAccountRefById(account: IAccount, accountRefId:string):IAccountAccountRef|undefined {

        if (account && account.accountRefs) {
            for (const accountRef of account.accountRefs) {
                if (accountRef._id === accountRefId) return accountRef
            }
        }

        return undefined
    }

    public static getAccountAccountRef( accountId:string, accountRefId:string):Promise<{data: IAccountAccountRef & {nameId?:string} | null}> {
        return AccountApi.getAccountAccountRef(
            accountId,
            accountRefId
        )
    }

    public static getAccountAccountRefs( accountId:string):Promise<{data: (IAccountAccountRef & {nameId?:string})[]}> {
        return AccountApi.getAccountAccountRefs(
            accountId
        )
    }

    public static updateAccountAccountRef(
        accountId:string,
        accountRefId:string,
        disabled: boolean):Promise<{data: IAccountAccountRef}> {
        return AccountApi.updateAccountAccountRef(
            accountId,
            accountRefId,
            disabled
        )
    }

    public static createAccountAccountRef(
        accountId:string,
        nameId:string,
        disabled: boolean):Promise<{data: IAccountAccountRef}> {
        return AccountApi.createAccountAccountRef(
            accountId,
            nameId,
            disabled
        )
    }

    public static deleteAccountAccountRef(accountId:string, accountRefId:string):Promise<{data: IAccountAccountRef}> {
        return AccountApi.deleteAccountAccountRef(accountId, accountRefId)
    }
}

export default AccountAccountRefService