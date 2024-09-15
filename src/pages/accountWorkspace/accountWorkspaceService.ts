import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
import { IAccount, IWorkspace } from '../../types/account'

class AccountWorkspaceService {
    public static getWorkspaceById(account: IAccount, workspaceId:string):IWorkspace|undefined {

        if (account && account.workspaces) {
            for (const workspace of account.workspaces) {
                if (workspace._id === workspaceId) return workspace
            }
        }

        return undefined
    }

    public static updateWorkspace(accountId:string, workspaceId:string, name:string, description:string, disabled:boolean):Promise<{data: IWorkspace}> {
        return AccountApi.updateWorkspace(accountId, workspaceId, name, description, disabled)
    }

    public static createWorkspace(accountId:string, name:string, description:string, disabled:boolean):Promise<{data: IWorkspace}> {
        return AccountApi.createWorkspace(accountId, name, description, disabled)
    }

    public static deleteWorkspace(accountId:string, clientDeviceId:string):Promise<{data: IWorkspace}> {
        return AccountApi.deleteWorkspace(accountId, clientDeviceId)
    }
}

export default AccountWorkspaceService