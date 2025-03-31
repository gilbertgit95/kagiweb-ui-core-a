import apiHelper from './apiHelper';
import { IPageQuery } from '../../types/mixTypes';
import { INotification } from '../../types/notification';
import appComponentsHandler from '../../utils/appComponentsHandler'

class NotificationApi {
    // for account apis

    public static getAccountNotifications(accountId:string, query:IPageQuery = {}) {
        const page =  query.hasOwnProperty('page')? 'page=' + query.page: null
        const pageSize = query.hasOwnProperty('pageSize')? 'pageSize=' + query.pageSize: null

        const queries = [page, pageSize].filter(item => item)
        const strQueries = queries.join('&')

        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `accounts/${accountId}/notifications${ queries.length? '?' + strQueries: '' }`
        })
    }

    public static createAccountNotification(accountId:string, notif:INotification) {
        const data = {
            'accountId': accountId,
            'type': notif.type,
            'title': notif.title,
            'message': notif.message,
            'links': notif.links,
            'seen': notif.seen
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `accounts/${accountId}/notifications`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static getAccountNotification(accountId:string, notifId:string) {
        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `accounts/${accountId}/notifications/${ notifId }`
        })
    }

    public static updateAccountNotification(accountId:string, notifId:string, notif:INotification) {
        const data = {
            'accountId': accountId,
            'type': notif.type,
            'title': notif.title,
            'message': notif.message,
            'links': notif.links,
            'seen': notif.seen
        }

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `accounts/${accountId}/notifications/${ notifId }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteAccountNotification(accountId:string, notifId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `accounts/${accountId}/notifications/${ notifId }`
        })
    }

    // for owner apis
    public static getOwnerActiveNotifications() {
        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/activeNotifications`
        })
    }

    public static getOwnerNotifications(accountId:string, query:IPageQuery = {}) {
        const page =  query.hasOwnProperty('page')? 'page=' + query.page: null
        const pageSize = query.hasOwnProperty('pageSize')? 'pageSize=' + query.pageSize: null

        const queries = [page, pageSize].filter(item => item)
        const strQueries = queries.join('&')

        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/notifications${ queries.length? '?' + strQueries: '' }`
        })
    }

    public static createOwnerNotification(accountId:string, notif:INotification) {
        const data = {
            'type': notif.type,
            'title': notif.title,
            'message': notif.message,
            'links': notif.links,
            'seen': notif.seen
        }

        return apiHelper.privateReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/notifications`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static getOwnerNotification(accountId:string, notifId:string) {
        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/notifications/${ notifId }`
        })
    }

    public static updateOwnerNotification(accountId:string, notifId:string, notif:INotification) {
        const data = {
            'type': notif.type,
            'title': notif.title,
            'message': notif.message,
            'links': notif.links,
            'seen': notif.seen
        }

        return apiHelper.privateReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/notifications/${ notifId }`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static deleteOwnerNotification(accountId:string, notifId:string) {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/notifications/${ notifId }`
        })
    }

}

export default NotificationApi