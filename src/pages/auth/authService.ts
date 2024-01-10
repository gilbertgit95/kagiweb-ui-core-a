import AuthApi from "../../dataEndpoints/apiCoreA/authApi"
// import { ISignedInUser } from "../../stores/signedInUserSlice"

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

    public static async signout():Promise<ISigninResp> {
        return (await AuthApi.signout()).data
    }
}

export default AuthService