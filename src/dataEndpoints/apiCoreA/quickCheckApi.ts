import apiHelper from './apiHelper';
import appComponentsHandler from '../../utils/appComponentsHandler'

class QuickCheckApi {
    // for account apis
    public static getAccountActiveNotifications(accountId:string) {
        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `accounts/${accountId}/quickCheck/activeNotifications`
        })
    }

    // for owner apis
    public static getOwnerActiveNotifications() {
        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + `owner/quickCheck/activeNotifications`
        })
    }
}

export default QuickCheckApi