
import { useContext } from 'react'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import LocalStorageContext from '../contexts/localStorageContext.js'

const ThemeToggle = (props) => {

    const { localStorageContext, toggleThemeMode}  = useContext(LocalStorageContext)

    return (
        <div style={{ display: 'inline-block' }}>
            {
                !Boolean(props.noLabel)? (
                    <Typography variant="caption" display="inline-block" gutterBottom>
                        Dark Mode
                    </Typography>
                ): null
            }
            <Switch
                size='small'
                checked={localStorageContext.themeMode === 'dark'}
                onChange={() => {
                    toggleThemeMode()
                }} />
        </div>
    )
}

export default ThemeToggle