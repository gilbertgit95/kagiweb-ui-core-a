import ActionApi from '../../dataEndpoints/apiCoreA/actionApi'
// import { IRoleRef } from '../../types/account'

class ActionService {
    public static getAccountActionInfo(accountId:string, actionType:string, module:string, moduleId:string, ref:string, refId:string):Promise<{data: any}> {
        return ActionApi.getAccountActionInfo(accountId, actionType, module, moduleId, ref, refId)
    }

    public static acceptOrDeclineAccountActionInfo(accountId:string, actionType:string, module:string, moduleId:string, ref:string, refId:string, accept:boolean):Promise<{data: any}> {
        if (accept) {
            return ActionApi.acceptAccountActionInfo(accountId, actionType, module, moduleId, ref, refId)
        } else {
            return ActionApi.declineAccountActionInfo(accountId, actionType, module, moduleId, ref, refId)
        }

    }

    public static getOwnerActionInfo(accountId:string, actionType:string, module:string, moduleId:string, ref:string, refId:string):Promise<{data: any}> {
        return ActionApi.getOwnerActionInfo(accountId, actionType, module, moduleId, ref, refId)
    }

    public static acceptOrDeclineOwnerActionInfo(accountId:string, actionType:string, module:string, moduleId:string, ref:string, refId:string, accept:boolean):Promise<{data: any}> {
        if (accept) {
            return ActionApi.acceptOwnerActionInfo(accountId, actionType, module, moduleId, ref, refId)
        } else {
            return ActionApi.declineOwnerActionInfo(accountId, actionType, module, moduleId, ref, refId)
        }
    }

    public static getAccountWorkspaceActionInfo(accountId:string,  actionType:string,  module:string, moduleId:string, subModule:string, subModuleId:string, ref:string, refId:string):Promise<{data: any}> {
        return ActionApi.getAccountWorkspaceActionInfo(accountId, actionType, module, moduleId, subModule, subModuleId, ref, refId)
    }

    public static acceptOrDeclineAccountWorkspaceActionInfo(accountId:string,  actionType:string,  module:string, moduleId:string, subModule:string, subModuleId:string, ref:string, refId:string, accept:boolean):Promise<{data: any}> {
        if (accept) {
            return ActionApi.acceptAccountWorkspaceActionInfo(accountId, actionType, module, moduleId, subModule, subModuleId, ref, refId)
        } else {
            return ActionApi.declineAccountWorkspaceActionInfo(accountId, actionType, module, moduleId, subModule, subModuleId, ref, refId)
        }
    }

    public static getOwnerWorkspaceActionInfo(accountId:string,  actionType:string, module:string, moduleId:string, subModule:string, subModuleId:string, ref:string, refId:string):Promise<{data: any}> {
        return ActionApi.getOwnerWorkspaceActionInfo(accountId, actionType, module, moduleId, subModule, subModuleId, ref, refId)
    }

    public static acceptOrDeclineOwnerWorkspaceActionInfo(accountId:string,  actionType:string, module:string, moduleId:string, subModule:string, subModuleId:string, ref:string, refId:string, accept:boolean):Promise<{data: any}> {
        if (accept) {
            return ActionApi.acceptOwnerWorkspaceActionInfo(accountId, actionType, module, moduleId, subModule, subModuleId, ref, refId)
        } else {
            return ActionApi.declineOwnerWorkspaceActionInfo(accountId, actionType, module, moduleId, subModule, subModuleId, ref, refId)
        }
    }
}

export default ActionService