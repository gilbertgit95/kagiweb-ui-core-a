import axios from 'axios'
import LS from '../../utilities/localStorage'

const RestConnector = (data = {}) => {
    let lsData = LS.getItem('app_info')

    let headers = {
        headers: {
            ...{ authorization: lsData && lsData.authKey? lsData.authKey: '' },
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