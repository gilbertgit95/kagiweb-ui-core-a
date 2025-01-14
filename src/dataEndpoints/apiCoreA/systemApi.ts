import apiHelper from './apiHelper';
import appComponentsHandler from '../../utils/appComponentsHandler'

export type TIpType = 'IPv4' | 'IPv6'

export interface ISystemInfo {
    // app directory
    currentDir: string | null
    // app port
    appPort: string | null
    // ip wifi address
    localWifiAddress: string | null
    // ip lan address
    localEthernetAddress: string | null
    // os
    os: string | null

}

class SystemApi {
    public static getSystemInfo() {
        return apiHelper.privateReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + 'system'
        })
    }
}

export default SystemApi