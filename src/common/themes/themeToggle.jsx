
import React, { useState, useEffect, useContext } from 'react'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import LocalStorageContext from '../context/localStorageContext.js'

const ThemeToggle = (props) => {

    const { localStorageContext, toggleThemeMode}  = useContext(LocalStorageContext)

    return (
        <div>
            <Typography variant="caption" display="inline-block" gutterBottom>
                Dark Mode
            </Typography>
            <Switch
                checked={localStorageContext.themeMode == 'dark'}
                onChange={() => {
                    toggleThemeMode()
                }} />
        </div>
    )
}

export default ThemeToggle