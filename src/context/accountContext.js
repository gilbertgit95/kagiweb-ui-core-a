import { useEffect, useState } from 'react'

const AccountContext = (props) => {
    const [accountData, setAccountData] = useState({})

    return {
        accountData,
        setAccountData
    }
}

export default AccountContext