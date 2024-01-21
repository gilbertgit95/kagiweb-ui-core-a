import apiHelper from "./apiHelper";
import Config from "../../utils/config";
import { IPageQuery } from "../../types/mixTypes";

class FeatureApi {
    public static getFeatures(query:IPageQuery = {}) {
        const page =  query.hasOwnProperty('page')? 'page=' + query.page: null
        const pageSize = query.hasOwnProperty('pageSize')? 'pageSize=' + query.pageSize: null

        const queries = [page, pageSize].filter(item => item)
        const strQueries = queries.join('&')

        return apiHelper.privateReq({
            method: 'GET',
            url: Config.Origin + Config.RootApiEndpoint + `features${ queries.length? '?' + strQueries: '' }`
        })
    }
}

export default FeatureApi