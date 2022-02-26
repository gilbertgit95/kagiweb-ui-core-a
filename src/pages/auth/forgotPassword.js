import { useState } from 'react'
import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import LoginIcon from '@mui/icons-material/Login'
import Button from '@mui/material/Button'

const forgotPassword = (props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>
                    A password reset link will be sent to this email address.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    size='small'
                    fullWidth
                    variant='outlined'
                    color='primary'
                    type='text'
                    label='email' />
            </Grid>

            <Grid item xs={12}>
                <Button
                    size='small'
                    fullWidth
                    variant='contained'
                    color='primary'
                    startIcon={<LoginIcon />}>
                    Submit
                </Button>
                <Box style={{marginTop: 15}}>
                    <Link
                        color="inherit"
                        href="/auth/login">
                        Back to login
                    </Link>
                </Box>
            </Grid>
        </Grid>
    )
}

export default forgotPassword