import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
import { IRoleRef } from '../../types/account'

class AccountWorkspaceAccountRefRoleService {
    public static updateAccountWorkspaceAccountRefRole(accountId:string, workspaceId:string, accountRefId:string, AccountRole:{_id: string, isActive?:boolean, roleId?:string}):Promise<{data: IRoleRef}> {
        return AccountApi.updateAccountWorkspaceAccountRefRole(accountId, workspaceId, accountRefId, AccountRole)
    }

    public static createAccountWorkspaceAccountRefRole(accountId:string, workspaceId:string, accountRefId:string, roleRefId:string):Promise<{data: IRoleRef}> {
        return AccountApi.createAccountWorkspaceAccountRefRole(accountId, workspaceId, accountRefId, {roleId: roleRefId})
    }

    public static deleteAccountWorkspaceAccountRefRole(accountId:string, workspaceId:string, accountRefId:string, AccountRoleId:string):Promise<{data: IRoleRef}> {
        return AccountApi.deleteAccountWorkspaceAccountRefRole(accountId, workspaceId, accountRefId, AccountRoleId)
    }
}

export default AccountWorkspaceAccountRefRoleService