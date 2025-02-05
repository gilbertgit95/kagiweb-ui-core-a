import store from '../stores/appStore'
import { setAccountData, IAccessInfo } from '../stores/signedInAccountSlice'
import { setAppRefs } from '../stores/appRefsSlice';
import OwnerService from '../pages/owner/ownerService'
import RoleService from '../pages/role/roleService'
import FeatureService from '../pages/feature/featureService'

class AppUtils {
    public static parseAccountAndWorspaceId(path?:string):{workspaceId?:string, accountId?:string} {
        let result:{workspaceId?:string, accountId?:string} = {
            accountId: undefined,
            workspaceId: undefined
        }

        if (path) {
            const accountSubRoute = path.split('/accounts/')[1]
            const workspaceSubRoute = path.split('/workspaces/')[1]

            const accountId = accountSubRoute?.split('/')[1]
            const workspaceId = workspaceSubRoute?.split('/')[0]

            result = {
                accountId,
                workspaceId
            }
        }

        return result
    }

    static async loadSigninAccountData() {
        // const state = store.getState()
        // console.log('global state: ', state)

        let ownerInfo:IAccessInfo = {
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
            visitedAccountFeatures: undefined,
            // visitedAccountRoles: undefined,

            visitedAccountWorkspace: undefined,
            visitedAccountWorkspaceRole: undefined,
            visitedAccountWorkspaceFeatures: undefined,
            // visitedAccountWorkspaceRoles: undefined,
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

    static async loadAccountAccessInfo(accountId:string, reset=false) {

        if (reset) {
            store.dispatch(setAccountData({
                visitedAccount: undefined,
                visitedAccountRole: undefined,
                visitedAccountFeatures: undefined
            }))
            return
        }

        try {
            const accessInfo = await OwnerService.reqAccountAccessInfo(accountId)
            store.dispatch(setAccountData({...accessInfo.data}))
        } catch (err) {
            console.log(err)
            store.dispatch(setAccountData({
                visitedAccount: undefined,
                visitedAccountRole: undefined,
                visitedAccountFeatures: undefined
            }))
        }
    }

    static async loadAccountWorkspaceAccessInfo(accountId:string, workspaceId:string, reset=false) {

        if (reset) {
            store.dispatch(setAccountData({
                visitedAccountWorkspace: undefined,
                visitedAccountWorkspaceRole: undefined,
                visitedAccountWorkspaceFeatures: undefined
            }))
            return
        }

        try {
            const accessInfo = await OwnerService.reqAccountWorkspaceAccessInfo(accountId, workspaceId)
            store.dispatch(setAccountData({...accessInfo.data}))
        } catch (err) {
            console.log(err)
            store.dispatch(setAccountData({
                visitedAccount: undefined,
                visitedAccountRole: undefined,
                visitedAccountFeatures: undefined
            }))
        }
    }
}

export default AppUtils