import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
import { IRoleRef } from '../../types/account'

class AccountRoleService {
    public static updateAccountRole(accountId:string, AccountRole:{_id: string, isActive?:boolean, roleId?:string}):Promise<{data: IRoleRef}> {
        return AccountApi.updateAccountRole(accountId, AccountRole)
    }

    public static createAccountRole(accountId:string, roleRefId:string):Promise<{data: IRoleRef}> {
        return AccountApi.createAccountRole(accountId, {roleId: roleRefId})
    }

    public static deleteAccountRole(accountId:string, AccountRoleId:string):Promise<{data: IRoleRef}> {
        return AccountApi.deleteAccountRole(accountId, AccountRoleId)
    }
}

export default AccountRoleService