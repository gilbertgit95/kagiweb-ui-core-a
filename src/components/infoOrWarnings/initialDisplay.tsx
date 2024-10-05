import React from 'react';
import { CircularProgress, Typography, Grid } from "@mui/material"

const InitialDisplay = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh' }}>
            <Grid item xs={12}>
                <CircularProgress />
            </Grid>
            <Grid item xs={12}>
                <Typography color='primary' variant='subtitle1'>Loading initial data</Typography>
            </Grid>
        </Grid>
    )
}

export default InitialDisplay