import OwnerApi from "../../dataEndpoints/apiCoreA/ownerApi"
import { ISignedInUser } from "../../stores/signedInUserSlice"

class AuthService {
    public static async reqAppInitData():Promise<ISignedInUser> {
        let ownerReqResp = undefined
        try {
            ownerReqResp = await OwnerApi.getOwner()
        } catch (err) {
            console.log('Error while loading init data, stay singnedout')
        }

        // let userRole = undefined
        // let userRoleFeatures = undefined
        // let userActiveWorkspace = undefined

        // fetch user role

        // fetch user role features

        // fetch user active workspace

        // set app stores data
        // console.log('token: ', token)
        // console.log('owner: ', ownerReqResp?.data)
        return {
            token: undefined,
            userData: ownerReqResp?.data,
            isSignedIn: false,
            role: undefined,
            features: undefined,
            activeWorkspace: undefined
        }
    }
}

export default AuthService