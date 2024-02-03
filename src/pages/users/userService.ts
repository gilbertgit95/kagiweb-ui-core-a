import usersApi from "../../dataEndpoints/apiCoreA/userApi"
// import { ISignedInUser } from "../../stores/signedInUserSlice"
import { IUser, IUserInfo, IContactInfo,TContactInfoType } from "../../types/user"
import { IPagination, IPageQuery } from "../../types/mixTypes"

class UserService {
    public static getUsers(query:IPageQuery):Promise<{data: IPagination<IUser>}> {
        return usersApi.getUsers(query)
    }

    public static getUserInfo(user:IUser, key:string):IUserInfo|undefined {
        for (const info of user?.userInfos || []) {
            if (info.key === key) return info
        }

        return undefined
    }

    public static getContactInfo(user:IUser, type:TContactInfoType):IContactInfo|undefined {
        for (const info of user?.contactInfos || []) {
            if (info.type === type) return info
        }

        return undefined
    }

    public static getUser(id:string):Promise<{data: IUser}> {
        return usersApi.getUser(id)
    }

    public static updateUser(feature:IUser):Promise<{data: IUser}> {
        return usersApi.updateUser(feature)
    }

    public static createUser(feature:IUser):Promise<{data: IUser}> {
        return usersApi.createUser(feature)
    }

    public static deleteUser(id:string):Promise<{data: IUser}> {
        return usersApi.deleteUser(id)
    }
}

export default UserService