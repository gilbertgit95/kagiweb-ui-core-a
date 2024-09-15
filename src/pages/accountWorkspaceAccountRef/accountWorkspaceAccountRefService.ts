import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
import { IAccount, IWorkspaceAccountRef } from '../../types/account'
import AccountWorkspaceService from '../accountWorkspace/accountWorkspaceService'

class AccountWorkspaceAccountRefService {
    public static getWorkspaceAccountRefById(account: IAccount, workspaceId:string, accountRefId:string):IWorkspaceAccountRef|undefined {

        const workspace = AccountWorkspaceService.getWorkspaceById(account, workspaceId)
        if (workspace && workspace.accountRefs) {
            for (const accountRef of workspace.accountRefs) {
                if (accountRef._id === accountRefId) return accountRef
            }
        }

        return undefined
    }

    public static getWorkspaceAccountRef( accountId:string, workspaceId:string, accountRefId:string):Promise<{data: IWorkspaceAccountRef & {nameId?:string} | null}> {
        return AccountApi.getWorkspaceAccountRef(
            accountId,
            workspaceId,
            accountRefId
        )
    }

    public static getWorkspaceAccountRefs( accountId:string, workspaceId:string):Promise<{data: (IWorkspaceAccountRef & {nameId?:string})[]}> {
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
        nameId:string,
        readAccess: boolean,
        updateAccess: boolean,
        createAccess: boolean,
        deleteAccess: boolean,
        disabled: boolean):Promise<{data: IWorkspaceAccountRef}> {
        return AccountApi.createWorkspaceAccountRef(
            accountId,
            workspaceId,
            nameId,
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