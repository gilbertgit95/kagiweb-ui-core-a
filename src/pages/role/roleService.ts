import roleApi from '../../dataEndpoints/apiCoreA/roleApi'
import { IRole } from '../../types/role'
import { IPagination, IPageQuery } from '../../types/mixTypes'

class RoleService {
    public static getAllRoles():Promise<{data: IPagination<IRole>}> {
        return roleApi.getAllRoles()
    }

    public static getRoles(query:IPageQuery):Promise<{data: IPagination<IRole>}> {
        return roleApi.getRoles(query)
    }

    public static getRole(id:string):Promise<{data: IRole}> {
        return roleApi.getRole(id)
    }

    public static updateRole(role:IRole):Promise<{data: IRole}> {
        return roleApi.updateRole(role)
    }

    public static createRole(role:IRole):Promise<{data: IRole}> {
        return roleApi.createRole(role)
    }

    public static deleteRole(id:string):Promise<{data: IRole}> {
        return roleApi.deleteRole(id)
    }
}

export default RoleService