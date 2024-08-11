import apiHelper from './apiHelper';
import appComponentsHandler from '../../utils/appComponentsHandler'

class AuthApi {
    public static signin(nameId:string, password:string) {
        const data = {
            'nameId': nameId,
            'password': password
        }

        return apiHelper.publicReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + 'signin?rand=' + Math.ceil(Math.random() * 1e12) ,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static signinOTP(nameId:string, otp:string) {
        const data = {
            'nameId': nameId,
            'key': otp
        }
        return apiHelper.publicReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + 'signinOTP',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static signup(nameId:string, password:string, email:string, phone:string) {
        const data = {
            'nameId': nameId,
            'password': password,
            'email': email,
            'phone': phone
        }
        return apiHelper.publicReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + 'signup',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static forgotPassword(nameId:string) {
        const data = {
            'nameId': nameId
        }
        return apiHelper.publicReq({
            method: 'POST',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + 'forgotPassword',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static resetPassword(nameId:string, resetKey:string, newPassword:string) {
        const data = {
            'nameId': nameId,
            'key': resetKey,
            'newPassword': newPassword
        }
        return apiHelper.publicReq({
            method: 'PUT',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + 'resetPassword',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data
        })
    }

    public static signout() {
        return apiHelper.privateReq({
            method: 'DELETE',
            url: appComponentsHandler.appConfig.ServerAddress + appComponentsHandler.appConfig.RootApiEndpoint + 'signout',
        })
    }
}

export default AuthApi