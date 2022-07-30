import { useState } from 'react'
import Link from '@mui/material/Link'
// import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import LoginIcon from '@mui/icons-material/Login'
// import Button from '@mui/material/Button'
import EmailIcon from '@mui/icons-material/Email'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
import Tooltip from '@mui/material/Tooltip'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import LoadingButton from '../../common/atomicComponents/loadingButton'
import utils from '../../common/utilities'
import config from '../../config'

const ForgotPassword = (props) => { 
    const [internalstates, setInternalStates] = useState({
        forgotProgress: false,
        addressType: 'email',
        addressValue: '',
        errors: []
    })

    const promptText = {
        email: 'A password reset code or link will be sent to this email address.',
        phone: 'A password reset code or link will be sent to this phone number.'
    }

    const switchMethod = (e, method) => {
        setInternalStates({...internalstates, ...{addressType: method}})
    }

    const forgotRequest = async () => {
        setInternalStates({...internalstates, ...{forgotProgress: true}})
        await utils.waitFor(2)
        setInternalStates({...internalstates, ...{forgotProgress: false}})
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} style={{marginTop: 0, paddingTop: 0, textAlign: 'right'}}>
                <ToggleButtonGroup
                    value={internalstates.addressType}
                    exclusive
                    onChange={switchMethod}
                    aria-label="Address Type">
                    <ToggleButton size="small" value="email">
                        <Tooltip title="Send reset code to my Email">
                            <EmailIcon />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton size="small" value="phone">
                        <Tooltip title="Send reset code to my Phone">
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
                    label={ internalstates.addressType === 'email'? 'Email Address': 'Phone Number' } />
            </Grid>

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
                        color="inherit"
                        href={`/${ config.rootRoute }/auth/login`}>
                        Back to login
                    </Link>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ForgotPassword