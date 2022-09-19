import axios from 'axios'
import LS from '../../utilities/localStorage'
import config from '../../../config'

// this error messages are indicators for invalid tokens
const errorMessages = new Set([
    'Bad request, Invalid authorization.',
    'Bad request, no authorization supplied in the request.'
])
const pathNotToCheck = [
    `/${ config.rootRoute }/auth`,
    `/${ config.rootRoute }/public`
]

const errorMessagesIsInvalid = (error) => {
    if (   error.response.data 
        && error.response.data.message
        && errorMessages.has(error.response.data.message)
        && error.response.status === 400) {
        return true
    }

    return false
}

const isPathOnTheNotTocheckList = (path) => {
    return pathNotToCheck.some(item => {
        return path.indexOf(item) === 0
    })
}

axios.interceptors.response.use(
    response => response,
    error => {
        let currPath = window.location.pathname

        // console.log('interceptor')

        // redirect to signin page when token is invalid
        if (   errorMessagesIsInvalid(error)
            && !isPathOnTheNotTocheckList(currPath)) {
            // console.log('redirect to login auth!!')
            window.location.replace(`/${ config.rootRoute }/auth/`)
        }
        
        return Promise.reject(error);
    }
)

const RestConnector = (data = {}) => {
    let lsData = LS.getItem('app_info')

    let headers = {
        headers: {
            ...{ 'Authorization': lsData && lsData.authKey? lsData.authKey: '' },
            ...( data && data.headers? data.headers: {} )
        }
    }

    return axios({
        ...headers,
        ...data,
        ...{
            url: origin + data.url
        }
    })
}

export default RestConnector