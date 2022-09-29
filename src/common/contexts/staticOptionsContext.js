import { useState, createContext } from 'react'
import Rest from '../datasource/rest/'

const StaticOptionsContext = createContext({
    staticOptionsContext: {
        countries: {isLoading: false, list: []}
    },
    setStaticOptionsContext(data) { return },
    fetchAllCountries() { return }
})
export default StaticOptionsContext

export const useStaticOptionsContext = () => {
    const [staticOptionsContext, setStaticOptionsContext] = useState({
        countries: {isLoading: false, list: []}
    })

    const fetchAllCountries = async () => {
        let countries = {}

        console.log('fetch countries')

        // check if all countries are already loaded,
        // if its true, then cancel the process
        if (!staticOptionsContext.countries.isLoading && !staticOptionsContext.countries.list.length) {
            setStaticOptionsContext({...staticOptionsContext, ...{ countries: {isLoading: true, list: []}}})

            try {
                countries = await Rest.staticOptions.getCountries()
            } catch(err) {
                // for the main taime, do nothing
            }
            setStaticOptionsContext({...staticOptionsContext, ...{ countries: {isLoading: false, list: countries.data? countries.data: []}}})
        }
    }

    return {staticOptionsContext, setStaticOptionsContext, fetchAllCountries}
}