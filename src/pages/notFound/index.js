// import { useState, useContext } from 'react'

// import Link from '@mui/material/Link'
// import Container from '@mui/material/Container'
// import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
// import TextField from '@mui/material/TextField'
// import LoginIcon from '@mui/icons-material/Login'
// import Button from '@mui/material/Button'

const NotFound = (props) => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography
                    style={{marginTop: '5%'}}
                    color='secondary'
                    variant='h4'
                    gutterBottom
                    component='div'>
                    Error 404 not found Content.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default NotFound