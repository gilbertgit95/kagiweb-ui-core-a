import usersApi from "../../dataEndpoints/apiCoreA/accountApi"
// import { ISignedInUser } from "../../stores/signedInUserSlice"
import { IAccount, IUserInfo, IContactInfo,TContactInfoType, IUserUpdate } from "../../types/account"
import { IPagination, IPageQuery } from "../../types/mixTypes"

class UserService {
    public static getUsers(query:IPageQuery):Promise<{data: IPagination<IAccount>}> {
        return usersApi.getUsers(query)
    }

    public static getUserInfo(user:IAccount, key:string):IUserInfo|undefined {
        for (const info of user?.userInfos || []) {
            if (info.key === key) return info
        }

        return undefined
    }

    public static getContactInfo(user:IAccount, type:TContactInfoType):IContactInfo|undefined {
        for (const info of user?.contactInfos || []) {
            if (info.type === type) return info
        }

        return undefined
    }

    public static getUser(id:string):Promise<{data: IAccount}> {
        return usersApi.getUser(id)
    }

    public static updateUser(user:IUserUpdate):Promise<{data: IAccount}> {
        return usersApi.updateUser(user)
    }

    public static createUser(user:IAccount):Promise<{data: IAccount}> {
        return usersApi.createUser(user)
    }

    public static deleteUser(id:string):Promise<{data: IAccount}> {
        return usersApi.deleteUser(id)
    }
}

export default UserService