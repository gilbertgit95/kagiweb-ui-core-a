import apiHelper from "./apiHelper";
import Config from "../../utils/config";

class AuthApi {
    public static signin(username:string, password:string) {
        return apiHelper.publicReq({
            method: 'POST',
            url: Config.Origin + Config.RootApiEndpoint + 'signin',
        })
    }

    public static signinOtp(username:string, otp:string) {
        return apiHelper.publicReq({
            method: 'POST',
            url: Config.Origin + Config.RootApiEndpoint + 'signinOTP',
        })
    }

    public static signup(username:string, password:string, email:string, phone:string) {
        return apiHelper.publicReq({
            method: 'POST',
            url: Config.Origin + Config.RootApiEndpoint + 'signup',
        })
    }

    public static forgotPassword(email:string) {
        return apiHelper.publicReq({
            method: 'POST',
            url: Config.Origin + Config.RootApiEndpoint + 'forgotPassword',
        })
    }

    public static resetPassword(email:string, resetKey:string) {
        return apiHelper.publicReq({
            method: 'PUT',
            url: Config.Origin + Config.RootApiEndpoint + 'resetPassword',
        })
    }

    public static signout() {
        return apiHelper.publicReq({
            method: 'DELETE',
            url: Config.Origin + Config.RootApiEndpoint + 'signout',
        })
    }
}

export default AuthApi