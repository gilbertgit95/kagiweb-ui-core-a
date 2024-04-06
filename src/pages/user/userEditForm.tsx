import React, { useState, useEffect } from 'react';
import { Button, Typography, TextField, Switch } from '@mui/material';

import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';

import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import { IUser, IUserUpdate } from '../../types/user';

interface Props {
    userId: string | undefined,
    getFunc: (userId:string) => Promise<{data:IUser}>,
    updateFunc: (updateData:IUserUpdate) => Promise<{data:IUser}>,
    updated?: (user:IUser|undefined) => void
}

export  const UserEditForm = ({ userId, getFunc, updateFunc, updated }:Props) => {
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [user, setUser] = useState<IUser | undefined>()
    const [updatedUser, setUpdatedUser] = useState<IUser>({
        username: '',
        rolesRefs: [],
        userInfos: [],
        passwords: [],
        contactInfos: [],
        clientDevices: [],
        limitedTransactions: [],
        workspaces: [],
        disabled: false,
        verified: false
    })

    const handleTextFieldChange = (field:string, value:string) => {
        setUpdatedUser({...updatedUser, ...{[field]: value}})
    }

    const handleSwitchChange = (field:string, event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked)
        setUpdatedUser({...updatedUser, ...{[field]: event.target.checked}})
    }

    const onUpdate = async () => {
        if (!user) return

        const updateData:IUserUpdate = {
            _id: updatedUser._id,
            username: updatedUser.username === user.username? undefined: updatedUser.username,
            disabled: updatedUser.disabled === user.disabled? undefined: updatedUser.disabled,
            verified: updatedUser.verified === user.verified? undefined: updatedUser.verified
        }
        console.log('save update: ', updateData)

        // send update data to the api
        try {
            const userResp = await updateFunc(updateData)
            setUser(userResp.data)
            setUpdatedUser(userResp.data)
            setInfoAndErrors({
                ...{infoMessages: ['Successfull Update']},
                ...{errorMessages: []}
            })
            if (updated) updated(userResp?.data)
        } catch (err:any) {
            // error while updating
            // log to the UI
            setInfoAndErrors({
                ...infoAndErrors,
                ...{errorMessages: [err?.response?.data?.message || '']}
            })
        }
    }
    
    useEffect(() => {
        const init = async () => {
            console.log('Edit: ', userId)

            if (userId) {
                try {
                    const userResp = await getFunc(userId)
                    setUser(userResp.data)
                    setUpdatedUser(userResp.data)
                } catch (err:any) {
                    // error fetching user
                    // log to the UI
                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: [err?.response?.data?.message || '']}
                    })
                }
            }
        }

        init()
    }, [userId, getFunc])

    const itemSx = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        paddingLeft: '20px'
    }

    const hasChanges = (() => {
        if (!user) return false

        return !(
            user.username !== updatedUser.username ||
            user.disabled !== updatedUser.disabled ||
            user.verified !== updatedUser.verified
        )
    })()

    return (
        <>
            {
                user? (
                    <>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Username</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <TextField
                                    fullWidth
                                    defaultValue={updatedUser.username}
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
                                    checked={updatedUser.disabled} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Verified</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <Switch
                                    onChange={e => handleSwitchChange('verified', e)}
                                    checked={updatedUser.verified} />
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
                    disabled={hasChanges || !user}>
                    Update
                </Button>
            </Grid>
        </>
    )
}

export default UserEditForm