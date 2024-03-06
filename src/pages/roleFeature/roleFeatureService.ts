import roleApi from '../../dataEndpoints/apiCoreA/roleApi'
// import { ISignedInUser } from '../../stores/signedInUserSlice'
// import { IUser, IUserInfo, IContactInfo,TContactInfoType } from '../../types/user'
import { IFeatureRef } from '../../types/role'
import { IPagination, IPageQuery } from '../../types/mixTypes'

class RoleService {
    public static getRoleFeatures(roleId:string|undefined):Promise<{data: IFeatureRef[]}> {
        return roleApi.getRoleFeatures(roleId)
    }

    // public static getFeature(id:string):Promise<{data: IFeatureRef}> {
    //     return roleApi.getFeature(id)
    // }

    // public static updateFeature(feature:IFeatureRef):Promise<{data: IFeatureRef}> {
    //     return roleApi.updateFeature(feature)
    // }

    public static createRoleFeature(roleId:string, featureId:string):Promise<{data: IFeatureRef}> {
        return roleApi.createRoleFeature(roleId, featureId)
    }

    public static deleteRoleFeature(roleId:string, featureRefId:string):Promise<{data: IFeatureRef}> {
        return roleApi.deleteRoleFeature(roleId, featureRefId)
    }
}

export default RoleService