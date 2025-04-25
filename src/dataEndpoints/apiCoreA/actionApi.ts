import apiHelper from './apiHelper';
// import { IPageQuery } from '../../types/mixTypes';
// import { INotification } from '../../types/notification';
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

    public static acceptAccountActionInfo(accountId:string, actionType:string, moduleType:string, moduleId:string, refType:string, refId:string) {

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `accounts/${accountId}/actions/${actionType}/module/${moduleType}/${moduleId}/ref/${refType}/${refId}`,
            data: {}
        })
    }

    public static declineAccountActionInfo(accountId:string, actionType:string, moduleType:string, moduleId:string, refType:string, refId:string) {

        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `accounts/${accountId}/actions/${actionType}/module/${moduleType}/${moduleId}/ref/${refType}/${refId}`,
            data: {}
        })
    }

    public static acceptOwnerActionInfo(accountId:string, actionType:string, moduleType:string, moduleId:string, refType:string, refId:string) {

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/${accountId}/actions/${actionType}/module/${moduleType}/${moduleId}/ref/${refType}/${refId}`,
            data: {}
        })
    }

    public static declineOwnerActionInfo(accountId:string, actionType:string, moduleType:string, moduleId:string, refType:string, refId:string) {

        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/${accountId}/actions/${actionType}/module/${moduleType}/${moduleId}/ref/${refType}/${refId}`,
            data: {}
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

    public static acceptAccountWorkspaceActionInfo(accountId:string, actionType:string, moduleType:string, moduleId:string, subModuleType:string, subModuleId:string, refType:string, refId:string) {

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `accounts/${accountId}/actions/${actionType}/module/${moduleType}/${moduleId}/subModule/${subModuleType}/${subModuleId}/ref/${refType}/${refId}`,
            data: {}
        })
    }

    public static declineAccountWorkspaceActionInfo(accountId:string, actionType:string, moduleType:string, moduleId:string, subModuleType:string, subModuleId:string, refType:string, refId:string) {

        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `accounts/${accountId}/actions/${actionType}/module/${moduleType}/${moduleId}/subModule/${subModuleType}/${subModuleId}/ref/${refType}/${refId}`,
            data: {}
        })
    }

    public static acceptOwnerWorkspaceActionInfo(accountId:string, actionType:string, moduleType:string, moduleId:string, subModuleType:string, subModuleId:string, refType:string, refId:string) {

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/${accountId}/actions/${actionType}/module/${moduleType}/${moduleId}/subModule/${subModuleType}/${subModuleId}/ref/${refType}/${refId}`,
            data: {}
        })
    }

    public static declineOwnerWorkspaceActionInfo(accountId:string, actionType:string, moduleType:string, moduleId:string, subModuleType:string, subModuleId:string, refType:string, refId:string) {

        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/${accountId}/actions/${actionType}/module/${moduleType}/${moduleId}/subModule/${subModuleType}/${subModuleId}/ref/${refType}/${refId}`,
            data: {}
        })
    }
}

export default ActionApi