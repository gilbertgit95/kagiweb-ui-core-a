import React, { createContext } from 'react'

import AuthContext from './authContext'
import AccountContext from './accountContext'

export const context = {
    ...AuthContext,
    ...AccountContext
}

export default createContext(context)