import Rest from './baseConnection'

const getCountries = async () => {
    return await Rest({
        method: 'GET',
        url: '/api/v1/staticOptions/allCountries'
    })
}

export default {
    getCountries
}
