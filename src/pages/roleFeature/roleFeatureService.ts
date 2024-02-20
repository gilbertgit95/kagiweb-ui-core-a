import featureApi from '../../dataEndpoints/apiCoreA/featureApi'
// import { ISignedInUser } from '../../stores/signedInUserSlice'
// import { IUser, IUserInfo, IContactInfo,TContactInfoType } from '../../types/user'
import { IFeatureRef } from '../../types/role'
import { IPagination, IPageQuery } from '../../types/mixTypes'

class RoleService {
    public static getRoleFeatures(roleId:string|undefined):Promise<{data: IFeatureRef[]}> {
        return featureApi.getRoleFeatures(roleId)
    }

    // public static getFeature(id:string):Promise<{data: IFeatureRef}> {
    //     return featureApi.getFeature(id)
    // }

    // public static updateFeature(feature:IFeatureRef):Promise<{data: IFeatureRef}> {
    //     return featureApi.updateFeature(feature)
    // }

    // public static createFeature(feature:IFeatureRef):Promise<{data: IFeatureRef}> {
    //     return featureApi.createFeature(feature)
    // }

    // public static deleteFeature(id:string):Promise<{data: IFeatureRef}> {
    //     return featureApi.deleteFeature(id)
    // }
}

export default RoleService