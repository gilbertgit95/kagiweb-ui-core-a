import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography, TextField, Switch } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import UserClientDeviceService from './userClientDeviceService';
import { IAccount, IClientDevice } from '../../types/account';

interface props {
    user?: IAccount,
    clientDeviceId?: string,
    updateFunc: (userId:string, updateData:{_id?:string, ua?:string, description?: string, disabled?:boolean}) => Promise<{data:IClientDevice}>,
    updated?: (userId:string|undefined, userInfo:IClientDevice|undefined) => void
}

const UserClientDeviceEditForm = ({user, clientDeviceId, updateFunc, updated}:props) => {
    const [clientDevice, setClientDevice] = useState<IClientDevice & {createdAt?:Date, updatedAt?:Date} | undefined>()
    const [updatedClientDevice, setUpdatedClientDevice] = useState<IClientDevice>({
        ua: '',
        description: '',
        disabled: false
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    const handleTextFieldChange = (field:string, value:string) => {
        setUpdatedClientDevice({...updatedClientDevice, ...{[field]: value}})
    }

    const handleSwitchChange = (field:string, event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.checked)
        setUpdatedClientDevice({...updatedClientDevice, ...{[field]: event.target.checked}})
    }

    const onUpdate = async () => {
        if (!clientDevice) return

        const updateData:{_id?:string, ua?:string, description?: string, disabled?:boolean} = {
            _id: updatedClientDevice._id,
            ua: updatedClientDevice.ua === clientDevice.ua? undefined: updatedClientDevice.ua,
            description: updatedClientDevice.description === clientDevice.description? undefined: updatedClientDevice.description,
            disabled: updatedClientDevice.disabled === clientDevice.disabled? undefined: updatedClientDevice.disabled
        }
        console.log('save update: ', updateData)

        // // send update data to the api
        if (user?._id) {
            try {
                const reqResp = await updateFunc(user._id, updateData)
                setInfoAndErrors({
                    ...{infoMessages: ['Successfull Update']},
                    ...{errorMessages: []}
                })
                if (updated) updated(user?._id, reqResp?.data)
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
            if (user && user.clientDevices && clientDeviceId) {
                const contactInf = UserClientDeviceService.getClientDeviceById(user, clientDeviceId)
                setClientDevice(contactInf)
                if (contactInf) {
                    setUpdatedClientDevice(contactInf)
                } else {
                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: ['Client Device does not exist on this user']}
                    })
                }
            }
        }

        init()

    }, [user, clientDeviceId])

    const itemSx = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        paddingLeft: '20px'
    }

    const hasChanges = (() => {
        if (!clientDevice) return false

        return !(
            clientDevice.ua !== updatedClientDevice.ua ||
            clientDevice.description !== updatedClientDevice.description ||
            clientDevice.disabled !== updatedClientDevice.disabled
        )
    })()

    return user? (
        <>
            {
                clientDevice? (
                    <>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">User Agent</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <TextField
                                    fullWidth
                                    defaultValue={updatedClientDevice?.ua || ''}
                                    onChange={(e) => handleTextFieldChange('ua', e.target.value)} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Description</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <TextField
                                    fullWidth
                                    defaultValue={updatedClientDevice?.description || ''}
                                    onChange={(e) => handleTextFieldChange('description', e.target.value)} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Disabled</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <Switch
                                    onChange={e => handleSwitchChange('disabled', e)}
                                    checked={updatedClientDevice.disabled} />
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
                    disabled={hasChanges || !clientDevice}>
                    Update
                </Button>
            </Grid>
        </>
    ): null
}

export default UserClientDeviceEditForm