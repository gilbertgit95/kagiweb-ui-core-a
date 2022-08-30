import { useState, useContext, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import EditIcon from '@mui/icons-material/Edit'

import { useSnackbar } from 'notistack'

// import AccountContext from '../../common/contexts/accountContext'
import OpenCloseBox from '../../common/blocks/openCloseBox'
import AccountView from './components/accountCredentialsView'
import AccountEdit from './components/accountCredentialsEdit'

import AccountContext from '../../common/contexts/accountContext'

import Rest from '../../common/datasource/rest'

const AccountCredentials = (props) => {
    const [states, setStates] = useState({
        openUpdate: false
    })
    const accCtx = useContext(AccountContext)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const saveCredential = async (data = {}) => {
            // enqueueSnackbar('test notification 1', {
            //     variant: 'info',
            // });
            // enqueueSnackbar('test notification 1', {
            //     variant: 'error',
            //     persist: true,
            //     action: (key) => (
            //         <Button
            //             color='primary'
            //             variant='contained'
            //             onClick={() => { closeSnackbar(key) }}>
            //             Dismiss
            //         </Button>
            //     )
            // });
            // enqueueSnackbar('test notification 1', {
            //     variant: 'warning',
            //     autoHideDuration: 10000,
            // });
            // enqueueSnackbar('test notification 1', {
            //     variant: 'success'
            // });
        let result = null
        try {
            result = await Rest.loggedAccount.updateCredential(data)
            enqueueSnackbar(result.data.message, { variant: 'info' });
        } catch (err) {
            throw(err.response.data.message)
        }
    }

    return (
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={12} style={{ paddingTop: 30 }}>
                    {/* <Typography>Account Core Content</Typography> */}
                    { !states.openUpdate? <AccountView accountInfo={accCtx.accountContext} />: null }
                    <OpenCloseBox
                        btnIcon={ <EditIcon /> }
                        btnLabel={ 'Update Credentials' }
                        isOpen={ states.openUpdate }
                        onOpen={ () => {
                            setStates({ ...states, ...{ openUpdate: true } })
                        }}
                        onClose={ () => {
                            setStates({ ...states, ...{ openUpdate: false } })
                        }}>
                        <AccountEdit
                            updateType='loggedinAccount'
                            accountInfo={accCtx.accountContext}
                            onSaveData={saveCredential} />
                    </OpenCloseBox>
                </Grid>
            </Grid>
        </Container>
    )
}

export default AccountCredentials