import apiHelper from "./apiHelper";
import Config from "../../utils/config";
import { IPageQuery } from "../../types/mixTypes";
import { IUser } from "../../types/user";

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
            url: Config.Origin + Config.RootApiEndpoint + `features/${ id }`
        })
    }

    public static updateUser(user:IUser) {
        const data = {
            // 'name': user.name,
            // 'description': user.description,
            // 'value': user.value,
            // 'type': user.type,
            // 'tags': user.tags?.join(',')
        }

        return apiHelper.privateReq({
            method: 'PUT',
            url: Config.Origin + Config.RootApiEndpoint + `users/${ user._id }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static createUser(user:IUser) {
        const data = {
            // 'name': user.name,
            // 'description': user.description,
            // 'value': user.value,
            // 'type': user.type,
            // 'tags': user.tags?.join(',')
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