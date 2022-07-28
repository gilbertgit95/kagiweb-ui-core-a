import { useState, useEffect, createContext } from 'react'

import googleDrive from '../datasource/external/googleDrive'
import config from '../../config'
import utils from '../utilities'

const PublicContext = createContext({
    publicContext: {
      aboutMe: null
    },
    setPublicContext(data) { return },
})
export default PublicContext

export const usePublicContext = () => {
    const [publicContext, setPublicContext] = useState({
      aboutMe: null
    })

    useEffect(() => {
      let init = async () => {
        let resp = await googleDrive.fetchAboutMe()
        console.log('public context', resp)

        setPublicContext({...publicContext, ...{ aboutMe: resp }})
      }

      init()

    }, [])

    return {
      publicContext,
      setPublicContext
    }
}