import ActionApi from '../../dataEndpoints/apiCoreA/actionApi'
import { IRoleRef } from '../../types/account'

class ActionService {
    public static getAccountActionInfo(accountId:string, AccountRole:{_id: string, isActive?:boolean, roleId?:string}):Promise<{data: any}> {
        return ActionApi.getAccountActionInfo(accountId, AccountRole)
    }

    public static getOwnerActionInfo(accountId:string, roleRefId:string):Promise<{data: IRoleRef}> {
        return ActionApi.getOwnerActionInfo(accountId, {roleId: roleRefId})
    }

    public static getAccountWorkspaceActionInfo(accountId:string, AccountRoleId:string):Promise<{data: IRoleRef}> {
        return ActionApi.getAccountWorkspaceActionInfo(accountId, AccountRoleId)
    }

    public static getOwnerWorkspaceActionInfo(accountId:string, AccountRoleId:string):Promise<{data: IRoleRef}> {
        return ActionApi.getOwnerWorkspaceActionInfo(accountId, AccountRoleId)
    }
}

export default ActionService