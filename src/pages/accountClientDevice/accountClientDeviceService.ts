import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
import { IAccount, IClientDevice } from '../../types/account'

class AccountClientDeviceService {
    public static hasClientDeviceUA(account:IAccount, ua:string):boolean {
        if (account && account.clientDevices) {
            for (const clientDevice of account.clientDevices) {
                if (clientDevice.ua === ua) return true
            }
        }

        return false
    }

    public static getClientDeviceByUA(account:IAccount, ua:string):IClientDevice|undefined {

        if (account && account.clientDevices) {
            for (const clientDevice of account.clientDevices) {
                if (clientDevice.ua === ua) return clientDevice
            }
        }

        return undefined
    }

    public static getClientDeviceById(account:IAccount, clientDeviceId:string):IClientDevice|undefined {

        if (account && account.clientDevices) {
            for (const clientDevice of account.clientDevices) {
                if (clientDevice._id === clientDeviceId) return clientDevice
            }
        }

        return undefined
    }

    public static updateClientDevice(accountId:string, clientDevice:{_id?:string, ua?:string, description?:string, disabled?:boolean}):Promise<{data: IClientDevice}> {
        return AccountApi.updateClientDevice(accountId, clientDevice)
    }

    public static createClientDevice(accountId:string, clientDevice:IClientDevice):Promise<{data: IClientDevice}> {
        return AccountApi.createClientDevice(accountId, clientDevice)
    }

    public static deleteClientDevice(accountId:string, clientDeviceId:string):Promise<{data: IClientDevice}> {
        return AccountApi.deleteClientDevice(accountId, clientDeviceId)
    }
}

export default AccountClientDeviceService