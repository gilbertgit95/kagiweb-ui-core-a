import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography, TextField, Switch } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import UserClientDeviceTokenService from './userClientDeviceTokenService';
import { IUser, IAccessToken } from '../../types/user';

interface props {
    user?: IUser,
    clientDeviceId?: string,
    clientDeviceTokenId?: string,
    updateFunc: (userId:string, clientDeviceId: string, updateData:{_id?:string, ipAddress?:string, jwt?:string, disabled?:boolean}) => Promise<{data:IAccessToken}>,
    updated?: (userId:string|undefined, userInfo:IAccessToken|undefined) => void
}

const UserWorkspaceUserRefEditForm = ({user, clientDeviceId, clientDeviceTokenId, updateFunc, updated}:props) => {
    const [token, setToken] = useState<IAccessToken & {createdAt?:Date, updatedAt?:Date} | undefined>()
    const [updatedToken, setUpdatedToken] = useState<IAccessToken>({
        ipAddress: '',
        jwt: '',
        disabled: false
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    const handleTextFieldChange = (field:string, value:string) => {
        setUpdatedToken({...updatedToken, ...{[field]: value}})
    }

    const handleSwitchChange = (field:string, event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked)
        setUpdatedToken({...updatedToken, ...{[field]: event.target.checked}})
    }

    const onUpdate = async () => {
        if (!token) return

        const updateData:{_id?:string, ipAddress?:string, jwt?:string, disabled?:boolean} = {
            _id: updatedToken._id,
            ipAddress: updatedToken.ipAddress === token.ipAddress? undefined: updatedToken.ipAddress,
            jwt: updatedToken.jwt === token.jwt? undefined: updatedToken.jwt,
            disabled: updatedToken.disabled === token.disabled? token.disabled: updatedToken.disabled
        }
        console.log('save update: ', updateData)

        // // send update data to the api
        if (user?._id) {
            try {
                const reqResp = await updateFunc(user._id, clientDeviceId || '', updateData)
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
                const tkn = UserClientDeviceTokenService.getClientDeviceAccessTokenById(user, clientDeviceId, clientDeviceTokenId || '')
                setToken(tkn)
                if (tkn) {
                    setUpdatedToken(tkn)
                } else {
                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: ['Token does not exist on this user']}
                    })
                }
            }
        }

        init()

    }, [user, clientDeviceId, clientDeviceTokenId])

    const itemSx = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        paddingLeft: '20px'
    }

    const hasChanges = (() => {
        if (!token) return false

        return !(
            token.ipAddress !== updatedToken.ipAddress ||
            token.jwt !== updatedToken.jwt ||
            token.disabled !== updatedToken.disabled
        )
    })()

    return user? (
        <>
            {
                token? (
                    <>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">IP Address</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <TextField
                                    fullWidth
                                    defaultValue={updatedToken?.ipAddress || ''}
                                    onChange={(e) => handleTextFieldChange('ipAddress', e.target.value)} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">JWT</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <TextField
                                    fullWidth
                                    defaultValue={updatedToken?.jwt || ''}
                                    onChange={(e) => handleTextFieldChange('jwt', e.target.value)} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Disabled</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <Switch
                                    onChange={e => handleSwitchChange('disabled', e)}
                                    checked={updatedToken.disabled} />
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
                    disabled={hasChanges || !token}>
                    Update
                </Button>
            </Grid>
        </>
    ): null
}

export default UserWorkspaceUserRefEditForm