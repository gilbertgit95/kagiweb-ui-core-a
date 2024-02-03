import apiHelper from "./apiHelper";
import Config from "../../utils/config";
import { IPageQuery } from "../../types/mixTypes";
import { IUser, IUserUpdate } from "../../types/user";

class UserApi {
    public static getUsers(query:IPageQuery = {}) {
        const page =  query.hasOwnProperty('page')? 'page=' + query.page: null
        const pageSize = query.hasOwnProperty('pageSize')? 'pageSize=' + query.pageSize: null

        const queries = [page, pageSize].filter(item => item)
        const strQueries = queries.join('&')

        return apiHelper.privateReq({
            method: 'GET',
            url: Config.Origin + Config.RootApiEndpoint + `users${ queries.length? '?' + strQueries: '' }`
        })
    }

    public static getUser(id:string) {
        return apiHelper.privateReq({
            method: 'GET',
            url: Config.Origin + Config.RootApiEndpoint + `users/${ id }`
        })
    }

    public static updateUser(user:IUserUpdate) {
        const data:IUserUpdate = {
            _id: user._id
        }

        if (user.username !== undefined) data['username'] = user.username
        if (user.disabled !== undefined) data['disabled'] = user.disabled
        if (user.verified !== undefined) data['verified'] = user.verified

        return apiHelper.privateReq({
            method: 'PUT',
            url: Config.Origin + Config.RootApiEndpoint + `users/${ user._id }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static createUser(user:IUser) {
        const data = {
            'username': user.username,
            'disabled': user.disabled,
            'verified': user.verified
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: Config.Origin + Config.RootApiEndpoint + `users`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteUser(id:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: Config.Origin + Config.RootApiEndpoint + `users/${ id }`
        })
    }
}

export default UserApi