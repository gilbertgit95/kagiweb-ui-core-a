import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography, TextField, Switch } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
// import UserWorkspaceUserRefService from './userWorkspaceUserRefService';
import { IAccount, IWorkspaceAccountRef } from '../../types/account';

interface props {
    account?: IAccount,
    workspaceId?: string,
    userRefId?: string,
    getFunc: (accountId:string, workspaceId:string, userRefId: string) => Promise<{data: IWorkspaceAccountRef & {username?:string} | null}>
    updateFunc: (
        accountId:string,
        workspaceId:string,
        userRefId:string,
        readAccess:boolean,
        updateAccess:boolean,
        createAccess:boolean,
        deleteAccess:boolean,
        disabled:boolean
    ) => Promise<{data:IWorkspaceAccountRef}>,
    updated?: (accountId:string|undefined, workspaceId: string, userRef:IWorkspaceAccountRef|undefined) => void
}

const UserWorkspaceUserRefEditForm = ({account, workspaceId, userRefId, getFunc, updateFunc, updated}:props) => {
    const [userRef, setAccountRef] = useState<IWorkspaceAccountRef & {username?:string, createdAt?:Date, updatedAt?:Date} | undefined>()
    const [updatedUserRef, setUpdatedUserRef] = useState<IWorkspaceAccountRef & {username?:string}>({
        accountId: '',
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

    // const handleTextFieldChange = (field:string, value:string) => {
    //     setUpdatedUserRef({...updatedUserRef, ...{[field]: value}})
    // }

    const handleSwitchChange = (field:string, event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked)
        setUpdatedUserRef({...updatedUserRef, ...{[field]: event.target.checked}})
    }

    const onUpdate = async () => {
        if (!userRef) return

        // // send update data to the api
        if (account?._id) {
            try {
                const reqResp = await updateFunc(
                    account._id,
                    workspaceId || '',
                    userRefId || '',
                    Boolean(updatedUserRef.readAccess),
                    Boolean(updatedUserRef.updateAccess),
                    Boolean(updatedUserRef.createAccess),
                    Boolean(updatedUserRef.deleteAccess),
                    Boolean(updatedUserRef.disabled)
                )
                setInfoAndErrors({
                    ...{infoMessages: ['Successfull Update']},
                    ...{errorMessages: []}
                })
                if (updated) updated(account?._id, workspaceId || '', reqResp?.data)
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

    useEffect(() => {
        const init = async () => {
            if (account && workspaceId && userRefId) {
                const usrRef = await getFunc(account._id || '', workspaceId, userRefId || '')
                if (usrRef?.data) {
                    setAccountRef(usrRef.data)
                    setUpdatedUserRef(usrRef.data)
                } else {
                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: ['User reference does not exist on this user']}
                    })
                }
            }
        }

        init()

    }, [account, workspaceId, userRefId])

    const itemSx = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        paddingLeft: '20px'
    }

    const hasChanges = (() => {
        if (!userRef) return false

        return !(
            userRef.readAccess !== updatedUserRef.readAccess ||
            userRef.updateAccess !== updatedUserRef.updateAccess ||
            userRef.createAccess !== updatedUserRef.createAccess ||
            userRef.deleteAccess !== updatedUserRef.deleteAccess ||
            userRef.disabled !== updatedUserRef.disabled
        )
    })()

    return account? (
        <>
            {
                userRef? (
                    <>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Username</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <TextField
                                    fullWidth
                                    disabled
                                    defaultValue={userRef?.username || ''} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Read Access</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <Switch
                                    onChange={e => handleSwitchChange('readAccess', e)}
                                    checked={updatedUserRef.readAccess} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Update Access</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <Switch
                                    onChange={e => handleSwitchChange('updateAccess', e)}
                                    checked={updatedUserRef.updateAccess} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Create Access</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <Switch
                                    onChange={e => handleSwitchChange('createAccess', e)}
                                    checked={updatedUserRef.createAccess} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Delete Access</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <Switch
                                    onChange={e => handleSwitchChange('deleteAccess', e)}
                                    checked={updatedUserRef.deleteAccess} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Disabled</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <Switch
                                    onChange={e => handleSwitchChange('disabled', e)}
                                    checked={updatedUserRef.disabled} />
                            </Grid>
                        </Grid>
                    </>
                ):null
            }
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
                    startIcon={<EditIcon />}
                    onClick={onUpdate}
                    disabled={hasChanges || !userRef}>
                    Update
                </Button>
            </Grid>
        </>
    ): null
}

export default UserWorkspaceUserRefEditForm