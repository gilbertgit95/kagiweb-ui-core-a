import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
// import { ISignedInUser } from '../../stores/signedInUserSlice'
// import { IAccount, IUserInfo, IContactInfo,TContactInfoType } from '../../types/account'
import { IAccount, IUserInfo } from '../../types/account'
// import { IPagination, IPageQuery } from '../../types/mixTypes'

class UserUserInfoService {
    public static getUserInfoById(user:IAccount, userInfoId:string):IUserInfo|undefined {

        if (user && user.userInfos) {
            for (const info of user.userInfos) {
                if (info._id === userInfoId) return info
            }
        }

        return undefined
    }
    // public static getUserInfos(roleId:string|undefined):Promise<{data: IUserInfo[]}> {
    //     return AccountApi.getUserInfos(roleId)
    // }

    // public static getUserInfo(id:string):Promise<{data: IUserInfo}> {
    //     return AccountApi.getFeature(id)
    // }

    public static updateUserInfo(userId:string, userInfo:IUserInfo):Promise<{data: IUserInfo}> {
        return AccountApi.updateUserInfo(userId, userInfo)
    }

    public static createUserInfo(userId:string, userInfo:IUserInfo):Promise<{data: IUserInfo}> {
        return AccountApi.createUserInfo(userId, userInfo)
    }

    public static deleteUserInfo(userId:string, userInfoId:string):Promise<{data: IUserInfo}> {
        return AccountApi.deleteUserInfo(userId, userInfoId)
    }
}

export default UserUserInfoService