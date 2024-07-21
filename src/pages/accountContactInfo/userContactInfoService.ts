import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
// import { ISignedInUser } from '../../stores/signedInAccountSlice'
// import { IAccount, IContactInfo, IContactInfo,TContactInfoType } from '../../types/account'
import { IAccount, IContactInfo } from '../../types/account'
import { IPagination, IPageQuery } from '../../types/mixTypes'

class UserContactInfoService {
    public static getContactInfoById(user:IAccount, userContactId:string):IContactInfo|undefined {

        if (user && user.contactInfos) {
            for (const contact of user.contactInfos) {
                if (contact._id === userContactId) return contact
            }
        }

        return undefined
    }
    // public static getContactInfos(roleId:string|undefined):Promise<{data: IContactInfo[]}> {
    //     return AccountApi.getContactInfos(roleId)
    // }

    // public static getContactInfo(id:string):Promise<{data: IContactInfo}> {
    //     return AccountApi.getFeature(id)
    // }

    public static updateContactInfo(accountId:string, ContactInfo:IContactInfo):Promise<{data: IContactInfo}> {
        return AccountApi.updateContactInfo(accountId, ContactInfo)
    }

    public static createContactInfo(accountId:string, ContactInfo:IContactInfo):Promise<{data: IContactInfo}> {
        return AccountApi.createContactInfo(accountId, ContactInfo)
    }

    public static deleteContactInfo(accountId:string, ContactInfoId:string):Promise<{data: IContactInfo}> {
        return AccountApi.deleteContactInfo(accountId, ContactInfoId)
    }
}

export default UserContactInfoService