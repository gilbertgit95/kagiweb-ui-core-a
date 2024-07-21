import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
// import { ISignedInUser } from '../../stores/signedInAccountSlice'
import { IAccount, IWorkspaceAccountRef } from '../../types/account'
import UserWorkspaceService from '../accountWorkspace/userWorkspaceService'

class AccountWorkspaceAccountRefService {
    public static getWorkspaceAccountRefById(user:IAccount, workspaceId:string, accountRefId:string):IWorkspaceAccountRef|undefined {

        const workspace = UserWorkspaceService.getWorkspaceById(user, workspaceId)
        if (workspace && workspace.userRefs) {
            for (const userRef of workspace.userRefs) {
                if (userRef._id === accountRefId) return userRef
            }
        }

        return undefined
    }

    public static getWorkspaceAccountRef( accountId:string, workspaceId:string, accountRefId:string):Promise<{data: IWorkspaceAccountRef & {username?:string} | null}> {
        return AccountApi.getWorkspaceAccountRef(
            accountId,
            workspaceId,
            accountRefId
        )
    }

    public static getWorkspaceAccountRefs( accountId:string, workspaceId:string):Promise<{data: (IWorkspaceAccountRef & {username?:string})[]}> {
        return AccountApi.getWorkspaceAccountRefs(
            accountId,
            workspaceId
        )
    }

    public static updateWorkspaceAccountRef(
        accountId:string,
        workspaceId:string,
        accountRefId:string,
        readAccess: boolean,
        updateAccess: boolean,
        createAccess: boolean,
        deleteAccess: boolean,
        disabled: boolean):Promise<{data: IWorkspaceAccountRef}> {
        return AccountApi.updateWorkspaceAccountRef(
            accountId,
            workspaceId,
            accountRefId,
            readAccess,
            updateAccess,
            createAccess,
            deleteAccess,
            disabled
        )
    }

    public static createWorkspaceAccountRef(
        accountId:string,
        workspaceId:string,
        username:string,
        readAccess: boolean,
        updateAccess: boolean,
        createAccess: boolean,
        deleteAccess: boolean,
        disabled: boolean):Promise<{data: IWorkspaceAccountRef}> {
        return AccountApi.createWorkspaceAccountRef(
            accountId,
            workspaceId,
            username,
            readAccess,
            updateAccess,
            createAccess,
            deleteAccess,
            disabled
        )
    }

    public static deleteWorkspaceAccountRef(accountId:string, workspaceId:string, accountRefId:string):Promise<{data: IWorkspaceAccountRef}> {
        return AccountApi.deleteWorkspaceAccountRef(accountId, workspaceId, accountRefId)
    }
}

export default AccountWorkspaceAccountRefService