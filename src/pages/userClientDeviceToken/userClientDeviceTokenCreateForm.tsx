import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography, TextField, Switch } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import { IUser, IAccessToken } from '../../types/user';

interface props {
    user?: IUser,
    clientDeviceId?:string,
    createFunc: (userId:string, clientDeviceId:string, newData:IAccessToken & {expiration:number|undefined}) => Promise<{data:IAccessToken}>,
    created?: (userId:string|undefined, clientDeviceId:string, token:IAccessToken|undefined) => void
}

const UserClientDeviceTokenCreateForm = ({user, clientDeviceId, createFunc, created}:props) => {
    const [newToken, setNewToken] = useState<IAccessToken & {expiration:number|undefined}>({
        expiration: undefined,
        jwt: '',
        description: '',
        ipAddress: '',
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

        const newData:IAccessToken & {expiration:number|undefined} = {
            jwt: '',
            expiration: undefined,
            description: newToken.description,
            ipAddress: newToken.ipAddress,
            disabled: newToken.disabled
        }
        console.log('save update: ', newData)

        // // send update data to the api
        if (user?._id) {
            try {
                const reqResp = await createFunc(user._id, clientDeviceId || '', newData)
                if (created) created(user?._id, clientDeviceId || '', reqResp?.data)
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
                    <Typography variant="subtitle1">Description</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <TextField
                        fullWidth
                        defaultValue={newToken?.description || ''}
                        onChange={(e) => handleTextFieldChange('description', e.target.value)} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">IP Address</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <TextField
                        fullWidth
                        defaultValue={newToken?.ipAddress || ''}
                        onChange={(e) => handleTextFieldChange('ipAddress', e.target.value)} />
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

export default UserClientDeviceTokenCreateForm