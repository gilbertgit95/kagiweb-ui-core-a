import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
import AccountAccountRefService from '../accountAccountRef/accountAccountRefService'
import { IAccount, IAccountConfig } from '../../types/account'

class AccountAccountRefAccountConfigService {
    public static getAccountAccountRefAccountConfigById(account:IAccount, accountRefId:string, accountConfigId:string):IAccountConfig|undefined {
        const accountRef = AccountAccountRefService.getAccountAccountRefById(account, accountRefId)
        if (accountRef && accountRef.accountConfigs) {
            for (const config of accountRef.accountConfigs) {
                if (config._id === accountConfigId) return config
            }
        }

        return undefined
    }

    public static getAccountAccountRefAccountConfigByKey(account:IAccount, accountRefId:string, accountConfigKey:string):IAccountConfig|undefined {
        const accountRef = AccountAccountRefService.getAccountAccountRefById(account, accountRefId)
        if (accountRef && accountRef.accountConfigs) {
            for (const config of accountRef.accountConfigs) {
                if (config.key === accountConfigKey) return config
            }
        }

        return undefined
    }

    public static updateAccountAccountRefAccountConfig(accountId:string, accountRefId:string, configId:string, value:string):Promise<{data: IAccountConfig}> {
        return AccountApi.updateAccountAccountRefAccountConfig(accountId, accountRefId, configId, value)
    }
}

export default AccountAccountRefAccountConfigService