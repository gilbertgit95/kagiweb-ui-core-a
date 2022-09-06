import axios from 'axios'
import LS from '../../utilities/localStorage'
import config from '../../../config'

// this error messages are indicators for invalid tokens
// const errorMessages = new Set([
//     'Bad request, Invalid authorization.',
//     'Bad request, no authorization supplied in the request.'
// ])

// axios.interceptors.response.use( response => response, error => {

//     // redirect to signin page when token is invalid
//     if (   error.response.data 
//         && error.response.data.message
//         && errorMessages.has(error.response.data.message)
//         && error.response.status === 400) {
//         console.log('redirect to login auth')
//         // window.location.replace(`/${ config.rootRoute }/auth/`)
//     }
// })

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