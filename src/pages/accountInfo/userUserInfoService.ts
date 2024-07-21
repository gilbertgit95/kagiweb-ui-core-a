import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
// import { ISignedInUser } from '../../stores/signedInAccountSlice'
// import { IAccount, IAccountInfo, IContactInfo,TContactInfoType } from '../../types/account'
import { IAccount, IAccountInfo } from '../../types/account'
// import { IPagination, IPageQuery } from '../../types/mixTypes'

class UserUserInfoService {
    public static getUserInfoById(user:IAccount, userInfoId:string):IAccountInfo|undefined {

        if (user && user.userInfos) {
            for (const info of user.userInfos) {
                if (info._id === userInfoId) return info
            }
        }

        return undefined
    }
    // public static getUserInfos(roleId:string|undefined):Promise<{data: IAccountInfo[]}> {
    //     return AccountApi.getUserInfos(roleId)
    // }

    // public static getUserInfo(id:string):Promise<{data: IAccountInfo}> {
    //     return AccountApi.getFeature(id)
    // }

    public static updateAccountInfo(accountId:string, userInfo:IAccountInfo):Promise<{data: IAccountInfo}> {
        return AccountApi.updateAccountInfo(accountId, userInfo)
    }

    public static createAccountInfo(accountId:string, userInfo:IAccountInfo):Promise<{data: IAccountInfo}> {
        return AccountApi.createAccountInfo(accountId, userInfo)
    }

    public static deleteAccountInfo(accountId:string, userInfoId:string):Promise<{data: IAccountInfo}> {
        return AccountApi.deleteAccountInfo(accountId, userInfoId)
    }
}

export default UserUserInfoService