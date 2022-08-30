import { useState, useRef, useContext } from 'react'
import Link from '@mui/material/Link'
// import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import LoginIcon from '@mui/icons-material/Login'
// import Button from '@mui/material/Button'
import EmailIcon from '@mui/icons-material/Email'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
import Tooltip from '@mui/material/Tooltip'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import LoadingButton from '../../common/atomicComponents/loadingButton'

import ErrorMessage from '../../common/atomicComponents/errorMessage'
import RouterContext, { useRouterContext } from '../../common/contexts/routerContext'
import utils from '../../common/utilities'
import config from '../../config'

import Rest from '../../common/datasource/rest'

const ForgotPassword = (props) => { 
    const [internalstates, setInternalStates] = useState({
        forgotProgress: false,
        addressType: 'username', // username | email | phone
        error: null
    })
    const valueFieldRef = useRef()
    const routerCtx = useContext(RouterContext)

    const promptText = {
        username: 'A password reset code or link will be sent to your administrator.',
        email: 'A password reset code or link will be sent to this email address.',
        phone: 'A password reset code or link will be sent to this phone number.'
    }

    const switchMethod = (e, method) => {
        setInternalStates({...internalstates, ...{addressType: method}})
    }

    const forgotRequest = async () => {
        let resetReq = null
        let error = null
        let formData = new FormData()

        formData.append('type', internalstates.addressType)
        formData.append('value', valueFieldRef.current.value)

        setInternalStates({...internalstates, ...{forgotProgress: true}})
        try {
            resetReq = await Rest.auth.forgotRequest({ formData })
        } catch (err) {
            error = err.response.data.message
        }
        setInternalStates({...internalstates, ...{forgotProgress: false, error}})

        // change route to reset code page
        if (resetReq) {
            routerCtx.setRouterContext(`/${ config.rootRoute }/auth/resetPassword`)
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} style={{marginTop: 0, paddingTop: 0, textAlign: 'right'}}>
                <ToggleButtonGroup
                    value={internalstates.addressType}
                    exclusive
                    onChange={switchMethod}
                    aria-label='Address Type'>
                    <ToggleButton size='small' value='username'>
                        <Tooltip title='Send reset code to my Administrator.'>
                            <AccountBoxIcon />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton size='small' value='email'>
                        <Tooltip title='Send reset code to my Email'>
                            <EmailIcon />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton size='small' value='phone'>
                        <Tooltip title='Send reset code to my Phone'>
                            <ContactPhoneIcon />
                        </Tooltip>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    { promptText[internalstates.addressType] }
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    size='small'
                    fullWidth
                    variant='outlined'
                    color='primary'
                    type='text'
                    inputRef={ valueFieldRef }
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            forgotRequest()
                        }
                    }}
                    label={ internalstates.addressType } />
            </Grid>

            {/* error message */}
            {
                internalstates.error? (
                    <Grid item xs={12}>
                        <ErrorMessage>
                            Error while trying to request a password reset code.
                            { internalstates.error }
                        </ErrorMessage>
                    </Grid>
                ): null
            }

            <Grid item xs={12}>
                <LoadingButton
                    size='small'
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={forgotRequest}
                    isLoading={internalstates.forgotProgress}
                    startIcon={<LoginIcon />}>
                    Submit
                </LoadingButton>
                <Box style={{marginTop: 15}}>
                    <Link
                        color='inherit'
                        href={`/${ config.rootRoute }/auth/login`}>
                        Back to login
                    </Link>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ForgotPassword