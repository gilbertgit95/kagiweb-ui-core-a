import React, { useEffect, useContext } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AccountContext from '../../../common/contexts/accountContext'
import VerticalSteps from '../../../common/navs/verticalSteps'

const AccountEdit = (props) => {
    const accountCtx = useContext(AccountContext)

    useEffect(() => {
        console.log('data in account edit: ', accountCtx.accountContext)

    },[accountCtx.accountContext])

    return (
        <Container>
            <Grid container spacing={2} style={styles.container}>
                <Grid item xs={12}>
                    <VerticalSteps />
                </Grid>

                <Grid item xs={12}>
                    <Grid item style={{padding: 10}} xs={12}>
                        Base Credentials
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

                <Grid item xs={12}>
                    <Grid item style={{padding: 10}} xs={12}>
                        Email Addresses
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

                <Grid item xs={12}>
                    <Grid item style={{padding: 10}} xs={12}>
                        Phone Numbers
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
        </Container>
    )
}

const styles = {
    container: {
        textAlign: 'center'
    }
}

export default AccountEdit