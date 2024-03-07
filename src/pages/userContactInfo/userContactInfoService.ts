import userApi from '../../dataEndpoints/apiCoreA/userApi'
// import { ISignedInUser } from '../../stores/signedInUserSlice'
// import { IUser, IContactInfo, IContactInfo,TContactInfoType } from '../../types/user'
import { IUser, IContactInfo } from '../../types/user'
import { IPagination, IPageQuery } from '../../types/mixTypes'

class UserContactInfoService {
    public static getContactInfoById(user:IUser, userContactId:string):IContactInfo|undefined {

        if (user && user.contactInfos) {
            for (const contact of user.contactInfos) {
                if (contact._id === userContactId) return contact
            }
        }

        return undefined
    }
    // public static getContactInfos(roleId:string|undefined):Promise<{data: IContactInfo[]}> {
    //     return userApi.getContactInfos(roleId)
    // }

    // public static getContactInfo(id:string):Promise<{data: IContactInfo}> {
    //     return userApi.getFeature(id)
    // }

    public static updateContactInfo(userId:string, ContactInfo:IContactInfo):Promise<{data: IContactInfo}> {
        return userApi.updateContactInfo(userId, ContactInfo)
    }

    public static createContactInfo(userId:string, ContactInfo:IContactInfo):Promise<{data: IContactInfo}> {
        return userApi.createContactInfo(userId, ContactInfo)
    }

    public static deleteContactInfo(userId:string, ContactInfoId:string):Promise<{data: IContactInfo}> {
        return userApi.deleteContactInfo(userId, ContactInfoId)
    }
}

export default UserContactInfoService