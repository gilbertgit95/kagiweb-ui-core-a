import Rest from './baseConnection'

const getAccountInfo = async () => {
    return await Rest({
        method: 'GET',
        url: '/api/v1/loggedAccount'
    })
}

const updateCredential = async (data) => {

}


export default {
    getAccountInfo,
    updateCredential
}
