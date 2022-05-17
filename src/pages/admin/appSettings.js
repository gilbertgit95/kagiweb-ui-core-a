import { useState, useEffect } from 'react'
import subpages from './lib/subPages'

import SubPageslayout from '../../common/layouts/subPagesLayout'

// import Link from '@mui/material/Link'
// import Container from '@mui/material/Container'
// import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
// import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import EditIcon from '@mui/icons-material/Edit'
// import Typography from '@mui/material/Typography'
// import TextField from '@mui/material/TextField'
// import LoginIcon from '@mui/icons-material/Login'
// import Button from '@mui/material/Button'

// import AccountContext from '../../common/contexts/accountContext'
import AppSettingsView from './components/appSettingsView'
import AppSettingsEdit from './components/appSettingsEdit'
import OpenCloseBox from '../../common/blocks/openCloseBox'

const AppSettings = (props) => {
    const [states, setStates] = useState({
        openUpdate: false
    })

    return (
        <SubPageslayout
            navAnchor={'left'}
            navMenu={subpages}>
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{ paddingTop: 30, textAlign: 'left' }}>
                        {/* <Typography>Account Core Content</Typography> */}
                        { !states.openUpdate? <AppSettingsView />: null }
                        <OpenCloseBox
                            btnIcon={ <EditIcon /> }
                            btnLabel={ 'Update Settings' }
                            isOpen={ states.openUpdate }
                            onOpen={ () => {
                                setStates({ ...states, ...{ openUpdate: true } })
                            }}
                            onClose={ () => {
                                setStates({ ...states, ...{ openUpdate: false } })
                            }}>
                            <AppSettingsEdit />
                        </OpenCloseBox>
                    </Grid>
                </Grid>
            </Container>
        </SubPageslayout>
    )
}

export default AppSettings