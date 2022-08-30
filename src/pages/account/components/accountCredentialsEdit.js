import React, { useEffect, useRef, useContext } from 'react'
// import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
// import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import SelectBox from '../../../common/inputs/selectBox'

import GlobalDialogContext from '../../../common/contexts/globalDialogContext'
import AccountContext from '../../../common/contexts/accountContext'
import VerticalSteps from '../../../common/navs/verticalStepsNav'
import utils from '../../../common/utilities'

const AccountCredentialEdit = (props) => {
    const accountCtx = useContext(AccountContext)
    const dialogCtx = useContext(GlobalDialogContext)

    const roleRef = useRef()
    const newPasswordRef = useRef()
    const retypePasswordRef = useRef()

    const primaryEmailRef = useRef()
    const secondaryEmailRef = useRef()

    const primaryPhoneRef = useRef()
    const secondaryPhoneRef = useRef()


    let updateType = props.updateType? props.updateType: 'loggedinAccount' // 'loggedinAccount' || 'administarator'

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
                            {
                                updateType === 'administrator'?
                                'Please double check if you need to change the user role. ': null
                            }
                            We encourage you to create strong password for better security.
                            Atleast 1 capital and small letter, atleast 1 number,
                            atleast 1 special character, length is 8-12 characters.'
                        </Typography>
                    </Grid>
                    {/* available only for administrator */}
                    {
                        updateType === 'administrator'? (
                            <Grid item xs={12}>
                                <SelectBox
                                    style={{ width: '100%' }}
                                    label='Role'
                                    value='super_admin'
                                    onChange={e => {
                                        console.log('selected', e)
                                    }}
                                    options={[
                                        {label: 'Super Admin', value: 'super_admin'},
                                        {label: 'Admin', value: 'admin'}
                                    ]} />
                            </Grid>
                        ): null
                    }
                    {/* <Grid item xs={12} sm={12} md={4}>
                        <TextField
                            fullWidth
                            required
                            type='password'
                            label="Old Password" />
                    </Grid> */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            required
                            type='password'
                            inputRef={newPasswordRef}
                            label="New password" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            required
                            type='password'
                            inputRef={retypePasswordRef}
                            label="Retype Password" />
                    </Grid>
                </Grid>
            ),
            action: async () => {
                console.log('Base Credentials')

                let inputData = await dialogCtx.showDialog({
                    type: 'input',
                    inputType: 'password',
                    title: 'Password',
                    message: 'This action requires you password.',
                    color: 'secondary'
                })
                console.log('dialog data: ', inputData)
                if (inputData.status !== 'proceed') return false

                let actionType = 'changePassword'
                let currentPassword = inputData.value
                let newPassword = newPasswordRef.current.value
                let retypePassword = newPasswordRef.current.value

                // check if password and retype password match
                if (!(newPassword === retypePassword)) {
                    throw('Password not match. Please re type new password.')
                }

                await props.onSaveData({
                    actionType,
                    newPassword,
                    currentPassword
                })
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
                            inputRef={primaryEmailRef}
                            label="Primary Email" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            fullWidth
                            inputRef={secondaryEmailRef}
                            label="Secondary Email" />
                    </Grid>
                </Grid>
            ),
            action: async () => {
                console.log('email addresses')

                let inputData = await dialogCtx.showDialog({
                    type: 'input',
                    inputType: 'password',
                    title: 'Password',
                    message: 'This action requires you password.',
                    color: 'secondary'
                })
                console.log('dialog data: ', inputData)
                if (inputData.status !== 'proceed') return false

                await props.onSaveData()
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
                            inputRef={primaryPhoneRef}
                            label="Primary Phone Number" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            fullWidth
                            inputRef={secondaryPhoneRef}
                            label="Secondary Phone Number" />
                    </Grid>
                </Grid>
            ),
            action: async () => {
                console.log('phone numbers')

                let inputData = await dialogCtx.showDialog({
                    type: 'input',
                    inputType: 'password',
                    title: 'Password',
                    message: 'This action requires you password.',
                    color: 'secondary'
                })
                console.log('dialog data: ', inputData)
                if (inputData.status !== 'proceed') return false

                await props.onSaveData()
                await utils.waitFor(1)
                return true
            }
        }
    ]

    useEffect(() => {
        console.log('data in account edit: ', accountCtx.accountContext)

    },[accountCtx.accountContext])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <VerticalSteps
                    nextBtnLabel={ 'Save and Next' }
                    finishBtnlabel={ 'Save' }
                    finalBtnLabel={ 'Save Changes' }
                    disableLabelClick={ false }
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

export default AccountCredentialEdit