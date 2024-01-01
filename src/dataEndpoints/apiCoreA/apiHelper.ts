import axios, { AxiosRequestConfig } from "axios"
// import Config from "../../utils/config"

export class Api {
    private authToken:string|undefined
    
    public setToken(token:string|undefined = undefined):void {
        this.authToken = token
    }

    public privateReq(config:AxiosRequestConfig) {
        if (!config.headers) config['headers'] = {}
        config.headers['Authorization'] = this.authToken

        return axios(config)
    }

    public publicReq(config:AxiosRequestConfig) {
        return axios(config)
    }
}

const api = new Api()

export default api