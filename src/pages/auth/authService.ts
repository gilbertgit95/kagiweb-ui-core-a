import AuthApi from "../../dataEndpoints/apiCoreA/authApi"
import api from "../../dataEndpoints/apiCoreA/apiHelper"
import appComponentsHandler from "../../utils/appComponentsHandler"
import { ISignedAccount } from "./signedAccountComponent"

export interface ISigninResp {
    token?: string,
    nameId?: string,
    message?: string,
    expiration?: Date,
    createdAt?: Date
}

class AuthService {
    public static getSignedAccounts():ISignedAccount[] {
        const strAccts = localStorage.getItem(appComponentsHandler.appConfig.AccountsKey) || '[]'
        const accts = JSON.parse(strAccts) as ISignedAccount[]
        return accts
    }

    public static indexOfSignedAccount(acc:ISignedAccount):number {
        const accts = AuthService.getSignedAccounts()

        let matchIndex = -1
        let index = 0
        for (let accItem of accts) {
            if (accItem.nameId === acc.nameId) {
                matchIndex = index
                break
            }
            index++
        }

        return matchIndex
    }

    public static saveSignedAccount(acc:ISignedAccount):ISignedAccount[] {
        let accts = AuthService.getSignedAccounts()
        const matchIndex = AuthService.indexOfSignedAccount(acc)

        // no match
        if (matchIndex === -1) {
            accts.push(acc)
        // has match
        } else {
            accts[matchIndex] = acc
        }

        // filterout emty nameID
        accts = accts.filter(item => item.nameId)

        localStorage.setItem(appComponentsHandler.appConfig.AccountsKey, JSON.stringify(accts))
        return accts
    }

    public static removeSignedAccount(acc:ISignedAccount):ISignedAccount[] {
        let accts = AuthService.getSignedAccounts()
        accts = accts.filter(item => item.nameId !== acc.nameId)
        localStorage.setItem(appComponentsHandler.appConfig.AccountsKey, JSON.stringify(accts))
        return accts
    }


    public static async signin(nameId:string|undefined, password:string|undefined):Promise<ISigninResp> {
        return (await AuthApi.signin(nameId||'', password||'')).data
    }

    public static async signinOTP(nameId:string|undefined, otp:string|undefined):Promise<ISigninResp> {
        return (await AuthApi.signinOTP(nameId||'', otp||'')).data
    }

    public static async signup(nameId:string|undefined, password:string|undefined, email:string|undefined, phone:string|undefined):Promise<ISigninResp> {
        return (await AuthApi.signup(nameId||'', password||'', email||'', phone||'')).data
    }

    public static async forgotPassword(nameId:string|undefined):Promise<ISigninResp> {
        return (await AuthApi.forgotPassword(nameId||'')).data
    }

    public static async resetPassword(nameId:string|undefined, key:string|undefined, newPassword:string|undefined):Promise<ISigninResp> {
        return (await AuthApi.resetPassword(nameId||'', key||'', newPassword||'')).data
    }

    public static async signout():Promise<ISigninResp> {
        return (await AuthApi.signout()).data
    }

    public static async rawSignout(token:string):Promise<ISigninResp> {
        return (await api.publicReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + 'signout',
            headers: {
                'Authorization': token
            }
        })).data
    }

    public static async rawGetAccountCompleteInfo(token:string):Promise<ISignedAccount> {
        return (await api.publicReq({
            method: 'GET',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + 'owner/accessInfo',
            headers: {
                'Authorization': token
            }
        })).data
    }
}

export default AuthService