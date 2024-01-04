import OwnerApi from "../../dataEndpoints/apiCoreA/ownerApi"
import { ISignedInUser } from "../../stores/signedInUserSlice"

class OwnerService {
    public static async reqOwnerCompleteInfo():Promise<ISignedInUser> {
        let resp = {
            token: undefined,
            userData: undefined,
            isSignedIn: false,
            role: undefined,
            roles: undefined,
            features: undefined,
            workspace: undefined,
            workspaces: undefined
        }

        let ownerReqResp = undefined
        try {
            ownerReqResp = await OwnerApi.getOwnerCompleteInfo()

            // set app stores data  
            // console.log('token: ', token)
            resp.userData = ownerReqResp?.data?.userData
            resp.role = ownerReqResp?.data?.role
            resp.roles = ownerReqResp?.data?.roles
            resp.features = ownerReqResp?.data?.features
            resp.workspace = ownerReqResp?.data?.workspace
            resp.workspaces = ownerReqResp?.data?.workspaces
            resp.isSignedIn = true
        } catch (err) {
            console.log('Error while loading init data, stay singnedout')
        }

        return resp
    }
}

export default OwnerService