import userApi from '../../dataEndpoints/apiCoreA/userApi'
// import { ISignedInUser } from '../../stores/signedInUserSlice'
import { IUser, IClientDevice } from '../../types/user'
import { IFeatureRef } from '../../types/role'
import { IPagination, IPageQuery } from '../../types/mixTypes'

class UserClientDeviceService {
    public static hasClientDeviceUA(user:IUser, ua:string):boolean {
        if (user && user.clientDevices) {
            for (const clientDevice of user.clientDevices) {
                if (clientDevice.ua === ua) return true
            }
        }

        return false
    }

    public static getClientDeviceByUA(user:IUser, ua:string):IClientDevice|undefined {

        if (user && user.clientDevices) {
            for (const clientDevice of user.clientDevices) {
                if (clientDevice.ua === ua) return clientDevice
            }
        }

        return undefined
    }

    public static getClientDeviceById(user:IUser, clientDeviceId:string):IClientDevice|undefined {

        if (user && user.clientDevices) {
            for (const clientDevice of user.clientDevices) {
                if (clientDevice._id === clientDeviceId) return clientDevice
            }
        }

        return undefined
    }

    public static updateClientDevice(userId:string, clientDevice:{_id?:string, ua?:string, description?:string, disabled?:boolean}):Promise<{data: IClientDevice}> {
        return userApi.updateClientDevice(userId, clientDevice)
    }

    public static createClientDevice(userId:string, clientDevice:IClientDevice):Promise<{data: IClientDevice}> {
        return userApi.createClientDevice(userId, clientDevice)
    }

    public static deleteClientDevice(userId:string, clientDeviceId:string):Promise<{data: IClientDevice}> {
        return userApi.deleteClientDevice(userId, clientDeviceId)
    }
}

export default UserClientDeviceService