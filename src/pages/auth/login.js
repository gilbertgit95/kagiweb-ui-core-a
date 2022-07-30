import { useState, useContext } from 'react'

import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import LoginIcon from '@mui/icons-material/Login'

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
        errors: []
    })
    const routerCtx = useContext(RouterContext)
    const AccCtx = useContext(AccountContext)
    const lsCtx = useContext(LocalStorageContext)

    const login = async () => {
        let username = ''
        let password = ''

        setInternalStates({...internalstates, ...{loginProgress: true}})
        let loginResult = await AccCtx.signIn({username, password})
        setInternalStates({...internalstates, ...{loginProgress: false}})
        lsCtx.updateLocalStorage({authKey: loginResult.authKey})
    }


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    size='small'
                    fullWidth
                    variant='outlined'
                    color='primary'
                    type='text'
                    label='username / email' />
            </Grid>
            

            <Grid item xs={12}>
                <TextField
                    size='small'
                    fullWidth
                    variant='outlined'
                    color='primary'
                    type='password'
                    label='password' />
            </Grid>
            

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