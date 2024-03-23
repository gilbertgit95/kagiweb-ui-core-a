import apiHelper from "./apiHelper";
import Config from "../../config";
import { IPageQuery } from "../../types/mixTypes";

class WorkspaceApi {
    public static getWorkspaces(query:IPageQuery = {}) {
        const page =  query.hasOwnProperty('page')? 'page=' + query.page: null
        const pageSize = query.hasOwnProperty('pageSize')? 'pageSize=' + query.pageSize: null

        const queries = [page, pageSize].filter(item => item)
        const strQueries = queries.join('&')

        return apiHelper.privateReq({
            method: 'GET',
            url: Config.ServerAddress + Config.RootApiEndpoint + `workspaces${ queries.length? '?' + strQueries: '' }`
        })
    }
}

export default WorkspaceApi