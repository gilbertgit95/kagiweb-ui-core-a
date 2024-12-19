import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
import AccountWorkspaceAccountRefService from '../accountWorkspaceAccountRef/accountWorkspaceAccountRefService'
import { IAccount, IAccountConfig } from '../../types/account'

class AccountWorkspaceAccountRefAccountConfigService {
    public static getAccountWorkspaceAccountRefAccountConfigById(account:IAccount, workspaceId:string, accountRefId:string, accountConfigId:string):IAccountConfig|undefined {
        const accountRef = AccountWorkspaceAccountRefService.getWorkspaceAccountRefById(account, workspaceId, accountRefId)
        if (accountRef && accountRef.accountConfigs) {
            for (const config of accountRef.accountConfigs) {
                if (config._id === accountConfigId) return config
            }
        }

        return undefined
    }

    public static getAccountWorkspaceAccountRefAccountConfigByKey(account:IAccount, workspaceId:string, accountRefId:string, accountConfigKey:string):IAccountConfig|undefined {
        const accountRef = AccountWorkspaceAccountRefService.getWorkspaceAccountRefById(account, workspaceId, accountRefId)
        if (accountRef && accountRef.accountConfigs) {
            for (const config of accountRef.accountConfigs) {
                if (config.key === accountConfigKey) return config
            }
        }

        return undefined
    }

    public static updateAccountWorkspaceAccountRefAccountConfig(accountId:string, workspaceId:string, accountRefId:string, configId:string, value:string):Promise<{data: IAccountConfig}> {
        return AccountApi.updateAccountWorkspaceAccountRefAccountConfig(accountId, workspaceId, accountRefId, configId, value)
    }
}

export default AccountWorkspaceAccountRefAccountConfigService