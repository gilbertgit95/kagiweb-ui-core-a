import apiHelper from "./apiHelper";
import Config from "../../utils/config";

class AuthApi {
    public static signin(username:string, password:string) {
        const data = {
            'username': username,
            'password': password
        }

        return apiHelper.publicReq({
            method: 'POST',
            url: Config.Origin + Config.RootApiEndpoint + 'signin',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static signinOTP(username:string, otp:string) {
        const data = {
            'username': username,
            'key': otp
        }
        return apiHelper.publicReq({
            method: 'POST',
            url: Config.Origin + Config.RootApiEndpoint + 'signinOTP',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
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
        return apiHelper.privateReq({
            method: 'DELETE',
            url: Config.Origin + Config.RootApiEndpoint + 'signout',
        })
    }
}

export default AuthApi