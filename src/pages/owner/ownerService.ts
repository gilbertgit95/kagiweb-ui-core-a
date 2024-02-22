import OwnerApi from "../../dataEndpoints/apiCoreA/ownerApi"
import { ISignedInUser } from "../../stores/signedInUserSlice"
import { IUser, IUserUpdate } from "../../types/user";

class OwnerService {
    public static getOwner():Promise<{data: IUser}> {
        return OwnerApi.getOwner()
    }

    public static updateOwner(user:IUserUpdate):Promise<{data: IUser}> {
        return OwnerApi.updateOwner(user)
    }

    public static reqOwnerCompleteInfo():Promise<{data: ISignedInUser}> {
        return OwnerApi.getOwnerCompleteInfo()
    }
}

export default OwnerService