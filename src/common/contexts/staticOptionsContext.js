import { useState, createContext } from 'react'

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

    return {staticOptionsContext, setStaticOptionsContext}
}