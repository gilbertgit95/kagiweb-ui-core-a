import apiHelper from './apiHelper';
import { IPageQuery } from '../../types/mixTypes';
import { INotification } from '../../types/notification';
import appComponentsHandler from '../../utils/appComponentsHandler'

class ActionApi {
    public static getAccountActionInfo(accountId:string, actionType:string, moduleType:string, moduleId:string, refType:string, refId:string) {

        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `accounts/${accountId}/actions/${actionType}/module/${moduleType}/${moduleId}/ref/${refType}/${refId}`
        })
    }

    public static getOwnerActionInfo(accountId:string, actionType:string, moduleType:string, moduleId:string, refType:string, refId:string) {

        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/${accountId}/actions/${actionType}/module/${moduleType}/${moduleId}/ref/${refType}/${refId}`
        })
    }

    public static updateAccountActionInfo(accountId:string, actionType:string, moduleType:string, moduleId:string, refType:string, refId:string, data:{disabled?:boolean, accepted?:string, declined?:string}) {

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `accounts/${accountId}/actions/${actionType}/module/${moduleType}/${moduleId}/ref/${refType}/${refId}`,
            data
        })
    }

    public static updateOwnerActionInfo(accountId:string, actionType:string, moduleType:string, moduleId:string, refType:string, refId:string, data:{disabled?:boolean, accepted?:string, declined?:string}) {

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/${accountId}/actions/${actionType}/module/${moduleType}/${moduleId}/ref/${refType}/${refId}`,
            data
        })
    }

    public static getAccountWorkspaceActionInfo(accountId:string, actionType:string, moduleType:string, moduleId:string, subModuleType:string, subModuleId:string, refType:string, refId:string) {

        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `accounts/${accountId}/actions/${actionType}/module/${moduleType}/${moduleId}/subModule/${subModuleType}/${subModuleId}/ref/${refType}/${refId}`
        })
    }

    public static getOwnerWorkspaceActionInfo(accountId:string, actionType:string, moduleType:string, moduleId:string, subModuleType:string, subModuleId:string, refType:string, refId:string) {

        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/${accountId}/actions/${actionType}/module/${moduleType}/${moduleId}/subModule/${subModuleType}/${subModuleId}/ref/${refType}/${refId}`
        })
    }

    public static updateAccountWorkspaceActionInfo(accountId:string, actionType:string, moduleType:string, moduleId:string, subModuleType:string, subModuleId:string, refType:string, refId:string, data:{disabled?:boolean, accepted?:string, declined?:string}) {

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `accounts/${accountId}/actions/${actionType}/module/${moduleType}/${moduleId}/subModule/${subModuleType}/${subModuleId}/ref/${refType}/${refId}`,
            data
        })
    }

    public static updateOwnerWorkspaceActionInfo(accountId:string, actionType:string, moduleType:string, moduleId:string, subModuleType:string, subModuleId:string, refType:string, refId:string, data:{disabled?:boolean, accepted?:string, declined?:string}) {

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/${accountId}/actions/${actionType}/module/${moduleType}/${moduleId}/subModule/${subModuleType}/${subModuleId}/ref/${refType}/${refId}`,
            data
        })
    }
}

export default ActionApi