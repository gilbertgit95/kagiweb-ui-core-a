import { useState, useEffect, createContext } from 'react'
import config from '../../config'
import utils from '../utilities'
import LocalStorage from '../utilities/localStorage'
import Rest from '../datasource/rest'

const AccountContext = createContext({
    accountContext: {},
    setAccountContext(data) { return },
    signIn() { return },
    signOut() { return }
})
export default AccountContext

export const useAccountContext = () => {
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
        authData = await Rest({
          method: 'POST',
          url: '/api/v1/auth/login',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
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

    useEffect(() => {
      // check auth key if it exist
      // console.log('authKey: ', lsCtx.localStorageContext.authKey)
      let localStoreVal = LocalStorage.getItem(storageName)
      let lsVal = localStoreVal? localStoreVal: {}

      // if a token exist, then fetch user value using the token
      let init = async () => {
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
            userData = await Rest({
              method: 'GET',
              url: '/api/v1/loggedAccount'
            })
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

      init()

    }, [])

    return {
      accountContext,
      setAccountContext,
      signIn,
      signOut
    }
}