import { useState, useRef, useContext } from 'react'
import Link from '@mui/material/Link'
// import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import LoginIcon from '@mui/icons-material/Login'
// import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import RotateLeftIcon from '@mui/icons-material/RotateLeft'

import RouterContext, { useRouterContext } from '../../common/contexts/routerContext'
import LoadingButton from '../../common/atomicComponents/loadingButton'
import Rest from '../../common/datasource/rest'
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
        error: null
    })
    const routerCtx = useContext(RouterContext)
    const [resetKey, setResetKey] = useState(key? key: '')
    const usernameRef = useRef()
    const resetKeyRef = useRef()
    const newPasswordRef = useRef()
    const confirmPasswordRef = useRef()

    const onChangeResetKey = (e) => {
        setResetKey(e.target.value)
    }

    const handleResetKeyValue = (e) => {
        let keyVal = key? key: ''
        setResetKey(keyVal)
    }

    const resetPassword = async () => {
        let resetReq = null
        let error = null
        let formData = new FormData()

        // check if fields are not empty
        if (!( usernameRef.current.value
            && resetKeyRef.current.value
            && newPasswordRef.current.value
            && confirmPasswordRef.current.value)) {
            error = 'One of the fields is empty.'
            setInternalStates({...internalstates, ...{error}})
            return 
        }

        // check if new password matches the confim pass
        if (newPasswordRef.current.value !== confirmPasswordRef.current.value) {
            error = 'Password does not match.'
            setInternalStates({...internalstates, ...{error}})
            return 
        }

        formData.append('username', usernameRef.current.value)
        formData.append('resetKey', resetKeyRef.current.value)
        formData.append('newPassword', newPasswordRef.current.value)

        setInternalStates({...internalstates, ...{resetProgress: true}})
        try {
            resetReq = await Rest({
                method: 'POST',
                url: '/api/v1/auth/passwordReset',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
        } catch (err) {
            error = err.response.data.message
        }
        setInternalStates({...internalstates, ...{resetProgress: false, error}})

        // change route to login page
        if (resetReq) {
            routerCtx.setRouterContext(`/${ config.rootRoute }/auth/login`)
        }
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
                    size='small'
                    fullWidth
                    variant='outlined'
                    color='primary'
                    inputRef={usernameRef}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            resetKeyRef.current.focus()
                        }
                    }}
                    label='Username' />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    value={resetKey}
                    onChange={onChangeResetKey}
                    inputRef={resetKeyRef}
                    size='small'
                    fullWidth
                    variant='outlined'
                    color='primary'
                    type='text'
                    label='Reset Key'
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            newPasswordRef.current.focus()
                        }
                    }}
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
                    inputRef={newPasswordRef}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            confirmPasswordRef.current.focus()
                        }
                    }}
                    label='New Password' />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    size='small'
                    fullWidth
                    variant='outlined'
                    color='primary'
                    type='password'
                    inputRef={confirmPasswordRef}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            resetPassword()
                        }
                    }}
                    label='Confirm Password' />
            </Grid>

            {/* error message */}
            {
                internalstates.error? (
                    <Grid item xs={12}>
                        <ReportProblemIcon color='secondary' style={{ fontSize: 15, marginRight: 5 }} />
                        <Typography variant='body1' component='span' color='secondary'>
                            Error while trying to request a password reset code. { internalstates.error }
                        </Typography>
                    </Grid>
                ): null
            }

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