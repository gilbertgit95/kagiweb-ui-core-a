// import React, { useState, useEffect, useContext } from 'react'
// import Container from '@mui/material/Container'
// import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
// import TextField from '@mui/material/TextField'
// import Button from '@mui/material/Button'
// import AccountContext from '../../../common/contexts/accountContext'
// import VerticalSteps from '../../../common/navs/verticalSteps'
// import LoadingButton from '../../../common/buttons/loadingButton'


const AccountView = (props) => {

    return (
        <>
            <Grid
                container>
                <Grid item xs={12} sm={12} md={4}>
                    <Typography
                        color='primary'
                        variant='h6'
                        style={{
                            marginBottom: 15
                        }}>
                        Base Credentials
                    </Typography>

                    <Typography
                        variant='body1'>
                        Username: username
                    </Typography>
                    <Typography
                        variant='body1'>
                        Type: Super Admin
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                    <Typography
                        color='primary'
                        variant='h6'
                        style={{
                            marginBottom: 15
                        }}>
                        Emails Adresses
                    </Typography>

                    <Typography
                        variant='body1'>
                        Primary: test101@gmail.com
                    </Typography>
                    <Typography
                        variant='body1'>
                        Secondary: --
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                    <Typography
                        color='primary'
                        variant='h6'
                        style={{
                            marginBottom: 15
                        }}>
                        Phone Numbers
                    </Typography>

                    <Typography
                        variant='body1'>
                        Primary: +639273854600
                    </Typography>
                    <Typography
                        variant='body1'>
                        Secondary: --
                    </Typography>
                </Grid>
            </Grid>
            <Divider
                style={{
                    marginTop: 20,
                    marginBottom: 15
                }} />
        </>
    )
}

export default AccountView