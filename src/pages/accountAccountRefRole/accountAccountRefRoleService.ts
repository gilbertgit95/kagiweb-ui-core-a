import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
import { IRoleRef } from '../../types/account'

class AccountAccountRefRoleService {
    public static updateAccountAccountRefRole(accountId:string, workspaceId:string, accountRefId:string, AccountRole:{_id: string, isActive?:boolean, roleId?:string}):Promise<{data: IRoleRef}> {
        return AccountApi.updateAccountAccountRefRole(accountId, workspaceId, accountRefId, AccountRole)
    }

    public static createAccountAccountRefRole(accountId:string, workspaceId:string, accountRefId:string, roleRefId:string):Promise<{data: IRoleRef}> {
        return AccountApi.createAccountAccountRefRole(accountId, workspaceId, accountRefId, {roleId: roleRefId})
    }

    public static deleteAccountAccountRefRole(accountId:string, workspaceId:string, accountRefId:string, AccountRoleId:string):Promise<{data: IRoleRef}> {
        return AccountApi.deleteAccountAccountRefRole(accountId, workspaceId, accountRefId, AccountRoleId)
    }
}

export default AccountAccountRefRoleService