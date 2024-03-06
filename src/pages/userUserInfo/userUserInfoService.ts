// import featureApi from '../../dataEndpoints/apiCoreA/featureApi'
// import { ISignedInUser } from '../../stores/signedInUserSlice'
// import { IUser, IUserInfo, IContactInfo,TContactInfoType } from '../../types/user'
import { IUser, IUserInfo } from '../../types/user'
// import { IPagination, IPageQuery } from '../../types/mixTypes'

class UserUserInfoService {
    public static getUserInfoById(user:IUser, userInfoId:string):IUserInfo|undefined {

        if (user && user.userInfos) {
            for (const info of user.userInfos) {
                if (info._id === userInfoId) return info
            }
        }

        return undefined
    }
    // public static getRoleFeatures(roleId:string|undefined):Promise<{data: IFeatureRef[]}> {
    //     return featureApi.getRoleFeatures(roleId)
    // }

    // public static getFeature(id:string):Promise<{data: IFeatureRef}> {
    //     return featureApi.getFeature(id)
    // }

    // public static updateFeature(feature:IFeatureRef):Promise<{data: IFeatureRef}> {
    //     return featureApi.updateFeature(feature)
    // }

    // public static createRoleFeature(roleId:string, featureId:string):Promise<{data: IFeatureRef}> {
    //     return featureApi.createRoleFeature(roleId, featureId)
    // }

    // public static deleteRoleFeature(roleId:string, featureRefId:string):Promise<{data: IFeatureRef}> {
    //     return featureApi.deleteRoleFeature(roleId, featureRefId)
    // }
}

export default UserUserInfoService