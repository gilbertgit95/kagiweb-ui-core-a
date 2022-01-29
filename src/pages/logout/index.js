import { useState } from 'react'
import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import LoginIcon from '@mui/icons-material/Login'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress';

const Logout = (props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>
                    Signingout...
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <CircularProgress />
            </Grid>
        </Grid>
    )
}

export default Logout