import axios, { AxiosRequestConfig } from 'axios'

export class Api {
    private authToken:string|undefined
    
    public useToken(token:string|undefined|null):void {
        this.authToken = typeof token === 'string'? token: undefined
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