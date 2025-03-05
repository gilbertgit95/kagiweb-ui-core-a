import NotificationApi from "../../dataEndpoints/apiCoreA/notificationApi"
import QuickCheckApi from "../../dataEndpoints/apiCoreA/quickCheckApi"
import { INotification } from "../../types/notification"
import { IPagination, IPageQuery } from "../../types/mixTypes"

class NotificationsService {
    // account services
    public static getAccountActiveNotifications(accountId:string):Promise<{data: {activeNotifications: number}}> {
        return QuickCheckApi.getAccountActiveNotifications(accountId)
    }

    public static getAccountNotifications(accountId:string, query:IPageQuery):Promise<{data: IPagination<INotification>}> {
        return NotificationApi.getAccountNotifications(accountId, query)
    }

    public static getAccountNotification(accountId:string, id:string):Promise<{data: INotification}> {
        return NotificationApi.getAccountNotification(accountId, id)
    }

    public static updateAccountNotification(accountId:string, ntifId:string, notification:INotification):Promise<{data: INotification}> {
        return NotificationApi.updateAccountNotification(accountId, ntifId, notification)
    }

    public static createAccountNotification(accountId:string, notification:INotification):Promise<{data: INotification}> {
        return NotificationApi.createAccountNotification(accountId, notification)
    }

    public static deleteAccountNotification(accountId:string, id:string):Promise<{data: INotification}> {
        return NotificationApi.deleteAccountNotification(accountId, id)
    }

    // owner services
    public static getOwnerActiveNotifications():Promise<{data: {activeNotifications: number}}> {
        return QuickCheckApi.getOwnerActiveNotifications()
    }

    public static getOwnerNotifications(accountId:string, query:IPageQuery):Promise<{data: IPagination<INotification>}> {
        return NotificationApi.getOwnerNotifications(accountId, query)
    }

    public static getOwnerNotification(accountId:string, id:string):Promise<{data: INotification}> {
        return NotificationApi.getOwnerNotification(accountId, id)
    }

    public static updateOwnerNotification(accountId:string, ntifId:string, notification:INotification):Promise<{data: INotification}> {
        return NotificationApi.updateOwnerNotification(accountId, ntifId, notification)
    }

    public static createOwnerNotification(accountId:string, notification:INotification):Promise<{data: INotification}> {
        return NotificationApi.createOwnerNotification(accountId, notification)
    }

    public static deleteOwnerNotification(accountId:string, id:string):Promise<{data: INotification}> {
        return NotificationApi.deleteOwnerNotification(accountId, id)
    }
}

export default NotificationsService