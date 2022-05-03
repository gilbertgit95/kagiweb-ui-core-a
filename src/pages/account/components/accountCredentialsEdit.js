import React, { useEffect, useContext } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AccountContext from '../../../common/contexts/accountContext'
import VerticalSteps from '../../../common/navs/verticalSteps'

const AccountEdit = (props) => {
    const accountCtx = useContext(AccountContext)

    const steps = [
        {
            icon: null,
            title: 'Base Credentials',
            component: (
                <>
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue="Hello World" />
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue="Hello World" />
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue="Hello World" />
                    <Button variant="contained">Primary</Button>
                </>
            ),
        },
        {
            icon: null,
            title: 'Email Addresses',
            component: (
                <>
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue="Hello World" />
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue="Hello World" />
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue="Hello World" />
                </>
            ),
        },
        {
            icon: null,
            title: 'Phone Numbers',
            component: (
                <>
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue="Hello World" />
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue="Hello World" />
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue="Hello World" />
                </>
            ),
        }
    ]

    useEffect(() => {
        console.log('data in account edit: ', accountCtx.accountContext)

    },[accountCtx.accountContext])

    return (
        <Container>
            <Grid container spacing={2} style={styles.container}>
                <Grid item xs={12}>
                    <VerticalSteps
                        type='unordered'
                        views={ steps } />
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