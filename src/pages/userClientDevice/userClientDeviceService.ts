import featureApi from '../../dataEndpoints/apiCoreA/featureApi'
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

    public static getClientDeviceByUA(user:IUser, ua:string):IClientDevice|null {

        if (user && user.clientDevices) {
            for (const clientDevice of user.clientDevices) {
                if (clientDevice.ua === ua) return clientDevice
            }
        }

        return null
    }

    public static getClientDeviceById(user:IUser, clientDeviceId:string):IClientDevice|null {

        if (user && user.clientDevices) {
            for (const clientDevice of user.clientDevices) {
                if (clientDevice._id === clientDeviceId) return clientDevice
            }
        }

        return null
    }
    // public static getRoleFeatures(roleId:string|undefined):Promise<{data: IFeatureRef[]}> {
    //     return featureApi.getRoleFeatures(roleId)
    // }

    // public static getFeature(id:string):Promise<{data: IFeatureRef}> {
    //     return featureApi.getFeature(id)
    // }

    // public static updateFeature(feature:IFeatureRef):Promise<{data: IFeatureRef}> {
    //     return featureApi.updateFeature(feature)
    // }

    // public static createRoleFeature(roleId:string, featureId:string):Promise<{data: IFeatureRef}> {
    //     return featureApi.createRoleFeature(roleId, featureId)
    // }

    // public static deleteRoleFeature(roleId:string, featureRefId:string):Promise<{data: IFeatureRef}> {
    //     return featureApi.deleteRoleFeature(roleId, featureRefId)
    // }
}

export default UserClientDeviceService