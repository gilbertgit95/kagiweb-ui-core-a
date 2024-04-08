import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography, TextField, Switch } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import { IUser, IWorkspaceUserRef } from '../../types/user';

interface props {
    user?: IUser,
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
    ) => Promise<{data:IWorkspaceUserRef}>,
    created?: (userId:string|undefined, workspaceId:string, token:IWorkspaceUserRef|undefined) => void
}

const UserWorkspaceUserRefCreateForm = ({user, workspaceId, createFunc, created}:props) => {
    const [newToken, setNewToken] = useState<IWorkspaceUserRef>({
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
        setNewToken({...newToken, ...{[field]: value}})
    }

    const handleSwitchChange = (field:string, event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked)
        setNewToken({...newToken, ...{[field]: event.target.checked}})
    }

    const onCreate = async () => {
        if (!user) return

        const newData:IWorkspaceUserRef = {
            userId: '',
            username: newToken.username,
            readAccess: newToken.readAccess,
            updateAccess: newToken.updateAccess,
            createAccess: newToken.createAccess,
            deleteAccess: newToken.deleteAccess,
            disabled: newToken.disabled
        }
        console.log('save update: ', newData)

        // // send update data to the api
        if (user?._id) {
            try {
                const reqResp = await createFunc(
                    user._id,
                    workspaceId || '',
                    newToken.username,
                    Boolean(newToken.readAccess),
                    Boolean(newToken.updateAccess),
                    Boolean(newToken.createAccess),
                    Boolean(newToken.deleteAccess),
                    Boolean(newToken.disabled)
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
                        defaultValue={newToken?.username || ''}
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
                        checked={newToken.readAccess} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Update Access</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Switch
                        onChange={e => handleSwitchChange('updateAccess', e)}
                        checked={newToken.updateAccess} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Create Access</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Switch
                        onChange={e => handleSwitchChange('createAccess', e)}
                        checked={newToken.createAccess} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Delete Access</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Switch
                        onChange={e => handleSwitchChange('deleteAccess', e)}
                        checked={newToken.deleteAccess} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Disabled</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Switch
                        onChange={e => handleSwitchChange('disabled', e)}
                        checked={newToken.disabled} />
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