import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';

// import Config from '../../utils/config';
// import TimeUtils from '../../utils/timeUtils';
import AuthService from './authService';


// import { useAppDispatch, useAppSelector} from '../../stores/appStore';
// import { setUserData, clearUserData } from '../../stores/signedInUserSlice';

const Signup = () => {
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    // const dispatch = useAppDispatch()
    // const token = useAppSelector(state => state.signedInUser.token)
    // const isSignedIn = useAppSelector(state => state.signedInUser.isSignedIn)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log({
          username: data.get('username'),
          email: data.get('email'),
          phone: data.get('phone'),
          newPassword: data.get('password'),
          confirmPassword: data.get('confirmPassword')
        })

        try {
            const signupResp = await AuthService.signup(
                data.get('username')?.toString(),
                data.get('password')?.toString(),
                data.get('email')?.toString(),
                data.get('phone')?.toString()
            )

            console.log('signupResp: ', signupResp)
            setInfoAndErrors({
                infoMessages: [signupResp?.message || ''],
                errorMessages: []
            })

        } catch (err:any) {
            setInfoAndErrors({
                ...infoAndErrors,
                ...{errorMessages: [err?.response?.data?.message || '']}
            })
        }
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
                    <AccountBoxOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Create Account</Typography>
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
                        fullWidth
                        name="email"
                        label="Email"
                        id="email" />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="phone"
                        label="Phone"
                        id="phone" />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        name="password"
                        label="Password"
                        id="password" />
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
                        Sign UP
                    </Button>
                    <Grid container>
                        {/* <Grid item xs>
                            <Link href="/forgotPassword" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid> */}
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                {"Already have Account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

      </Container>
    )
}

export default Signup