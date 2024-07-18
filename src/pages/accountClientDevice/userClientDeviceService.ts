import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
// import { ISignedInUser } from '../../stores/signedInUserSlice'
import { IAccount, IClientDevice } from '../../types/account'
import { IFeatureRef } from '../../types/role'
import { IPagination, IPageQuery } from '../../types/mixTypes'

class UserClientDeviceService {
    public static hasClientDeviceUA(user:IAccount, ua:string):boolean {
        if (user && user.clientDevices) {
            for (const clientDevice of user.clientDevices) {
                if (clientDevice.ua === ua) return true
            }
        }

        return false
    }

    public static getClientDeviceByUA(user:IAccount, ua:string):IClientDevice|undefined {

        if (user && user.clientDevices) {
            for (const clientDevice of user.clientDevices) {
                if (clientDevice.ua === ua) return clientDevice
            }
        }

        return undefined
    }

    public static getClientDeviceById(user:IAccount, clientDeviceId:string):IClientDevice|undefined {

        if (user && user.clientDevices) {
            for (const clientDevice of user.clientDevices) {
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

export default UserClientDeviceService