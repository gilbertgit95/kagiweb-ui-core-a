import SystemApi, { ISystemInfo } from "../../dataEndpoints/apiCoreA/systemApi"

class SystemService {
    public static getSystemInfo():Promise<{data: ISystemInfo}> {
        return SystemApi.getSystemInfo()
    }
}

export default SystemService