import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
import { IPassword } from '../../types/account'

class AccountPasswordService {

    public static createPassword(accountId:string, passInfo:{currPassword:string, newPassword:string}):Promise<{data: IPassword}> {
        return AccountApi.createAccountPassword(accountId, passInfo)
    }

    public static deletePassword(accountId:string, passwordId:string):Promise<{data: IPassword}> {
        return AccountApi.deleteAccountPassword(accountId, passwordId)
    }
}

export default AccountPasswordService