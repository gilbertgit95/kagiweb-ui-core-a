import apiHelper from './apiHelper';
import Config from '../../utils/config';
import { IPageQuery } from '../../types/mixTypes';
import { IRole } from '../../types/role';

class RoleApi {
    public static getRoles(query:IPageQuery = {}) {
        const page =  query.hasOwnProperty('page')? 'page=' + query.page: null
        const pageSize = query.hasOwnProperty('pageSize')? 'pageSize=' + query.pageSize: null

        const queries = [page, pageSize].filter(item => item)
        const strQueries = queries.join('&')

        return apiHelper.privateReq({
            method: 'GET',
            url: Config.Origin + Config.RootApiEndpoint + `roles${ queries.length? '?' + strQueries: '' }`
        })
    }

    public static getRole(id:string) {
        return apiHelper.privateReq({
            method: 'GET',
            url: Config.Origin + Config.RootApiEndpoint + `roles/${ id }`
        })
    }

    public static updateRole(role:IRole) {
        const data = {
            'name': role.name,
            'description': role.description,
            'level': role.level,
            'reqLimitPerSec': role.reqLimitPerSec
        }

        return apiHelper.privateReq({
            method: 'PUT',
            url: Config.Origin + Config.RootApiEndpoint + `roles/${ role._id }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static createRole(role:IRole) {
        const data = {
            'name': role.name,
            'description': role.description,
            'level': role.level,
            'reqLimitPerSec': role.reqLimitPerSec
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: Config.Origin + Config.RootApiEndpoint + `roles`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteRole(id:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: Config.Origin + Config.RootApiEndpoint + `roles/${ id }`
        })
    }
}

export default RoleApi