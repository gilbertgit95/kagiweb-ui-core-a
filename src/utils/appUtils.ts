import store from '../stores/appStore'
import { setAccountData, ISignedInUser } from '../stores/signedInAccountSlice'
import { setAppRefs } from '../stores/appRefsSlice';
import OwnerService from '../pages/owner/ownerService'
import RoleService from '../pages/role/roleService'
import FeatureService from '../pages/feature/featureService'

class AppUtils {
    static async loadSigninAccountData() {
        // const state = store.getState()
        // console.log('global state: ', state)

        let ownerInfo:ISignedInUser = {
            accountData: undefined,
            isSignedIn: false,
            appRole: undefined,
            appRoles: undefined,
            appFeatures: undefined,
            workspace: undefined,
            workspaces: undefined,
            externalWorkspaces: undefined,
            clientDevice: undefined,
            accessToken: undefined,

            visitedAccount: undefined,
            visitedAccountRole: undefined,
            visitedAccountRoles: undefined,
            visitedAccountWorkspaceRole: undefined,
            visitedAccountWorkspaceRoles: undefined,
        }
  
        try {
            const ownerReqResp = await OwnerService.reqOwnerCompleteInfo()
    
            // set app stores data
            ownerInfo.accountData = ownerReqResp?.data?.accountData
            ownerInfo.appRole = ownerReqResp?.data?.appRole
            ownerInfo.appRoles = ownerReqResp?.data?.appRoles
            ownerInfo.appFeatures = ownerReqResp?.data?.appFeatures
            ownerInfo.workspace = ownerReqResp?.data?.workspace
            ownerInfo.workspaces = ownerReqResp?.data?.workspaces
            ownerInfo.externalWorkspaces = ownerReqResp?.data?.externalWorkspaces
            ownerInfo.clientDevice = ownerReqResp?.data?.clientDevice
            ownerInfo.accessToken = ownerReqResp?.data?.accessToken
            ownerInfo.isSignedIn = true

            // set token and owner to the app storage
            store.dispatch(setAccountData(ownerInfo))
        } catch (err) {
            // set token and owner to the app storage
            store.dispatch(setAccountData(ownerInfo))
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

    static async loadAccountRole(rootAccountId:string, accounRef:string) {
        // get account ref role/roles of the root account
        // get the mapped features of the active role
        // set this data to the global store
    }

    static async loadWorkspaceRole(rootAccountId:string, workspaceId:string, accountRef:string) {
        // get account ref role/roles of the root account workspace
        // get the mapped features of the active role
        // set this data to the global store
    }
}

export default AppUtils