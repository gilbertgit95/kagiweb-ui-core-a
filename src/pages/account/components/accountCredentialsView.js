// import React, { useState, useEffect, useContext } from 'react'
import Container from '@mui/material/Container'
// import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
// import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
// import AccountContext from '../../../common/contexts/accountContext'
// import VerticalSteps from '../../../common/navs/verticalSteps'
import LoadingButton from '../../../common/buttons/loadingButton'


const AccountView = (props) => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
                <Typography
                    color='primary'
                    variant='h6'>
                    Base Credentials
                </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
                <Typography
                    color='primary'
                    variant='h6'>
                    Emails Adresses
                </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
                <Typography
                    color='primary'
                    variant='h6'>
                    Phone Numbers
                </Typography>
            </Grid>

        </Grid>
    )
}

export default AccountView