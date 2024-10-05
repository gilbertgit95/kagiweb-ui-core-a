import React from 'react';
import { Typography, Grid } from '@mui/material'

const PrivateLandingPage = () => {
    return (
        <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '80vh' }}>
            <Grid item xs={12}>
                <Typography color='primary' variant='h5'>Welcome! this is your Dashboard</Typography>
            </Grid>
        </Grid>
    )
}

export default PrivateLandingPage