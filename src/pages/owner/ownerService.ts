import OwnerApi from "../../dataEndpoints/apiCoreA/ownerApi"
import { ISignedInUser } from "../../stores/signedInUserSlice"
import { IUser, IUserUpdate, IUserInfo, IContactInfo, IRoleRef, ILimitedTransaction } from "../../types/user";

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

    // contact Info
    public static updateContactInfo(userId:string, ContactInfo:IContactInfo):Promise<{data: IContactInfo}> {
        return OwnerApi.updateContactInfo(userId, ContactInfo)
    }

    public static createContactInfo(userId:string, ContactInfo:IContactInfo):Promise<{data: IContactInfo}> {
        return OwnerApi.createContactInfo(userId, ContactInfo)
    }

    public static deleteContactInfo(userId:string, ContactInfoId:string):Promise<{data: IContactInfo}> {
        return OwnerApi.deleteContactInfo(userId, ContactInfoId)
    }

    // roles
    public static updateUserRole(userId:string, UserRole:{_id: string, isActive?:boolean, roleId?:string}):Promise<{data: IRoleRef}> {
        return OwnerApi.updateUserRole(userId, UserRole)
    }

    public static createUserRole(userId:string, roleRefId:string):Promise<{data: IRoleRef}> {
        return OwnerApi.createUserRole(userId, {roleId: roleRefId})
    }

    public static deleteUserRole(userId:string, UserRoleId:string):Promise<{data: IRoleRef}> {
        return OwnerApi.deleteUserRole(userId, UserRoleId)
    }

    // limited transaction
    public static updateLT(userId:string, lt:ILimitedTransaction):Promise<{data: ILimitedTransaction}> {
        return OwnerApi.updateUserLT(userId, lt)
    }
}

export default OwnerService