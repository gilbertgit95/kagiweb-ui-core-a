import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
// import { ISignedInUser } from '../../stores/signedInAccountSlice'
import { IAccount, IRoleRef } from '../../types/account'
// import { IFeatureRef } from '../../types/role'
// import { IPagination, IPageQuery } from '../../types/mixTypes'

class AccountRoleService {
    public static getActiveRoleRef(account: IAccount):IRoleRef|undefined {
        if (account && account.rolesRefs) {
            for (const ref of account.rolesRefs) {
                if (ref.isActive) return ref
            }
        }

        return
    }

    // public static getAccountRoles(roleId:string|undefined):Promise<{data: IRoleRef[]}> {
    //     return AccountApi.getAccountRoles(roleId)
    // }

    // public static getAccountRole(id:string):Promise<{data: IRoleRef}> {
    //     return AccountApi.getFeature(id)
    // }

    public static activateAccountRole(accountId:string, roleRefId:string):Promise<{data: IRoleRef}> {
        return AccountApi.activateAccountRole(accountId, roleRefId)
    }

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