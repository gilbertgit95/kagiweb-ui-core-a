import { useEffect, useState, createContext } from 'react'
import LocalStorage from '../utilities/localStorage'
import config from '../../config'

let defaultValue = {
    themeMode: 'light',
    authKey: null
}

const LocalStorageContext = createContext({
    localStorageContext: defaultValue,
    updateLocalStorage(data) { return },
    toggleThemeMode() { return }
})
export default LocalStorageContext

export const useLocalStorageContext = () => {
    const storageName = config.localStorageName
    const [localStorageContext, setLocalStorageContext] = useState({})

    const updateLocalStorage = (obj) => {
        let newStorageVal = {...localStorageContext, ...obj}
        setLocalStorageContext(newStorageVal)
        LocalStorage.setItem(storageName, newStorageVal)
    }

    const toggleThemeMode = () => {
        let themeMode = localStorageContext.themeMode
        let newThemeMode = (themeMode && themeMode === 'light')? 'dark': 'light'
        updateLocalStorage({themeMode: newThemeMode})
    }

    useEffect(() => {
        let init = () => {
            let store = LocalStorage.getItem(storageName)

            if (store) {
                setLocalStorageContext(store)
            } else {
                setLocalStorageContext(defaultValue)
                LocalStorage.setItem(storageName, defaultValue)
            }
        }

        init()

    }, [])

    return {
        localStorageContext,
        updateLocalStorage,
        toggleThemeMode
    }
}