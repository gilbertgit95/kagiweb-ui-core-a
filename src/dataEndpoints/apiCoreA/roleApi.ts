import apiHelper from './apiHelper';
import { IPageQuery } from '../../types/mixTypes';
import { IRole } from '../../types/role';
import appComponentsHandler from '../../utils/appComponentsHandler'

class RoleApi {
    public static getAllRoles() {
        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + 'roles?page=1&pageSize=10000'
        })
    }

    public static getRoles(query:IPageQuery = {}) {
        const page =  query.hasOwnProperty('page')? 'page=' + query.page: null
        const pageSize = query.hasOwnProperty('pageSize')? 'pageSize=' + query.pageSize: null

        const queries = [page, pageSize].filter(item => item)
        const strQueries = queries.join('&')

        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `roles${ queries.length? '?' + strQueries: '' }`
        })
    }

    public static getRole(id:string) {
        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `roles/${ id }`
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
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `roles/${ role._id }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static createRole(role:IRole) {
        const data = {
            'name': role.name,
            'scope': role.scope,
            'description': role.description,
            'level': role.level,
            'reqLimitPerSec': role.reqLimitPerSec
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `roles`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteRole(id:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `roles/${ id }`
        })
    }

    // role features
    public static getRoleFeatures(roleId:string = '') {
        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `roles/${ roleId }/features`
        })
    }

    public static createRoleFeature(roleId:string = '', featureId:string) {
        const data = {
            'featureId': featureId
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `roles/${ roleId }/features`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static cloneFeatures(roleId:string = '', fromRoleId:string, overwrite:boolean) {
        const data = {
            'fromRoleId': fromRoleId,
            'overwrite': overwrite
        }

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `roles/${ roleId }/clonefeatures/`,
            data
        })
    }

    public static deleteRoleFeature(roleId:string = '', featureRefId:string) {

        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `roles/${ roleId }/features/${ featureRefId }`
        })
    }
}

export default RoleApi