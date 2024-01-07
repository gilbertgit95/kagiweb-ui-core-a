import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import KeyIcon from '@mui/icons-material/Key';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


// import { useAppDispatch, useAppSelector} from '../../stores/appStore';
// import { setUserData, clearUserData } from '../../stores/signedInUserSlice';

const SigninOTP = () => {
    // const dispatch = useAppDispatch()
    // const token = useAppSelector(state => state.signedInUser.token)
    // const isSignedIn = useAppSelector(state => state.signedInUser.isSignedIn)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log({
          username: data.get('username'),
          otp: data.get('otp'),
        })

        // signin request
        // then save the token response to storage
        // and initiate data and redirect to home

        // else if 2fa is enabled then redirect to signinopt page
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
                        autoFocus />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="otp"
                        label="One Time Password"
                        id="otp" />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }} >
                        Sign In
                    </Button>
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