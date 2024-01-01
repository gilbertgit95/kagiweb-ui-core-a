import apiHelper from "./apiHelper";
import Config from "../../utils/config";

class OwnerApi {
    public static getOwner() {
        return apiHelper.privateReq({
            method: 'GET',
            url: Config.Origin + Config.RootApiEndpoint + 'owner'
        })
    }
}

export default OwnerApi