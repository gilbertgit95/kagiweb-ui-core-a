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

    public static updateWorkspace(userId:string, workspaceId:string, name:string, description:string, isActive:boolean, disabled:boolean):Promise<{data: IWorkspace}> {
        return AccountApi.updateWorkspace(userId, workspaceId, name, description, isActive, disabled)
    }

    public static createWorkspace(userId:string, name:string, description:string, isActive:boolean, disabled:boolean):Promise<{data: IWorkspace}> {
        return AccountApi.createWorkspace(userId, name, description, isActive, disabled)
    }

    public static deleteWorkspace(userId:string, clientDeviceId:string):Promise<{data: IWorkspace}> {
        return AccountApi.deleteWorkspace(userId, clientDeviceId)
    }
}

export default UserWorkspaceService