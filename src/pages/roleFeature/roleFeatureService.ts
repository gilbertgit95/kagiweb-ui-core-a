import roleApi from '../../dataEndpoints/apiCoreA/roleApi'
// import { ISignedInUser } from '../../stores/signedInAccountSlice'
// import { IAccount, IAccountInfo, IContactInfo,TContactInfoType } from '../../types/account'
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

    public static cloneFeatures(roleId:string, fromRoleId:string, overwrite:boolean):Promise<{data: IFeatureRef[]}> {
        return roleApi.cloneFeatures(roleId, fromRoleId, overwrite)
    }

    public static deleteRoleFeature(roleId:string, featureRefId:string):Promise<{data: IFeatureRef}> {
        return roleApi.deleteRoleFeature(roleId, featureRefId)
    }

}

export default RoleService