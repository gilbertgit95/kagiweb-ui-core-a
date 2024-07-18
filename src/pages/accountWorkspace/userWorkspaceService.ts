import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
// import { ISignedInUser } from '../../stores/signedInUserSlice'
import { IAccount, IWorkspace } from '../../types/account'

class UserWorkspaceService {
    public static getWorkspaceById(user:IAccount, workspaceId:string):IWorkspace|undefined {

        if (user && user.workspaces) {
            for (const workspace of user.workspaces) {
                if (workspace._id === workspaceId) return workspace
            }
        }

        return undefined
    }

    public static updateWorkspace(accountId:string, workspaceId:string, name:string, description:string, isActive:boolean, disabled:boolean):Promise<{data: IWorkspace}> {
        return AccountApi.updateWorkspace(accountId, workspaceId, name, description, isActive, disabled)
    }

    public static createWorkspace(accountId:string, name:string, description:string, isActive:boolean, disabled:boolean):Promise<{data: IWorkspace}> {
        return AccountApi.createWorkspace(accountId, name, description, isActive, disabled)
    }

    public static deleteWorkspace(accountId:string, clientDeviceId:string):Promise<{data: IWorkspace}> {
        return AccountApi.deleteWorkspace(accountId, clientDeviceId)
    }
}

export default UserWorkspaceService