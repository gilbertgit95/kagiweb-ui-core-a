import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import KeyOffOutlinedIcon from '@mui/icons-material/KeyOffOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSearchParams } from 'react-router-dom';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';

import TimeUtils from '../../utils/timeUtils';
import AuthService from './authService';

const ForgotPassword = () => {
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

    // console.log('nameId: ', nameId)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setPageState({isLoading: true})
        const data = new FormData(event.currentTarget)
        console.log({
          nameId: data.get('nameId'),
        })

        try {
            const signinOTPResp = await AuthService.forgotPassword(
                data.get('nameId')?.toString()
            )

            console.log('signinOTPResp: ', signinOTPResp)

            // if direct signin or if token was on the response then save the token to loca storage
            // then redirect to home
            setInfoAndErrors({
                infoMessages: [(signinOTPResp?.message || '') + '. This page Will be redirected to signin page in a few.'],
                errorMessages: []
            })

            await TimeUtils.doNothingFor(5)
            // window.location.replace('/resetPassword?nameId=' + data.get('nameId')?.toString())
            navigate('/resetPassword?nameId=' + data.get('nameId')?.toString())
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
                    <KeyOffOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Forgot Password</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="nameId"
                        label="NameID"
                        name="nameId"
                        defaultValue={nameIdUrlQuery}
                        autoComplete="nameId"
                        autoFocus />
                    <ResponseStatus {...infoAndErrors} />
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        loadingPosition="start"
                        startIcon={<KeyOffOutlinedIcon />}
                        loading={pageState.isLoading}
                        sx={{ mt: 3, mb: 2 }} >
                        Request Reset Token
                    </LoadingButton>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/signin" variant="body2">
                                Sign In
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

export default ForgotPassword