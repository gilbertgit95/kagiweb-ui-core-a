import apiHelper from './apiHelper';
import Config from '../../config';

class AuthApi {
    public static signin(username:string, password:string) {
        const data = {
            'username': username,
            'password': password
        }

        return apiHelper.publicReq({
            method: 'POST',
            url: Config.Origin + Config.RootApiEndpoint + 'signin?rand=' + Math.ceil(Math.random() * 1e12) ,
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
        const data = {
            'username': username,
            'password': password,
            'email': email,
            'phone': phone
        }
        return apiHelper.publicReq({
            method: 'POST',
            url: Config.Origin + Config.RootApiEndpoint + 'signup',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static forgotPassword(username:string) {
        const data = {
            'username': username
        }
        return apiHelper.publicReq({
            method: 'POST',
            url: Config.Origin + Config.RootApiEndpoint + 'forgotPassword',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static resetPassword(username:string, resetKey:string, newPassword:string) {
        const data = {
            'username': username,
            'key': resetKey,
            'newPassword': newPassword
        }
        return apiHelper.publicReq({
            method: 'PUT',
            url: Config.Origin + Config.RootApiEndpoint + 'resetPassword',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
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