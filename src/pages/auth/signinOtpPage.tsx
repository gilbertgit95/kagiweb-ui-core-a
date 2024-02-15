import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
// import PublishIcon from '@mui/icons-material/Publish';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import KeyIcon from '@mui/icons-material/Key';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSearchParams } from 'react-router-dom';

import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import Config from '../../utils/config';
import AuthService from './authService';

// import { useAppDispatch, useAppSelector} from '../../stores/appStore';
// import { setUserData, clearUserData } from '../../stores/signedInUserSlice';

const SigninOTP = () => {
    const [pageState, setPageState] = useState<{isLoading:boolean}>({
        isLoading: false
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    // const dispatch = useAppDispatch()
    // const token = useAppSelector(state => state.signedInUser.token)
    // const isSignedIn = useAppSelector(state => state.signedInUser.isSignedIn)
    const [searchParams] = useSearchParams();
    const usernameUrlQuery = searchParams.get('username') || '';
    const otpUrlQuery = searchParams.get('otp') || '';

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setPageState({isLoading: true})
        const data = new FormData(event.currentTarget)
        // console.log({
        //   username: data.get('username'),
        //   otp: data.get('otp'),
        // })

        try {
            const signinOTPResp = await AuthService.signinOTP(
                data.get('username')?.toString(),
                data.get('otp')?.toString()
            )

            console.log('signinOTPResp: ', signinOTPResp)

            // if direct signin or if token was on the response then save the token to loca storage
            // then redirect to home
            if (signinOTPResp.token) {
                localStorage.setItem(Config.TokenKey, 'Bearer ' + signinOTPResp.token)
                window.location.replace('/')
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
                    <KeyIcon />
                </Avatar>
                <Typography component="h1" variant="h5">OTP Sign in</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        defaultValue={usernameUrlQuery}
                        autoFocus />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="otp"
                        label="One Time Password"
                        id="otp"
                        defaultValue={otpUrlQuery} />
                    <ResponseStatus {...infoAndErrors} />
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        loadingPosition="start"
                        startIcon={<KeyIcon />}
                        loading={pageState.isLoading}
                        sx={{ mt: 3, mb: 2 }} >
                        Sign In
                    </LoadingButton>
                    <Grid container>
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
                </Box>
            </Box>

        </Container>
    )
}

export default SigninOTP