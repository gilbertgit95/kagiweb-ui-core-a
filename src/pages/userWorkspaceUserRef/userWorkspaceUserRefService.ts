import userApi from '../../dataEndpoints/apiCoreA/userApi'
// import { ISignedInUser } from '../../stores/signedInUserSlice'
import { IUser, IWorkspaceUserRef } from '../../types/user'
import UserWorkspaceService from '../userWorkspace/userWorkspaceService'

class UserWorkspaceUserRefService {
    public static getWorkspaceUserRefById(user:IUser, workspaceId:string, userRefId:string):IWorkspaceUserRef|undefined {

        const workspace = UserWorkspaceService.getWorkspaceById(user, workspaceId)
        if (workspace && workspace.userRefs) {
            for (const userRef of workspace.userRefs) {
                if (userRef._id === userRefId) return userRef
            }
        }

        return undefined
    }

    public static updateWorkspaceUserRef(
        userId:string,
        workspaceId:string,
        userRefId:string,
        readAccess: boolean,
        updateAccess: boolean,
        createAccess: boolean,
        deleteAccess: boolean,
        disabled: boolean):Promise<{data: IWorkspaceUserRef}> {
        return userApi.updateWorkspaceUserRef(
            userId,
            workspaceId,
            userRefId,
            readAccess,
            updateAccess,
            createAccess,
            deleteAccess,
            disabled
        )
    }

    public static createWorkspaceUserRef(
        userId:string,
        workspaceId:string,
        username:string,
        readAccess: boolean,
        updateAccess: boolean,
        createAccess: boolean,
        deleteAccess: boolean,
        disabled: boolean):Promise<{data: IWorkspaceUserRef}> {
        return userApi.createWorkspaceUserRef(
            userId,
            workspaceId,
            username,
            readAccess,
            updateAccess,
            createAccess,
            deleteAccess,
            disabled
        )
    }

    public static deleteWorkspaceUserRef(userId:string, workspaceId:string, userRefId:string):Promise<{data: IWorkspaceUserRef}> {
        return userApi.deleteWorkspaceUserRef(userId, workspaceId, userRefId)
    }
}

export default UserWorkspaceUserRefService