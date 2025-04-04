import ActionApi from '../../dataEndpoints/apiCoreA/actionApi'
import { IRoleRef } from '../../types/account'

class ActionService {
    public static getAccountActionInfo(accountId:string, actionType:string, module:string, moduleId:string, ref:string, refId:string):Promise<{data: any}> {
        return ActionApi.getAccountActionInfo(accountId, actionType, module, moduleId, ref, refId)
    }

    public static getOwnerActionInfo(accountId:string, actionType:string, module:string, moduleId:string, ref:string, refId:string):Promise<{data: any}> {
        return ActionApi.getOwnerActionInfo(actionType, module, moduleId, ref, refId)
    }

    public static getAccountWorkspaceActionInfo(accountId:string,  actionType:string,  module:string, moduleId:string, subModule:string, subModuleId:string, ref:string, refId:string):Promise<{data: any}> {
        return ActionApi.getAccountWorkspaceActionInfo(accountId, actionType, module, moduleId, subModule, subModuleId, ref, refId)
    }

    public static getOwnerWorkspaceActionInfo(accountId:string,  actionType:string, module:string, moduleId:string, subModule:string, subModuleId:string, ref:string, refId:string):Promise<{data: any}> {
        return ActionApi.getOwnerWorkspaceActionInfo(actionType, module, moduleId, subModule, subModuleId, ref, refId)
    }
}

export default ActionService