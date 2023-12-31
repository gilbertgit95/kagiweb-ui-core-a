import api from "./api";
import Config from "../../utils/config";

class AuthApi {
    public static signin(username:string, password:string) {
        return api.publicReq({
            method: 'POST',
            url: Config.Origin + Config.RootApiEndpoint + 'signin',
        })
    }

    public static signinOtp(username:string, otp:string) {
        
    }

    public static forgotPassword(email:string) {
        
    }

    public static resetPassword(email:string, resetKey:string) {
        
    }
}

export default AuthApi