import React, { useEffect, useState, createContext } from 'react'

const storageName = 'app_info'

let defaultValue = {
    themeMode: 'light'
}

const LocalStorageContext = createContext({
    localStorageContext: defaultValue,
    updateLocalStorage(data) { return },
    toggleThemeMode() { return }
})
export default LocalStorageContext

export const UseLocalStorageContext = () => {
    const [localStorageContext, setLocalStorageContext] = useState(defaultValue)

    const updateLocalStorage = (valObj) => {
        let newStorageVal = {...localStorageContext, ...valObj}
        setLocalStorageContext(newStorageVal)
        localStorage.setItem(storageName, JSON.stringify(newStorageVal))
    }

    const toggleThemeMode = () => {
        let themeMode = localStorageContext.themeMode
        let newThemeMode = (themeMode && themeMode == 'light')? 'dark': 'light'
        updateLocalStorage({themeMode: newThemeMode})
    }

    useEffect(() => {
        let localStoreVal = localStorage.getItem(storageName)
        let parsedVal = defaultValue

        if (localStoreVal) {
            parsedVal = JSON.parse(localStoreVal)
        } else {
            updateLocalStorage(parsedVal)
        }

    }, [])

    return {localStorageContext, updateLocalStorage, toggleThemeMode}
}