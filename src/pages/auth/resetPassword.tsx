import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSearchParams } from 'react-router-dom';
import ResponseStatus, { TResponseStatus } from '../infoOrWarnings/responseStatus';

// import Config from '../../utils/config';
import TimeUtils from '../../utils/timeUtils';
import AuthService from './authService';

// import { useAppDispatch, useAppSelector} from '../../stores/appStore';
// import { setUserData, clearUserData } from '../../stores/signedInUserSlice';

const ResetPassword = () => {
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    // const dispatch = useAppDispatch()
    // const token = useAppSelector(state => state.signedInUser.token)
    // const isSignedIn = useAppSelector(state => state.signedInUser.isSignedIn)
    const [searchParams] = useSearchParams();
    const usernameUrlQuery = searchParams.get('username') || '';
    const resetKeyUrlQuery = searchParams.get('resetKey') || '';

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log({
          username: data.get('username'),
          resetKey: data.get('resetKey'),
          newPassword: data.get('newPassword'),
          confirmPassword: data.get('confirmPassword')
        })

        try {
            const resetPassResp = await AuthService.resetPassword(
                data.get('username')?.toString(),
                data.get('resetKey')?.toString(),
                data.get('newPassword')?.toString()
            )

            console.log('resetPassResp: ', resetPassResp)

            setInfoAndErrors({
                infoMessages: [(resetPassResp?.message || '') + '. This page Will be redirected to signin page in a few.'],
                errorMessages: []
            })

            await TimeUtils.doNothingFor(5)
            window.location.replace('/signin')

        } catch (err:any) {
            setInfoAndErrors({
                ...infoAndErrors,
                ...{errorMessages: [err?.response?.data?.message || '']}
            })
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockResetOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Reset Password</Typography>
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
                        name="resetKey"
                        label="Reset Key"
                        id="resetKey"
                        defaultValue={resetKeyUrlQuery} />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        name="newPassword"
                        label="New Password"
                        id="newPassword" />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        name="confirmPassword"
                        label="Confirm Password"
                        id="confirmPassword" />
                    <ResponseStatus {...infoAndErrors} />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }} >
                        Reset
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/signin" variant="body2">
                                Signin?
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

export default ResetPassword