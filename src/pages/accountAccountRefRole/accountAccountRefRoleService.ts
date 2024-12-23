import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
import { IRoleRef } from '../../types/account'

class AccountAccountRefRoleService {
    public static updateAccountAccountRefRole(accountId:string, accountRefId:string, AccountRole:{_id: string, isActive?:boolean, roleId?:string}):Promise<{data: IRoleRef}> {
        return AccountApi.updateAccountAccountRefRole(accountId, accountRefId, AccountRole)
    }

    public static createAccountAccountRefRole(accountId:string, accountRefId:string, roleRefId:string):Promise<{data: IRoleRef}> {
        return AccountApi.createAccountAccountRefRole(accountId, accountRefId, {roleId: roleRefId})
    }

    public static deleteAccountAccountRefRole(accountId:string, accountRefId:string, AccountRoleId:string):Promise<{data: IRoleRef}> {
        return AccountApi.deleteAccountAccountRefRole(accountId, accountRefId, AccountRoleId)
    }
}

export default AccountAccountRefRoleService