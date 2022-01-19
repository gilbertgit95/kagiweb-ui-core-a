import React, { useEffect, useState } from 'react'

const AuthContext = (props) => {
    const [authData, setAuthData] = useState({})

    return {
        authData,
        setAuthData
    }
}

export default AuthContext