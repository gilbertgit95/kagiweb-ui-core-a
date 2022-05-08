import React, { useEffect, useContext } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
// import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
// import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import AccountContext from '../../../common/contexts/accountContext'
import VerticalSteps from '../../../common/navs/verticalSteps'
import utils from '../../../common/utilities'

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
                </>
            ),
            action: async () => {
                console.log('Base Credentials')
                await utils.waitFor(1)
                return true
            }
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
            action: async () => {
                console.log('email addresses')
                await utils.waitFor(1)
                return true
            }
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
            action: async () => {
                console.log('phone numbers')
                await utils.waitFor(1)
                return true
            }
        }
    ]

    let finalView = {
        component: (
            <>
                <Typography>
                    All steps completed. Please see the changes details before
                    saving.
                </Typography>
            </>
        ),
        action: async () => {
            console.log('finish button')
            await utils.waitFor(2)
            return true
        }
    }

    useEffect(() => {
        console.log('data in account edit: ', accountCtx.accountContext)

    },[accountCtx.accountContext])

    return (
        <Container>
            <Grid container spacing={2} style={styles.container}>
                <Grid item xs={12}>
                    <VerticalSteps
                        nextBtnLabel={ 'Save and Next' }
                        finishBtnlabel={ 'Save and Finish' }
                        finalBtnLabel={ 'Save Changes' }
                        disableLabelClick={ false }
                        finalView={ finalView }
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