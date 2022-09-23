import { useState, useContext, useEffect } from 'react'

// import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
// import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import EditIcon from '@mui/icons-material/Edit'

import { useSnackbar } from 'notistack'

// import AccountContext from '../../common/contexts/accountContext'
import AccountProfileView from './components/accountProfileView'
import AccountProfileEdit from './components/accountProfileEdit'
import OpenCloseBox from '../../common/blocks/openCloseBox'

import AccountContext from '../../common/contexts/accountContext'

import Rest from '../../common/datasource/rest'

const AccountProfile = (props) => {
    const [states, setStates] = useState({
        openUpdate: false
    })
    const accCtx = useContext(AccountContext)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const saveProfile = async (data = {}) => {

        let result = null
        try {
            result = await Rest.loggedAccount.updateProfile(data)
            // refetch account info
            await accCtx.fetchAccountData()
            // show success notification
            enqueueSnackbar(result.data.message, { variant: 'info' });
        } catch (err) {
            throw(err.response.data.message)
        }
    }

    // useEffect(() => {
    //     accCtx.fetchAccountData()
    // }, [])

    return (
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={12} style={{ paddingTop: 30 }}>
                    {/* <Typography>Account Core Content</Typography> */}
                    { !states.openUpdate? <AccountProfileView accountInfo={accCtx.accountContext} />: null }
                    <OpenCloseBox
                        btnIcon={ <EditIcon /> }
                        btnLabel={ 'Update Profile' }
                        isOpen={ states.openUpdate }
                        onOpen={ () => {
                            setStates({ ...states, ...{ openUpdate: true } })
                        }}
                        onClose={ () => {
                            setStates({ ...states, ...{ openUpdate: false } })
                        }}>
                        <AccountProfileEdit
                            accountInfo={accCtx.accountContext}
                            onSaveData={saveProfile} />
                    </OpenCloseBox>
                </Grid>
            </Grid>
        </Container>
    )
}

export default AccountProfile