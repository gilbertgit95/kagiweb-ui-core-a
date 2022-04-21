import { useEffect, useState, createContext } from 'react'
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

export const UseLocalStorageContext = () => {
    const storageName = config.localStorageName
    const [localStorageContext, setLocalStorageContext] = useState(defaultValue)

    const updateLocalStorage = (valObj) => {
        let newStorageVal = {...localStorageContext, ...valObj}
        setLocalStorageContext(newStorageVal)
        console.log('update ls: ', newStorageVal)
        localStorage.setItem(storageName, JSON.stringify(newStorageVal))
    }

    const toggleThemeMode = () => {
        let themeMode = localStorageContext.themeMode
        let newThemeMode = (themeMode && themeMode === 'light')? 'dark': 'light'
        updateLocalStorage({themeMode: newThemeMode})
    }

    useEffect(() => {
        // console.log('use effect in localstorage')
        let localStoreVal = localStorage.getItem(storageName)
        let parsedVal = defaultValue

        if (localStoreVal) {
            parsedVal = JSON.parse(localStoreVal)
        }

        updateLocalStorage(parsedVal)

    }, [])

    return {
        localStorageContext,
        updateLocalStorage,
        toggleThemeMode
    }
}