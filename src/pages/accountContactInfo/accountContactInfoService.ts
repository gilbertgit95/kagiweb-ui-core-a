import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
// import { ISignedInaccount } from '../../stores/signedInAccountSlice'
// import { IAccount, IContactInfo, IContactInfo,TContactInfoType } from '../../types/account'
import { IAccount, IContactInfo } from '../../types/account'
import { IPagination, IPageQuery } from '../../types/mixTypes'

class AccountContactInfoService {
    public static getContactInfoById(account:IAccount, accountContactId:string):IContactInfo|undefined {

        if (account && account.contactInfos) {
            for (const contact of account.contactInfos) {
                if (contact._id === accountContactId) return contact
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

export default AccountContactInfoService