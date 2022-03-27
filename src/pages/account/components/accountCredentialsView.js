import React, { useState, useEffect, useContext } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AccountContext from '../../../common/context/accountContext'


const AccountView = (props) => {

    return (
        <Box>
            Account credentials View
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}></Grid>
            </Grid>
        </Box>
    )
}

export default AccountView