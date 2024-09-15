import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';

import TimeUtils from '../../utils/timeUtils';
import AuthService from './authService';
import appComponentsHandler from '../../utils/appComponentsHandler'

const Signin = () => {
    const navigate = useNavigate()
    const [pageState, setPageState] = useState<{isLoading:boolean}>({
        isLoading: false
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [searchParams] = useSearchParams();
    const nameIdUrlQuery = searchParams.get('nameId') || '';
    const remember = (searchParams.get('remember') || '') === 'true';

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setPageState({isLoading: true})
        const data = new FormData(event.currentTarget)

        try {
            const rememberAccount = data.get('remember')?.toString() === 'on'
            const signinResp = await AuthService.signin(
                data.get('nameId')?.toString(),
                data.get('password')?.toString()
            )

            // if direct signin or if token was on the response then save the token to loca storage
            // then redirect to home
            if (signinResp.token) {
                localStorage.setItem(appComponentsHandler.appConfig.TokenKey, 'Bearer ' + signinResp.token)
                if (remember) {
                    // save account info to local memory: todo
                    // console.log('signinResp: ', signinResp)
                    AuthService.saveSignedAccount({
                        nameId: signinResp.nameId || '',
                        status: 'active-token',
                        method: 'app-auth',
                        dateCreated: signinResp.createdAt,
                        expirationDate: signinResp.expiration,
                        token: 'Bearer ' + signinResp.token
                    })
                }
                window.location.replace('/')

            // if otp signin is enabled then show resp status info for a while
            // then redirect to otp signin
            } else {
                setInfoAndErrors({
                    infoMessages: [(signinResp?.message || '') + '. This page Will be redirected to OTP signin page in a few.'],
                    errorMessages: []
                })
                await TimeUtils.doNothingFor(5)
                // window.location.replace(`/signinOTP?nameId=${ signinResp.nameId }`)
                navigate(`/signinOTP?nameId=${ signinResp.nameId }&remember=${ rememberAccount }`)
            }

        } catch (err:any) {
            setInfoAndErrors({
                ...infoAndErrors,
                ...{errorMessages: [err?.response?.data?.message || '']}
            })
        }
        setPageState({isLoading: false})
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Sign in</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="nameId"
                        label="NameID"
                        name="nameId"
                        autoComplete="nameId"
                        defaultValue={nameIdUrlQuery}
                        autoFocus />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password" />
                    <FormControlLabel control={<Checkbox name="remember" defaultChecked={remember} />} label="Remember Account" />
                    <ResponseStatus {...infoAndErrors} />
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        loadingPosition="start"
                        startIcon={<LockOutlinedIcon />}
                        loading={pageState.isLoading}
                        sx={{ mt: 3, mb: 2 }} >
                        Sign In
                    </LoadingButton>
                    {/* <Grid container justifyContent="center">
                        <Grid item xs>
                            <Link href="/forgotPassword" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth variant="text" style={{marginTop: 40}}
                        onClick={() => navigate(`/signedAccounts`)}>
                        Signedin Accounts
                    </Button> */}
                    <Grid container justifyContent="center" alignItems="center" direction="column">
                        <Grid item xs>
                            <Link href="/forgotPassword" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signedAccounts" variant="body2">
                                {"Signedin Accounts"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

      </Container>
    )
}

export default Signin