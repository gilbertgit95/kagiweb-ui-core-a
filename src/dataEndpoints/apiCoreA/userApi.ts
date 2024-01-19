import apiHelper from "./apiHelper";
import Config from "../../utils/config";

class UserApi {
    public static getUsers() {
        return apiHelper.privateReq({
            method: 'GET',
            url: Config.Origin + Config.RootApiEndpoint + 'users'
        })
    }
}

export default UserApi