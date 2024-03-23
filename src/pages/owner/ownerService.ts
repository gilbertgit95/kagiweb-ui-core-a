import OwnerApi from "../../dataEndpoints/apiCoreA/ownerApi"
import { ISignedInUser } from "../../stores/signedInUserSlice"
import { IUser, IUserUpdate, IUserInfo } from "../../types/user";

class OwnerService {
    public static getOwner():Promise<{data: IUser}> {
        return OwnerApi.getOwner()
    }

    public static updateOwner(user:IUserUpdate):Promise<{data: IUser}> {
        return OwnerApi.updateOwner(user)
    }

    public static reqOwnerCompleteInfo():Promise<{data: ISignedInUser}> {
        return OwnerApi.getOwnerCompleteInfo()
    }

    // user info
    public static updateUserInfo(userId:string, userInfo:IUserInfo):Promise<{data: IUserInfo}> {
        return OwnerApi.updateUserInfo(userId, userInfo)
    }

    public static createUserInfo(userId:string, userInfo:IUserInfo):Promise<{data: IUserInfo}> {
        return OwnerApi.createUserInfo(userId, userInfo)
    }

    public static deleteUserInfo(userId:string, userInfoId:string):Promise<{data: IUserInfo}> {
        return OwnerApi.deleteUserInfo(userId, userInfoId)
    }
}

export default OwnerService