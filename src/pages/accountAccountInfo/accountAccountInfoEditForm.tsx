import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import AccountAccountInfoService from './accountAccountInfoService';
import { IAccount, IAccountInfo, TAccountInfoType, accountInfoTypes } from '../../types/account';

interface props {
    account?: IAccount,
    accountInfoId?: string,
    updateFunc: (accountId:string, updateData:IAccountInfo) => Promise<{data:IAccountInfo}>,
    updated?: (accountId:string|undefined, accountInfo:IAccountInfo|undefined) => void
}

const AccountAccountInfoEditForm = ({account, accountInfoId, updateFunc, updated}:props) => {
    const [accountInfo, setAccountInfo] = useState<IAccountInfo & {createdAt?:Date, updatedAt?:Date} | undefined>()
    const [updatedAccountInfo, setUpdatedAccountInfo] = useState<IAccountInfo>({
        key: '',
        value: '',
        type: accountInfoTypes[0] as TAccountInfoType
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    const handleTextFieldChange = (field:string, value:string) => {
        setUpdatedAccountInfo({...updatedAccountInfo, ...{[field]: value}})
    }

    const handleTypeSelectionChange = (event: SelectChangeEvent) => {
        const type = event.target.value as TAccountInfoType
        setUpdatedAccountInfo({...updatedAccountInfo, ...{type}})
    }

    const onUpdate = async () => {
        if (!accountInfo) return

        const updateData:IAccountInfo = {
            _id: updatedAccountInfo._id,
            key: updatedAccountInfo.key === accountInfo.key? accountInfo.key: updatedAccountInfo.key,
            value: updatedAccountInfo.value === accountInfo.value? accountInfo.value: updatedAccountInfo.value,
            type: updatedAccountInfo.type === accountInfo.type? accountInfo.type: updatedAccountInfo.type
        }
        console.log('save update: ', updateData)

        // // send update data to the api
        if (account?._id) {
            try {
                const reqResp = await updateFunc(account._id, updateData)
                setInfoAndErrors({
                    ...{infoMessages: ['Successfull Update']},
                    ...{errorMessages: []}
                })
                if (updated) updated(account?._id, reqResp?.data)
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
            if (account && account.accountInfos && accountInfoId) {
                const accInf = AccountAccountInfoService.getAccountInfoById(account, accountInfoId)
                setAccountInfo(accInf)
                if (accInf) {
                    setUpdatedAccountInfo(accInf)
                } else {
                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: ['Info does not exist on this account']}
                    })
                }
            }
        }

        init()

    }, [account, accountInfoId])

    const itemSx = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        paddingLeft: '20px'
    }

    const hasChanges = (() => {
        if (!accountInfo) return false

        return !(
            accountInfo.key !== updatedAccountInfo.key ||
            accountInfo.value !== updatedAccountInfo.value ||
            accountInfo.type !== updatedAccountInfo.type
        )
    })()

    return account? (
        <>
            {
                accountInfo? (
                    <>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Type</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <Select
                                    fullWidth
                                    value={updatedAccountInfo?.type}
                                    onChange={handleTypeSelectionChange}>
                                    {
                                        accountInfoTypes.map((item, index) => (
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
                                    defaultValue={updatedAccountInfo?.key || ''}
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
                                    defaultValue={updatedAccountInfo?.value || ''}
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
                    disabled={hasChanges || !accountInfo}>
                    Update
                </Button>
            </Grid>
        </>
    ): null
}

export default AccountAccountInfoEditForm