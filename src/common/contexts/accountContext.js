import { useState, useEffect, createContext } from 'react'
import config from '../../config'
import utils from '../utilities'
import LocalStorage from '../utilities/localStorage'
import Rest from '../datasource/rest'

import LocalStorageContext from './localStorageContext'

const AccountContext = createContext({
    accountContext: {},
    setAccountContext(data) { return },
    fetchAccountData() { return},
    signIn() { return },
    signOut() { return }
})
export default AccountContext

export const useAccountContext = (props) => {
    const storageName = config.localStorageName

    const [accountContext, setAccountContext] = useState({})

    const signIn = async ({username, password}) => {
      console.log('account data is being fetched by signing in')
      setAccountContext({
        ...accountContext,
        ...{'__isLoading': true}
      })
      let authData = null
      let error = null
      let formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)

      try {
        authData = await Rest.auth.signIn({ formData })
      } catch (err) {
        error = err.response.data.message
      }

      // check if if there are no response token
      if (!authData) {
        return { error }
      }

      setAccountContext({...authData.data.user, ...{
        '__isLoading': false,
        '__isLoggedIn': true,
      }})
      console.log('account data has loaded')
      return { authKey: authData.data.accessToken }
    }

    const signOut = async () => {
      setAccountContext({'__isLoading': false})
    }

    const fetchAccountData = async () => {
      let localStoreVal = LocalStorage.getItem(storageName)
      let lsVal = localStoreVal? localStoreVal: {}

      if (lsVal.authKey) {
        console.log('account data is being fetched by using authKey')
        setAccountContext({
          ...accountContext,
          ...{'__isLoading': true}
        })
        let userData = null
        let error = null
        // await utils.waitFor(5)
        try {
          userData = await Rest.loggedAccount.getAccountInfo()
        } catch (err) {
          error = err.response.data.message
        }

        // check if if there are no response token
        if (!userData) {
          setAccountContext({
            ...accountContext,
            ...{
              '__isLoading': false,
              '__isLoggedIn': false
            }
          })
          return
        }

        setAccountContext({...userData.data, ...{
          '__isLoading': false,
          '__isLoggedIn': true,
        }})
        console.log('account data has loaded')
      } else {
        setAccountContext({
          ...accountContext,
          ...{'__isLoading': false}
        })
      }
    }

    useEffect(() => {
      fetchAccountData()
    }, [])

    return {
      accountContext,
      setAccountContext,
      fetchAccountData,
      signIn,
      signOut
    }
}