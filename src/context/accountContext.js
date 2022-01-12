import { useEffect, useState } from 'react'

const AccountContext = (props) => {
    const [accountData, setAccountData] = useState(0)

    return {
        accountContext: {
            accountData,
            setAccountData
        }
    }
}

export default AccountContext