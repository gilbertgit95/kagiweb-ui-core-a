import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'

const RouterContext = createContext({
    routerContext: null,
    setRouterContext(data) { return }
})
export default RouterContext

export const useRouterContext = () => {
    const [routerContext, setRouterContext] = useState(null)
    const navigate = useNavigate()

    // life cycles
    useEffect(() => {
        // use to navigate
        if (routerContext) {
        //   console.log('change route in router context triggered: ', routerContext)
          navigate(routerContext)
        }
    }, [routerContext])

    return {routerContext, setRouterContext}
}