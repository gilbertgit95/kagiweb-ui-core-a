import featureApi from "../../dataEndpoints/apiCoreA/featureApi"
// import { ISignedInUser } from "../../stores/signedInUserSlice"
// import { IUser, IUserInfo, IContactInfo,TContactInfoType } from "../../types/user"
import { IFeature } from "../../types/feature"
import { IPagination, IPageQuery } from "../../types/mixTypes"

class RoleService {
    public static getFeatures(query:IPageQuery):Promise<{data: IPagination<IFeature>}> {
        return featureApi.getFeatures(query)
    }

    public static getFeature(id:string):Promise<{data: IFeature}> {
        return featureApi.getFeature(id)
    }

    // public static getContactInfo(user:IUser, type:TContactInfoType):IContactInfo|undefined {
    //     for (const info of user?.contactInfos || []) {
    //         if (info.type === type) return info
    //     }

    //     return undefined
    // }
}

export default RoleService