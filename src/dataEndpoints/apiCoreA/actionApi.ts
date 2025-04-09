import apiHelper from './apiHelper';
import { IPageQuery } from '../../types/mixTypes';
import { INotification } from '../../types/notification';
import appComponentsHandler from '../../utils/appComponentsHandler'

class NotificationApi {
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

    public static getAccountWorkspaceActionInfo(accountId:string, actionType:string, moduleType:string, moduleId:string, subModuleType:string, subModuleId:string, refType:string, refId:string) {

        // console.log(`
        //     accountId: ${accountId},
        //     actionType: ${actionType},
        //     moduleType: ${moduleType},
        //     moduleId: ${moduleId},
        //     subModuleType: ${subModuleType},
        //     subModuleId: ${subModuleId},
        //     refType: ${refType},
        //     refId: ${refId}
        // `)

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
}

export default NotificationApi