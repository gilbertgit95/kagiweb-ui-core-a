import userApi from '../../dataEndpoints/apiCoreA/userApi'
// import { ISignedInUser } from '../../stores/signedInUserSlice'
import { IUser, IWorkspace } from '../../types/user'

class UserWorkspaceService {
    public static getWorkspaceById(user:IUser, workspaceId:string):IWorkspace|undefined {

        if (user && user.workspaces) {
            for (const workspace of user.workspaces) {
                if (workspace._id === workspaceId) return workspace
            }
        }

        return undefined
    }

    public static updateWorkspace(userId:string, workspaceId:string, name:string, description:string, isActive:boolean, disabled:boolean):Promise<{data: IWorkspace}> {
        return userApi.updateWorkspace(userId, workspaceId, name, description, isActive, disabled)
    }

    public static createWorkspace(userId:string, name:string, description:string, isActive:boolean, disabled:boolean):Promise<{data: IWorkspace}> {
        return userApi.createWorkspace(userId, name, description, isActive, disabled)
    }

    public static deleteWorkspace(userId:string, clientDeviceId:string):Promise<{data: IWorkspace}> {
        return userApi.deleteWorkspace(userId, clientDeviceId)
    }
}

export default UserWorkspaceService