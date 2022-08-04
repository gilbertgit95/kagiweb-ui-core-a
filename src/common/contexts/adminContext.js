import { useState, useEffect, createContext } from 'react'

import testEndpoints from './testData/testEndpoints'
import testRoles from './testData/testRoles'
import testUsers from './testData/testUsers'
import testRoleEndpoints from './testData/testRoleEndpoints'

// import config from '../../config'
// import utils from '../utilities'
// import LocalStorage from '../utilities/localStorage'

const AdminContext = createContext({
    adminContext: {
      endpoints: [],
      roles: [],
      users: [],
      roleEndpoints: []
    },
    setAdminContext(data) { return }
})
export default AdminContext

export const useAdminContext = () => {
    const [adminContext, setAdminContext] = useState({
      endpoints: testEndpoints,
      roles: testRoles,
      users: testUsers,
      roleEndpoints: testRoleEndpoints
    })

    return {
      adminContext,
      setAdminContext
    }
}