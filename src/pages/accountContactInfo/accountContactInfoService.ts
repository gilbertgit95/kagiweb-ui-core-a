import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
import { IAccount, IContactInfo } from '../../types/account'

class AccountContactInfoService {
    public static getContactInfoById(account:IAccount, accountContactId:string):IContactInfo|undefined {

        if (account && account.contactInfos) {
            for (const contact of account.contactInfos) {
                if (contact._id === accountContactId) return contact
            }
        }

        return undefined
    }

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