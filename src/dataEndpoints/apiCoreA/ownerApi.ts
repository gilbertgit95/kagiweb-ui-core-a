import apiHelper from "./apiHelper";
import Config from "../../utils/config";

class OwnerApi {
    public static getOwner() {
        return apiHelper.privateReq({
            method: 'GET',
            url: Config.Origin + Config.RootApiEndpoint + 'owner'
        })
    }

    public static getOwnerCompleteInfo() {
        return apiHelper.privateReq({
            method: 'GET',
            url: Config.Origin + Config.RootApiEndpoint + 'owner/completeInfo'
        })
    }
}

export default OwnerApi