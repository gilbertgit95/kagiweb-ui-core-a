import workspaceApi from "../../dataEndpoints/apiCoreA/workspaceApi"
// import { ISignedInUser } from "../../stores/signedInUserSlice"
import { IWorkspace} from "../../types/workspace"
import { IPagination, IPageQuery } from "../../types/mixTypes"

class WorkspaceService {
    public static getWorkspaces(query:IPageQuery):Promise<{data: IPagination<IWorkspace>}> {
        return workspaceApi.getWorkspaces(query)
    }
}

export default WorkspaceService