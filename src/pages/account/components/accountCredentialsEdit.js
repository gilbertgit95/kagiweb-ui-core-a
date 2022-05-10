import React, { useEffect, useContext } from 'react'
// import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
// import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import AccountContext from '../../../common/contexts/accountContext'
import VerticalSteps from '../../../common/navs/verticalStepsNav'
import utils from '../../../common/utilities'

import { useSnackbar } from 'notistack'

const AccountEdit = (props) => {
    const accountCtx = useContext(AccountContext)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const steps = [
        {
            icon: null,
            title: 'Base Credentials',
            component: (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            style={styles.caption}
                            variant='body1'>
                            Username is immutable and updating User Role is only allowed to Admin module.
                            You can only change the password.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <TextField
                            fullWidth
                            required
                            type='password'
                            label="Old Password" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <TextField
                            fullWidth
                            required
                            type='password'
                            label="New password" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <TextField
                            fullWidth
                            required
                            type='password'
                            label="Retype Password" />
                    </Grid>
                </Grid>
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
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            style={styles.caption}
                            variant='body1'>
                            Emails are not required, however it will be usefull in authentication
                            and some notifications. It is recommended to have atleast the primary email.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            fullWidth
                            label="Primary Email" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            fullWidth
                            label="Secondary Email" />
                    </Grid>
                </Grid>
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
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            style={styles.caption}
                            variant='body1'>
                            Phone numbers are not required, however it will be usefull in authentication
                            and some notifications. It is recommended to have atleast the primary phone number.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            fullWidth
                            label="Primary Phone Number" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            fullWidth
                            label="Secondary Phone Number" />
                    </Grid>
                </Grid>
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
                    All steps completed. Please see the change details before
                    saving.
                </Typography>
            </>
        ),
        action: async () => {
            console.log('finish button')

            // test for notifications
            // this will also serve as reference
            await utils.waitFor(1)
            enqueueSnackbar('test notification 1', {
                variant: 'info',
            });
            await utils.waitFor(1)
            enqueueSnackbar('test notification 1', {
                variant: 'error',
                persist: true,
                action: (key) => (
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={() => { closeSnackbar(key) }}>
                        Dismiss
                    </Button>
                )
            });
            await utils.waitFor(1)
            enqueueSnackbar('test notification 1', {
                variant: 'warning',
                autoHideDuration: 10000,
            });
            await utils.waitFor(1)
            enqueueSnackbar('test notification 1', {
                variant: 'success'
            });

            return true
        }
    }

    useEffect(() => {
        console.log('data in account edit: ', accountCtx.accountContext)

    },[accountCtx.accountContext])

    return (
        <Grid container spacing={2}>
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
    )
}

const styles = {
    caption: {
        textIndent: 50,
        marginTop: 20,
        marginBottom: 10
    }
}

export default AccountEdit