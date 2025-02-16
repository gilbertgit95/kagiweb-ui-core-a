import NotificationApi from "../../dataEndpoints/apiCoreA/notificationApi"
import { INotification } from "../../types/notification"
import { IPagination, IPageQuery } from "../../types/mixTypes"

class NotificationsService {
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
}

export default NotificationsService