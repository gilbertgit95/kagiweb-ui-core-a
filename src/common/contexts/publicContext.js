import { useState, useEffect, createContext } from 'react'
import config from '../../config'
import utils from '../utilities'

const PublicContext = createContext({
    publicContext: {},
    setPublicContext(data) { return },
})
export default PublicContext

export const usePublicContext = () => {
    const [publicContext, setPublicContext] = useState({})

    useEffect(() => {
      let init = async () => {
      }

      init()

    }, [])

    return {
      publicContext,
      setPublicContext
    }
}