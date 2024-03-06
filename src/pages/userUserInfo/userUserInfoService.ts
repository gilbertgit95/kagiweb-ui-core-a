import userApi from '../../dataEndpoints/apiCoreA/userApi'
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
    // public static getRoleFeatures(roleId:string|undefined):Promise<{data: IUserInfo[]}> {
    //     return userApi.getRoleFeatures(roleId)
    // }

    // public static getUserInfo(id:string):Promise<{data: IUserInfo}> {
    //     return userApi.getFeature(id)
    // }

    public static updateUserInfo(userId:string, userInfo:IUserInfo):Promise<{data: IUserInfo}> {
        return userApi.updateUserInfo(userId, userInfo)
    }

    public static createRoleFeature(userId:string, userInfo:IUserInfo):Promise<{data: IUserInfo}> {
        return userApi.createUserInfo(userId, userInfo)
    }

    public static deleteRoleFeature(userId:string, userInfoId:string):Promise<{data: IUserInfo}> {
        return userApi.deleteUserInfo(userId, userInfoId)
    }
}

export default UserUserInfoService