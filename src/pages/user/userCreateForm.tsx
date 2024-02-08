import React, { useState } from 'react';
import { Button, Typography, TextField, Switch } from '@mui/material';
import Grid from '@mui/material/Grid';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import UserService from './userService';
import { IUser } from '../../types/user';

export const UserCreateForm = () => {
    const [pageState, setPageState] = useState({
        disableSaveButton: false
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [user, setUser] = useState<IUser>({
        username: '',
        rolesRefs: [],
        userInfos: [],
        passwords: [],
        contactInfos: [],
        clientDevices: [],
        limitedTransactions: [],
        disabled: false,
        verified: false
    })

    const handleTextFieldChange = (field:string, value:string) => {
        setUser({...user, ...{[field]: value}})
    }

    const handleSwitchChange = (field:string, event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, ...{[field]: event.target.checked}})
    }

    const onCreate = async () => {
        const newUser:IUser = user
        console.log('create update: ', newUser)
        setPageState({disableSaveButton: true})

        // send update data to the api
        try {
            const userResp = await UserService.createUser(newUser)
            setUser(userResp.data)
            setInfoAndErrors({
                ...{infoMessages: ['Successfull Creation']},
                ...{errorMessages: []}
            })
        } catch (err:any) {
            // error while updating
            // log to the UI
            setInfoAndErrors({
                ...infoAndErrors,
                ...{errorMessages: [err?.response?.data?.message || '']}
            })
            setPageState({disableSaveButton: false})
        }
    }

    const itemSx = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        paddingLeft: '20px'
    }

    return (
        <>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Username</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <TextField
                        fullWidth
                        defaultValue={user.username}
                        onChange={(e) => handleTextFieldChange('username', e.target.value)} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Disabled</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Switch
                        onChange={e => handleSwitchChange('disabled', e)}
                        defaultChecked={user.disabled} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Verified</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Switch
                        onChange={e => handleSwitchChange('verified', e)}
                        defaultChecked={user.verified} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    {/* <Typography variant="subtitle1">Tags</Typography> */}
                </Grid>
                <Grid item xs={8} md={9}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
            <Grid container item xs={12} sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                <Button
                    startIcon={<AdminPanelSettingsIcon />}
                    onClick={onCreate}
                    disabled={pageState.disableSaveButton}>
                    Create
                </Button>
            </Grid>
        </>
    )
}

export default UserCreateForm