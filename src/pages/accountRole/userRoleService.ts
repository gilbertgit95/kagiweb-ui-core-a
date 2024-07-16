import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
// import { ISignedInUser } from '../../stores/signedInUserSlice'
import { IAccount, IRoleRef } from '../../types/account'
// import { IFeatureRef } from '../../types/role'
// import { IPagination, IPageQuery } from '../../types/mixTypes'

class UserRoleService {
    public static getActiveRoleRef(user:IAccount):IRoleRef|undefined {
        if (user && user.rolesRefs) {
            for (const ref of user.rolesRefs) {
                if (ref.isActive) return ref
            }
        }

        return
    }

    // public static getUserRoles(roleId:string|undefined):Promise<{data: IRoleRef[]}> {
    //     return AccountApi.getUserRoles(roleId)
    // }

    // public static getUserRole(id:string):Promise<{data: IRoleRef}> {
    //     return AccountApi.getFeature(id)
    // }

    public static activateUserRole(userId:string, roleRefId:string):Promise<{data: IRoleRef}> {
        return AccountApi.activateUserRole(userId, roleRefId)
    }

    public static updateUserRole(userId:string, UserRole:{_id: string, isActive?:boolean, roleId?:string}):Promise<{data: IRoleRef}> {
        return AccountApi.updateUserRole(userId, UserRole)
    }

    public static createUserRole(userId:string, roleRefId:string):Promise<{data: IRoleRef}> {
        return AccountApi.createUserRole(userId, {roleId: roleRefId})
    }

    public static deleteUserRole(userId:string, UserRoleId:string):Promise<{data: IRoleRef}> {
        return AccountApi.deleteUserRole(userId, UserRoleId)
    }
}

export default UserRoleService