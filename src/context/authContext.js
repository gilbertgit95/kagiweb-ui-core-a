import React, { useEffect, useState } from 'react'

const AuthContext = (props) => {
    const [authData, setAuthData] = useState(0)

    return {
        authContext: {
            authData,
            setAuthData
        }
    }
}

export default AuthContext