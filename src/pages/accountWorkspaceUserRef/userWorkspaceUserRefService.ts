import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
// import { ISignedInUser } from '../../stores/signedInUserSlice'
import { IAccount, IWorkspaceUserRef } from '../../types/account'
import UserWorkspaceService from '../accountWorkspace/userWorkspaceService'

class UserWorkspaceUserRefService {
    public static getWorkspaceUserRefById(user:IAccount, workspaceId:string, userRefId:string):IWorkspaceUserRef|undefined {

        const workspace = UserWorkspaceService.getWorkspaceById(user, workspaceId)
        if (workspace && workspace.userRefs) {
            for (const userRef of workspace.userRefs) {
                if (userRef._id === userRefId) return userRef
            }
        }

        return undefined
    }

    public static getWorkspaceUserRef( userId:string, workspaceId:string, userRefId:string):Promise<{data: IWorkspaceUserRef & {username?:string} | null}> {
        return AccountApi.getWorkspaceUserRef(
            userId,
            workspaceId,
            userRefId
        )
    }

    public static getWorkspaceUserRefs( userId:string, workspaceId:string):Promise<{data: (IWorkspaceUserRef & {username?:string})[]}> {
        return AccountApi.getWorkspaceUserRefs(
            userId,
            workspaceId
        )
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
        return AccountApi.updateWorkspaceUserRef(
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
        return AccountApi.createWorkspaceUserRef(
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
        return AccountApi.deleteWorkspaceUserRef(userId, workspaceId, userRefId)
    }
}

export default UserWorkspaceUserRefService