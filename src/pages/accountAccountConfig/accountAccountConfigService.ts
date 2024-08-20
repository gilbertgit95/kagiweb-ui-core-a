import AccountApi from '../../dataEndpoints/apiCoreA/accountApi'
import { IAccount, IAccountConfig } from '../../types/account'

class AccountAccountConfigService {
    public static getAccountConfigById(account:IAccount, accountConfigId:string):IAccountConfig|undefined {

        if (account && account.accountConfigs) {
            for (const config of account.accountConfigs) {
                if (config._id === accountConfigId) return config
            }
        }

        return undefined
    }

    public static getAccountConfigByKey(account:IAccount, accountConfigKey:string):IAccountConfig|undefined {

        if (account && account.accountConfigs) {
            for (const config of account.accountConfigs) {
                if (config.key === accountConfigKey) return config
            }
        }

        return undefined
    }

    public static updateAccountConfig(accountId:string, accountConfig:IAccountConfig):Promise<{data: IAccountConfig}> {
        return AccountApi.updateAccountConfig(accountId, accountConfig)
    }
}

export default AccountAccountConfigService