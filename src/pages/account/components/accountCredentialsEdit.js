import React, { useEffect, useContext } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AccountContext from '../../../common/contexts/accountContext'

const AccountEdit = (props) => {
    const accountCtx = useContext(AccountContext)

    useEffect(() => {
        console.log('data in account edit: ', accountCtx.accountContext)

    },[accountCtx.accountContext])

    return (
        <Box>
            <Grid container spacing={2}>
                {/* <Grid item xs={12}>
                    Account Edit
                </Grid> */}
                <Grid item xs={12} md={6} sx={{textAlign: {xs: 'center', md: 'right'}}}>
                    <Grid item style={{padding: 10}} xs={12}>
                        Required Fields
                    </Grid>

                    <Grid item style={{padding: 10}} xs={12}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Required"
                            defaultValue="Hello World" />
                    </Grid>
                    
                    <Grid item style={{padding: 10}} xs={12}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Required"
                            defaultValue="Hello World" />
                    </Grid>

                    <Grid item style={{padding: 10}} xs={12}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Required"
                            defaultValue="Hello World" />
                    </Grid>

                    <Grid item style={{padding: 10}} xs={12}>
                        <Button variant="contained">Primary</Button>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={6} sx={{textAlign: {xs: 'center', md: 'left'}}}>
                    <Grid item style={{padding: 10}} xs={12}>
                        Required Fields
                    </Grid>

                    <Grid item style={{padding: 10}} xs={12}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Required"
                            defaultValue="Hello World" />
                    </Grid>
                    
                    <Grid item style={{padding: 10}} xs={12}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Required"
                            defaultValue="Hello World" />
                    </Grid>

                    <Grid item style={{padding: 10}} xs={12}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Required"
                            defaultValue="Hello World" />
                    </Grid>

                    <Grid item style={{padding: 10}} xs={12}>
                        <Button variant="contained">Primary</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AccountEdit