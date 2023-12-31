import api from "./api";
import Config from "../../utils/config";

class OwnerApi {
    public static getOwner() {
        return api.privateReq({
            method: 'GET',
            url: Config.Origin + Config.RootApiEndpoint + 'owner'
        })
    }
}

export default OwnerApi