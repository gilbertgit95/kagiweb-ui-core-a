import { useState } from 'react'
import Link from '@mui/material/Link'
// import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import LoginIcon from '@mui/icons-material/Login'
// import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import RotateLeftIcon from '@mui/icons-material/RotateLeft'

import LoadingButton from '../../common/atomicComponents/loadingButton'
import utils from '../../common/utilities'
import config from '../../config'

import {
    useParams
} from "react-router-dom";

const ResetPassword = (props) => {
    const { key } = useParams()
    const [internalstates, setInternalStates] = useState({
        resetProgress: false,
        newPassword: '',
        confirmPassword: '',
        resetKey: '',
        errors: []
    })
    const [resetKey, setResetKey] = useState(key? key: '')

    const onChangeResetKey = (e) => {
        setResetKey(e.target.value)
    }

    const handleResetKeyValue = (e) => {
        let keyVal = key? key: ''
        setResetKey(keyVal)
    }

    const resetPassword = async () => {
        setInternalStates({...internalstates, ...{resetProgress: true}})
        await utils.waitFor(2)
        setInternalStates({...internalstates, ...{resetProgress: false}})
    }


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>
                    Please enter the correct key and the new password you wanted.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    value={resetKey}
                    onChange={onChangeResetKey}
                    size='small'
                    fullWidth
                    variant='outlined'
                    color='primary'
                    type='text'
                    label='Reset Key'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Reset key"
                                    onClick={handleResetKeyValue}
                                    edge="end">
                                    <RotateLeftIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }} />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    size='small'
                    fullWidth
                    variant='outlined'
                    color='primary'
                    type='password'
                    label='New Password' />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    size='small'
                    fullWidth
                    variant='outlined'
                    color='primary'
                    type='password'
                    label='Confirm Password' />
            </Grid>

            <Grid item xs={12}>
                <LoadingButton
                    size='small'
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={resetPassword}
                    isLoading={internalstates.resetProgress}
                    startIcon={<LoginIcon />}>
                    Reset
                </LoadingButton>
                <Box style={{marginTop: 15}}>
                    <Link
                        style={{margin: 10}}
                        color="inherit"
                        href={`/${ config.rootRoute }/auth/forgotPassword`}>
                        Forgot password
                    </Link>
                    <Link
                        style={{margin: 10}}
                        color="inherit"
                        href={`/${ config.rootRoute }/auth/login`}>
                        Login
                    </Link>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ResetPassword