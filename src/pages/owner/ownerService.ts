import OwnerApi from '../../dataEndpoints/apiCoreA/ownerApi'
import { ISignedInUser } from '../../stores/signedInUserSlice'
import { IUser, IUserUpdate, IUserInfo, IContactInfo, IRoleRef, ILimitedTransaction, IPassword, IClientDevice, IAccessToken } from '../../types/user';

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

    // owner password
    public static createPassword(userId:string, passInfo:{currPassword:string, newPassword:string}):Promise<{data: IPassword}> {
        return OwnerApi.createUserPassword(userId, passInfo)
    }

    // owner client device
    public static getClientDeviceById(user:IUser, clientDeviceId:string):IClientDevice|undefined {

        if (user && user.clientDevices) {
            for (const clientDevice of user.clientDevices) {
                if (clientDevice._id === clientDeviceId) return clientDevice
            }
        }

        return undefined
    }

    public static updateClientDevice(userId:string, clientDevice:{_id?:string, ua?:string, disabled?:boolean}):Promise<{data: IClientDevice}> {
        return OwnerApi.updateClientDevice(userId, clientDevice)
    }

    public static createClientDevice(userId:string, clientDevice:IClientDevice):Promise<{data: IClientDevice}> {
        return OwnerApi.createClientDevice(userId, clientDevice)
    }

    public static deleteClientDevice(userId:string, clientDeviceId:string):Promise<{data: IClientDevice}> {
        return OwnerApi.deleteClientDevice(userId, clientDeviceId)
    }

    // owner client device token
    public static updateClientDeviceToken(userId:string, clientDeviceId:string, token:{_id?:string, ipAddress?:string, jwt?:string, disabled?:boolean}):Promise<{data: IAccessToken}> {
        return OwnerApi.updateClientDeviceToken(userId, clientDeviceId, token)
    }

    public static createClientDeviceToken(userId:string, clientDeviceId:string, token:IAccessToken):Promise<{data: IAccessToken}> {
        return OwnerApi.createClientDeviceToken(userId, clientDeviceId, token)
    }

    public static deleteClientDeviceToken(userId:string, clientDeviceId:string, clientDeviceTokenId:string):Promise<{data: IAccessToken}> {
        return OwnerApi.deleteClientDeviceToken(userId, clientDeviceId, clientDeviceTokenId)
    }
}

export default OwnerService