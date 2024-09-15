import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
import { IAccount, ILimitedTransaction } from '../../types/account'

class AccountLimitedTransactionService {
    public static getLimitedTransactionById(account: IAccount, limitedTransactionId:string):ILimitedTransaction|undefined {

        if (account && account.limitedTransactions) {
            for (const lt of account.limitedTransactions) {
                if (lt._id === limitedTransactionId) return lt
            }
        }

        return undefined
    }

    public static updateLT(accountId:string, lt:ILimitedTransaction):Promise<{data: ILimitedTransaction}> {
        return AccountApi.updateAccountLT(accountId, lt)
    }
}

export default AccountLimitedTransactionService