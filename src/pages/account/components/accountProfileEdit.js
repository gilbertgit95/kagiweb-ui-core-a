import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const AccountProfileEdit = (props) => {

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    Account Profile Edit
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue="Hello World" />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue="Hello World" />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue="Hello World" />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained">Primary</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AccountProfileEdit