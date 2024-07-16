import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography, TextField, Switch } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import { IAccount, IWorkspaceUserRef } from '../../types/account';

interface props {
    user?: IAccount,
    workspaceId?:string,
    createFunc: (
        userId:string,
        workspaceId:string,
        username:string,
        readAccess: boolean,
        updateAccess: boolean,
        createAccess: boolean,
        deleteAccess: boolean,
        disabled: boolean
    ) => Promise<{data:IWorkspaceUserRef & {username?: string}}>,
    created?: (userId:string|undefined, workspaceId:string, userRef:IWorkspaceUserRef|undefined) => void
}

const UserWorkspaceUserRefCreateForm = ({user, workspaceId, createFunc, created}:props) => {
    const [userRef, setNewUserRef] = useState<IWorkspaceUserRef & {username?: string}>({
        userId: '',
        username: '',
        readAccess: true,
        updateAccess: false,
        createAccess: false,
        deleteAccess: false,
        disabled: false
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    const handleTextFieldChange = (field:string, value:string) => {
        setNewUserRef({...userRef, ...{[field]: value}})
    }

    const handleSwitchChange = (field:string, event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked)
        setNewUserRef({...userRef, ...{[field]: event.target.checked}})
    }

    const onCreate = async () => {
        if (!user) return

        const newData:IWorkspaceUserRef & {username?: string} = {
            userId: '',
            username: userRef.username,
            readAccess: userRef.readAccess,
            updateAccess: userRef.updateAccess,
            createAccess: userRef.createAccess,
            deleteAccess: userRef.deleteAccess,
            disabled: userRef.disabled
        }
        console.log('save update: ', newData)

        // // send update data to the api
        if (user?._id) {
            try {
                const reqResp = await createFunc(
                    user._id,
                    workspaceId || '',
                    userRef.username || '',
                    Boolean(userRef.readAccess),
                    Boolean(userRef.updateAccess),
                    Boolean(userRef.createAccess),
                    Boolean(userRef.deleteAccess),
                    Boolean(userRef.disabled)
                )
                if (created) created(user?._id, workspaceId || '', reqResp?.data)
                setInfoAndErrors({
                    ...{infoMessages: ['Successfull Created']},
                    ...{errorMessages: []}
                })
            } catch (err:any) {
                // error while updating
                // log to the UI
                setInfoAndErrors({
                    ...infoAndErrors,
                    ...{errorMessages: [err?.response?.data?.message || '']}
                })
            }
        }
    }

    const itemSx = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        paddingLeft: '20px'
    }

    return user? (
        <>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Username</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <TextField
                        fullWidth
                        defaultValue={userRef?.username || ''}
                        onChange={(e) => handleTextFieldChange('username', e.target.value)} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Read Access</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Switch
                        onChange={e => handleSwitchChange('readAccess', e)}
                        checked={userRef.readAccess} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Update Access</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Switch
                        onChange={e => handleSwitchChange('updateAccess', e)}
                        checked={userRef.updateAccess} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Create Access</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Switch
                        onChange={e => handleSwitchChange('createAccess', e)}
                        checked={userRef.createAccess} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Delete Access</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Switch
                        onChange={e => handleSwitchChange('deleteAccess', e)}
                        checked={userRef.deleteAccess} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Disabled</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Switch
                        onChange={e => handleSwitchChange('disabled', e)}
                        checked={userRef.disabled} />
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
                    startIcon={<AddIcon />}
                    onClick={onCreate}
                    disabled={false}>
                    Create
                </Button>
            </Grid>
        </>
    ): null
}

export default UserWorkspaceUserRefCreateForm