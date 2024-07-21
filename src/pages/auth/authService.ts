import AuthApi from "../../dataEndpoints/apiCoreA/authApi"
// import { ISignedInUser } from "../../stores/signedInAccountSlice"

export interface ISigninResp {
    token?: string,
    username?: string,
    message?: string
}

class AuthService {
    public static async signin(username:string|undefined, password:string|undefined):Promise<ISigninResp> {
        return (await AuthApi.signin(username||'', password||'')).data
    }

    public static async signinOTP(username:string|undefined, otp:string|undefined):Promise<ISigninResp> {
        return (await AuthApi.signinOTP(username||'', otp||'')).data
    }

    public static async signup(username:string|undefined, password:string|undefined, email:string|undefined, phone:string|undefined):Promise<ISigninResp> {
        return (await AuthApi.signup(username||'', password||'', email||'', phone||'')).data
    }

    public static async forgotPassword(username:string|undefined):Promise<ISigninResp> {
        return (await AuthApi.forgotPassword(username||'')).data
    }

    public static async resetPassword(username:string|undefined, key:string|undefined, newPassword:string|undefined):Promise<ISigninResp> {
        return (await AuthApi.resetPassword(username||'', key||'', newPassword||'')).data
    }

    public static async signout():Promise<ISigninResp> {
        return (await AuthApi.signout()).data
    }
}

export default AuthService