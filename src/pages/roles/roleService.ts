import roleApi from "../../dataEndpoints/apiCoreA/roleApi"
// import { ISignedInUser } from "../../stores/signedInUserSlice"
import { IRole } from "../../types/role"
import { IPagination, IPageQuery } from "../../types/mixTypes"

class RoleService {
    public static getRoles(query:IPageQuery):Promise<{data: IPagination<IRole>}> {
        return roleApi.getRoles(query)
    }

    // public static getUserInfo(user:IUser, key:string):IUserInfo|undefined {
    //     for (const info of user?.userInfos || []) {
    //         if (info.key === key) return info
    //     }

    //     return undefined
    // }

    // public static getContactInfo(user:IUser, type:TContactInfoType):IContactInfo|undefined {
    //     for (const info of user?.contactInfos || []) {
    //         if (info.type === type) return info
    //     }

    //     return undefined
    // }
}

export default RoleService