import usersApi from "../../dataEndpoints/apiCoreA/userApi"
// import { ISignedInUser } from "../../stores/signedInUserSlice"

class UserService {
    public static getUsers() {
        return usersApi.getUsers()
    }
}

export default UserService