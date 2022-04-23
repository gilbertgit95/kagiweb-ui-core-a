import { useState, useEffect, createContext } from 'react'
import config from '../../config'
import utils from '../utilities'
import LocalStorage from '../utilities/localStorage'

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
        ...{"__isLoading": true}
      })
      await utils.waitFor(2)
      setAccountContext(testAccountData)
      console.log('account data has loaded')
      return { authKey: 'berear_test123' }
    }

    const signOut = async () => {
      setAccountContext({"__isLoading": false})
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
            ...{"__isLoading": true}
          })
          await utils.waitFor(3)
          setAccountContext(testAccountData)
          console.log('account data has loaded')
        } else {
          setAccountContext({
            ...accountContext,
            ...{"__isLoading": false}
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

const testAccountData = {
    "__isLoading": false,
    "__isLoggedIn": true,
    "id": "e79c8692-4cc2-4971-a52c-832e87b27e7f",
    "username": "gilbert95",
    "twoFactorAuth": false,
    "disableAccount": false,
    "primaryEmail": null,
    "secondayEmail": null,
    "primaryEmailVerified": false,
    "secondaryEmailVerified": false,
    "primaryNumber": null,
    "secondayNumber": null,
    "primaryNumberVerified": false,
    "secondaryNumberVerified": false,
    "createdAt": "2021-11-20T15:27:31.513Z",
    "updatedAt": "2021-11-20T15:27:31.513Z",
    "roleId": "6b1b7d6a-c325-4908-912c-f485078a53fc",
    "role": {
        "id": "e79c8692-4cc2-4971-a52c-832e87b46e8f",
        "name": "Super admin",
        "description": "Has access to all endpoints",
        "createdAt": "2021-11-20T15:27:31.513Z",
        "updatedAt": "2021-11-20T15:27:31.513Z"
    },
    "claims": [
        {
            "id": "e79c8692-4cc2-4971-a52c-832e87b11e8f",
            "accountId": "e79c8692-4cc2-4971-a52c-832e87b28e8f",
            "key": "fullName",
            "value": "Master Account",
            "createdAt": "2021-11-20T15:27:31.513Z",
            "updatedAt": "2021-11-20T15:27:31.513Z"
          },
          {
            "id": "e79c8692-4cc2-4971-a52c-832e87b12e8f",
            "accountId": "e79c8692-4cc2-4971-a52c-832e87b28e8f",
            "key": "gender",
            "value": "Male",
            "createdAt": "2021-11-20T15:27:31.513Z",
            "updatedAt": "2021-11-20T15:27:31.513Z"
          },
          {
            "id": "e79c8692-4cc2-4971-a52c-832e87b13e8f",
            "accountId": "e79c8692-4cc2-4971-a52c-832e87b28e8f",
            "key": "language",
            "value": "Bisaya",
            "createdAt": "2021-11-20T15:27:31.513Z",
            "updatedAt": "2021-11-20T15:27:31.513Z"
          },
          {
            "id": "e79c8692-4cc2-4971-a52c-832e87b11e7f",
            "accountId": "e79c8692-4cc2-4971-a52c-832e87b27e7f",
            "key": "fullName",
            "value": "Berto Admin",
            "createdAt": "2021-11-20T15:27:31.513Z",
            "updatedAt": "2021-11-20T15:27:31.513Z"
          },
          {
            "id": "e79c8692-4cc2-4971-a52c-832e87b12e7f",
            "accountId": "e79c8692-4cc2-4971-a52c-832e87b27e7f",
            "key": "gender",
            "value": "Male",
            "createdAt": "2021-11-20T15:27:31.513Z",
            "updatedAt": "2021-11-20T15:27:31.513Z"
          },
          {
            "id": "e79c8692-4cc2-4971-a52c-832e87b13e7f",
            "accountId": "e79c8692-4cc2-4971-a52c-832e87b27e7f",
            "key": "language",
            "value": "Bisaya",
            "createdAt": "2021-11-20T15:27:31.513Z",
            "updatedAt": "2021-11-20T15:27:31.513Z"
          }
    ]
}