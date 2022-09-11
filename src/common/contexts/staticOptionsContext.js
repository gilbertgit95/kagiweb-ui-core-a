import { useState, useEffect, createContext } from 'react'
import Rest from '../datasource/rest/'

const StaticOptionsContext = createContext({
    staticOptionsContext: {
        countries: {isLoading: false, list: []}
    },
    setStaticOptionsContext(data) { return }
})
export default StaticOptionsContext

export const useStaticOptionsContext = () => {
    const [staticOptionsContext, setStaticOptionsContext] = useState({
        countries: {isLoading: false, list: []}
    })

    useEffect(() => {
        const init = async () => {
          let countries = []

          try {
            countries = await Rest.staticOpons.getCountries()
          } catch(err) {

          }
        }
        // fetch
        init()
    }, [])

    return {staticOptionsContext, setStaticOptionsContext}
}