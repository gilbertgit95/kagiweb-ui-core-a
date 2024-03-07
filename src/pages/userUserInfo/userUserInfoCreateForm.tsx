import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import { IUser, IUserInfo, TUserInfoType, userInfoTypes } from '../../types/user';

interface props {
    user?: IUser,
    createFunc: (userId:string, newData:IUserInfo) => Promise<{data:IUserInfo}>,
    created?: (userId:string|undefined, userInfo:IUserInfo|undefined) => void
}

const UserUserInfoCreateForm = ({user, createFunc, created}:props) => {
    const [newUserInfo, setNewUserInfo] = useState<IUserInfo>({
        key: '',
        value: '',
        type: 'string'
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    const handleTextFieldChange = (field:string, value:string) => {
        setNewUserInfo({...newUserInfo, ...{[field]: value}})
    }

    const handleTypeSelectionChange = (event: SelectChangeEvent) => {
        const type = event.target.value as TUserInfoType
        setNewUserInfo({...newUserInfo, ...{type}})
    }

    const onCreate = async () => {
        if (!user) return

        const newData:IUserInfo = {
            _id: newUserInfo._id,
            key: newUserInfo.key,
            value: newUserInfo.value,
            type: newUserInfo.type
        }
        console.log('save update: ', newData)

        // // send update data to the api
        if (user?._id) {
            try {
                const reqResp = await createFunc(user._id, newData)
                if (created) created(user?._id, reqResp?.data)
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
                    <Typography variant="subtitle1">Type</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Select
                        fullWidth
                        value={newUserInfo?.type}
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
                        defaultValue={newUserInfo?.key || ''}
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
                        defaultValue={newUserInfo?.value || ''}
                        onChange={(e) => handleTextFieldChange('value', e.target.value)} />
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

export default UserUserInfoCreateForm