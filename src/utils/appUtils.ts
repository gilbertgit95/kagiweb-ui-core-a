import store from '../stores/appStore'
import { setUserData, ISignedInUser } from '../stores/signedInUserSlice'
import { setAppRefs } from '../stores/appRefsSlice';
import OwnerService from '../pages/owner/ownerService'
import RoleService from '../pages/role/roleService'
import FeatureService from '../pages/feature/featureService'

class AppUtils {
    static async loadSigninUserData() {
        // const state = store.getState()
        // console.log('global state: ', state)

        let ownerInfo:ISignedInUser = {
            userData: undefined,
            isSignedIn: false,
            role: undefined,
            roles: undefined,
            features: undefined,
            workspace: undefined,
            workspaces: undefined,
            externalWorkspaces: undefined
        }
  
        try {
            const ownerReqResp = await OwnerService.reqOwnerCompleteInfo()
    
            // set app stores data
            ownerInfo.userData = ownerReqResp?.data?.userData
            ownerInfo.role = ownerReqResp?.data?.role
            ownerInfo.roles = ownerReqResp?.data?.roles
            ownerInfo.features = ownerReqResp?.data?.features
            ownerInfo.workspace = ownerReqResp?.data?.workspace
            ownerInfo.workspaces = ownerReqResp?.data?.workspaces
            ownerInfo.externalWorkspaces = ownerReqResp?.data?.externalWorkspaces
            ownerInfo.isSignedIn = true

            // set token and owner to the app storage
            store.dispatch(setUserData(ownerInfo))
        } catch (err) {
            // set token and owner to the app storage
            store.dispatch(setUserData(ownerInfo))
            throw(err)
        }
    }

    static async loadAppRefsData() {
        // fetch app references, roles and features
        const rolesResp = await RoleService.getAllRoles()
        const featuresResp = await FeatureService.getAllFeatures()
  
        // set roles and features to app storage
        store.dispatch(setAppRefs({
            roles: rolesResp?.data?.items || [],
            features: featuresResp?.data?.items || []
        }))
    }
}

export default AppUtils