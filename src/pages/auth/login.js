import { useState, useContext, useRef } from 'react'

import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import LoginIcon from '@mui/icons-material/Login'
import Typography from '@mui/material/Typography'

import AccountContext from '../../common/contexts/accountContext'
import RouterContext from '../../common/contexts/routerContext'
import LocalStorageContext from '../../common/contexts/localStorageContext'
import LoadingButton from '../../common/atomicComponents/loadingButton'
import utils from '../../common/utilities'
import config from '../../config'

const Login = (props) => {

    const [internalstates, setInternalStates] = useState({
        loginProgress: false,
        password: '',
        username: '',
        error: null
    })
    const routerCtx = useContext(RouterContext)
    const AccCtx = useContext(AccountContext)
    const lsCtx = useContext(LocalStorageContext)

    let passwordRef = useRef()
    let usernameRef = useRef()

    const login = async () => {
        let username = usernameRef.current.value
        let password = passwordRef.current.value

        setInternalStates({...internalstates, ...{loginProgress: true}})
        let loginResult = await AccCtx.signIn({username, password})
        setInternalStates({...internalstates, ...{loginProgress: false, error: loginResult.error}})
        lsCtx.updateLocalStorage({authKey: loginResult.authKey})
    }


    return (
        <Grid container spacing={2}>

            <Grid item xs={12}>
                <TextField
                    inputRef={ usernameRef }
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            passwordRef.current.focus()
                        }
                    }}
                    size='small'
                    fullWidth
                    variant='outlined'
                    color='primary'
                    type='text'
                    label='username' />
            </Grid>
            

            <Grid item xs={12}>
                <TextField
                    inputRef={ passwordRef }
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            login()
                        }
                    }}
                    size='small'
                    fullWidth
                    variant='outlined'
                    color='primary'
                    type='password'
                    label='password' />
            </Grid>

            {/* error message */}
            {
                internalstates.error? (
                    <Grid item xs={12}>
                        <ReportProblemIcon color='secondary' style={{ fontSize: 15, marginRight: 5 }} />
                        <Typography variant='body1' component='span' color='secondary'>
                            Error while trying to login. { internalstates.error }
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
                    onClick={login}
                    isLoading={internalstates.loginProgress}
                    startIcon={<LoginIcon />}>
                    login
                </LoadingButton>
                <Box style={{marginTop: 15}}>
                    <Link
                        color="inherit"
                        href={`/${ config.rootRoute }/auth/forgotPassword`}>
                        Forgot password
                    </Link>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Login