import userApi from '../../dataEndpoints/apiCoreA/userApi'
// import { ISignedInUser } from '../../stores/signedInUserSlice'
import { IUser, IRoleRef } from '../../types/user'
// import { IFeatureRef } from '../../types/role'
// import { IPagination, IPageQuery } from '../../types/mixTypes'

class UserRoleService {
    public static getActiveRoleRef(user:IUser):IRoleRef|undefined {
        if (user && user.rolesRefs) {
            for (const ref of user.rolesRefs) {
                if (ref.isActive) return ref
            }
        }

        return
    }

    // public static getUserRoles(roleId:string|undefined):Promise<{data: IRoleRef[]}> {
    //     return userApi.getUserRoles(roleId)
    // }

    // public static getUserRole(id:string):Promise<{data: IRoleRef}> {
    //     return userApi.getFeature(id)
    // }

    public static activateUserRole(userId:string, roleRefId:string):Promise<{data: IRoleRef}> {
        return userApi.activateUserRole(userId, roleRefId)
    }

    public static updateUserRole(userId:string, UserRole:{_id: string, isActive?:boolean, roleId?:string}):Promise<{data: IRoleRef}> {
        return userApi.updateUserRole(userId, UserRole)
    }

    public static createUserRole(userId:string, roleRefId:string):Promise<{data: IRoleRef}> {
        return userApi.createUserRole(userId, {roleId: roleRefId})
    }

    public static deleteUserRole(userId:string, UserRoleId:string):Promise<{data: IRoleRef}> {
        return userApi.deleteUserRole(userId, UserRoleId)
    }
}

export default UserRoleService