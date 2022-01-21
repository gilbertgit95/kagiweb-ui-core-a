import { useEffect, useState, createContext } from 'react'

const AccountContext = createContext({
    accountContext: {},
    setAccountContext(data) { return }
})
export default AccountContext

export const UseAccountContext = () => {
    const [accountContext, setAccountContext] = useState({})

    return [accountContext, setAccountContext]
}