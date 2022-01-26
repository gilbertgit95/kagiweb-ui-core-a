import { useState, useContext } from 'react'

import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import LoginIcon from '@mui/icons-material/Login'
import Button from '@mui/material/Button'

import AccountContext from '../../context/accountContext'

const Login = (props) => {
    // const ctx = useContext(AccountContext)

    // const btnClicked = (e) => {
    //     ctx.setAccountContext({testVal: 'login test value from context'})
    // }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    size='small'
                    fullWidth
                    variant='outlined'
                    color='primary'
                    type='text'
                    label='username' />
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
                <Button
                    size='small'
                    fullWidth
                    variant='contained'
                    color='primary'
                    startIcon={<LoginIcon />}>
                    login
                </Button>
                <Box style={{marginTop: 15}}>
                    <Link
                        color="inherit"
                        href="/auth/forgotPassword">
                        Forgot password
                    </Link>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Login