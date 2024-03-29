import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import UserUserInfoService from './userUserInfoService';
import { IUser, IUserInfo, TUserInfoType, userInfoTypes } from '../../types/user';

interface props {
    user?: IUser,
    userInfoId?: string,
    updateFunc: (userId:string, updateData:IUserInfo) => Promise<{data:IUserInfo}>,
    updated?: (userId:string|undefined, userInfo:IUserInfo|undefined) => void
}

const UserUserInfoEditForm = ({user, userInfoId, updateFunc, updated}:props) => {
    const [userInfo, setUserInfo] = useState<IUserInfo & {createdAt?:Date, updatedAt?:Date} | undefined>()
    const [updatedUserInfo, setUpdatedUserInfo] = useState<IUserInfo>({
        key: '',
        value: '',
        type: userInfoTypes[0] as TUserInfoType
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    const handleTextFieldChange = (field:string, value:string) => {
        setUpdatedUserInfo({...updatedUserInfo, ...{[field]: value}})
    }

    const handleTypeSelectionChange = (event: SelectChangeEvent) => {
        const type = event.target.value as TUserInfoType
        setUpdatedUserInfo({...updatedUserInfo, ...{type}})
    }

    const onUpdate = async () => {
        if (!userInfo) return

        const updateData:IUserInfo = {
            _id: updatedUserInfo._id,
            key: updatedUserInfo.key === userInfo.key? userInfo.key: updatedUserInfo.key,
            value: updatedUserInfo.value === userInfo.value? userInfo.value: updatedUserInfo.value,
            type: updatedUserInfo.type === userInfo.type? userInfo.type: updatedUserInfo.type
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
            if (user && user.userInfos && userInfoId) {
                const usrInf = UserUserInfoService.getUserInfoById(user, userInfoId)
                setUserInfo(usrInf)
                if (usrInf) {
                    setUpdatedUserInfo(usrInf)
                } else {
                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: ['Info does not exist on this user']}
                    })
                }
            }
        }

        init()

    }, [user, userInfoId])

    const itemSx = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        paddingLeft: '20px'
    }

    const hasChanges = (() => {
        if (!userInfo) return false

        return !(
            userInfo.key !== updatedUserInfo.key ||
            userInfo.value !== updatedUserInfo.value ||
            userInfo.type !== updatedUserInfo.type
        )
    })()

    return user? (
        <>
            {
                userInfo? (
                    <>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Type</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <Select
                                    fullWidth
                                    value={updatedUserInfo?.type}
                                    onChange={handleTypeSelectionChange}>
                                    {
                                        userInfoTypes.map((item, index) => (
                                            <MenuItem key={index} value={item}>{ item }</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Key</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <TextField
                                    fullWidth
                                    defaultValue={updatedUserInfo?.key || ''}
                                    onChange={(e) => handleTextFieldChange('key', e.target.value)} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Value</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <TextField
                                    fullWidth
                                    defaultValue={updatedUserInfo?.value || ''}
                                    onChange={(e) => handleTextFieldChange('value', e.target.value)} />
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
                    disabled={hasChanges || !userInfo}>
                    Update
                </Button>
            </Grid>
        </>
    ): null
}

export default UserUserInfoEditForm