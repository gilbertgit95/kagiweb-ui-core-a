import AuthApi from "../../dataEndpoints/apiCoreA/authApi"
// import { ISignedInUser } from "../../stores/signedInAccountSlice"

export interface ISigninResp {
    token?: string,
    nameId?: string,
    message?: string,
    expiration?: Date,
    createdAt?: Date
}

class AuthService {
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
}

export default AuthService