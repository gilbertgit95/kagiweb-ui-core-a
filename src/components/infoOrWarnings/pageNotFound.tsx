import React from 'react'
import { Typography, Grid } from '@mui/material'

interface Props {
    children?: React.ReactNode
}

const PageNotFound = (props:Props) => {
    return (
        <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '80vh' }}>
            <Grid item xs={12}>
                <Typography color='primary' variant='h5'>This page does not exist!</Typography>
            </Grid>
            { props.children }
        </Grid>
    )
}

export default PageNotFound