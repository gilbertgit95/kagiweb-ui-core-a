import { useState, useEffect, createContext } from 'react'

import testEndpoints from './testData/testEndpoints'
import testRoles from './testData/testRoles'
import testUsers from './testData/testUsers'

// import config from '../../config'
// import utils from '../utilities'
// import LocalStorage from '../utilities/localStorage'

const AdminContext = createContext({
    adminContext: {
      endpoints: [],
      roles: []
    },
    setAdminContext(data) { return }
})
export default AdminContext

export const useAdminContext = () => {
    const [adminContext, setAdminContext] = useState({
      endpoints: testEndpoints,
      roles: testRoles,
      users: testUsers
    })

    return {
      adminContext,
      setAdminContext
    }
}