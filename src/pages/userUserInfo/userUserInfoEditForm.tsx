import React, { useEffect, useState } from 'react';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Button, Typography, TextField, Switch } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import UserService from '../user/userService';
import UserUserInfoService from './userUserInfoService';
import { IUser, IUserInfo, TUserInfoType } from '../../types/user';
import Config from '../../config';

interface props {
    userId?: string,
    userInfoId?: string
}

const UserUserInfoEditForm = ({userId, userInfoId}:props) => {
    const [user, setUser] = useState<IUser | undefined>()
    const [userInfo, setUserInfo] = useState<IUserInfo & {createdAt?:Date, updatedAt?:Date} | undefined>()
    const [updatedUserInfo, setUpdatedUserInfo] = useState<IUserInfo>({
        key: '',
        value: '',
        type: 'string'
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    const handleTextFieldChange = (field:string, value:string) => {
        setUpdatedUserInfo({...updatedUserInfo, ...{[field]: value}})
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
        // try {
        //     const userResp = await updateFunc(updateData)
        //     setUser(userResp.data)
        //     setUpdatedUser(userResp.data)
        //     setInfoAndErrors({
        //         ...{infoMessages: ['Successfull Update']},
        //         ...{errorMessages: []}
        //     })
        //     if (updated) updated(userResp?.data)
        // } catch (err:any) {
        //     // error while updating
        //     // log to the UI
        //     setInfoAndErrors({
        //         ...infoAndErrors,
        //         ...{errorMessages: [err?.response?.data?.message || '']}
        //     })
        // }
    }

    useEffect(() => {
        const init = async () => {
            if (userId) {
                try {
                    const userResp = await UserService.getUser(userId)
                    setUser(userResp.data)

                    if (userResp.data && userResp.data.userInfos && userInfoId) {
                        const usrInf = UserUserInfoService.getUserInfoById(userResp.data, userInfoId)
                        setUserInfo(usrInf)
                        if (usrInf) setUpdatedUserInfo(usrInf)
                    }
    
                } catch (err:any) {
                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: [err?.response?.data?.message || '']}
                    })
                }
            }
        }

        init()

    }, [userId, userInfoId])

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
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Type</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <TextField
                                    fullWidth
                                    defaultValue={updatedUserInfo?.type || ''}
                                    onChange={(e) => handleTextFieldChange('type', e.target.value)} />
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