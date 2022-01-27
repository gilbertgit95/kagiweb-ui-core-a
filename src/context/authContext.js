import { useEffect, useState, createContext } from 'react'

const AuthContext = createContext({
    authContext: {},
    setAuthContext(data) { return }
})
export default AuthContext

export const UseAuthContext = () => {
    const [authContext, setAuthContext] = useState({})

    return {authContext, setAuthContext}
}