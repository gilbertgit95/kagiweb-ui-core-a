import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography, TextField, Switch } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import AccountLimitedTransactionService from './accountLimitedTransactionService';
import { IAccount, ILimitedTransaction, TLimitedTransactionType, limitedTransactionTypes } from '../../types/account';

interface props {
    account?: IAccount,
    limitedTransactionId?: string,
    updateFunc: (accountId:string, updateData:ILimitedTransaction) => Promise<{data:ILimitedTransaction}>,
    updated?: (accountId:string|undefined, accountInfo:ILimitedTransaction|undefined) => void
}

const AccountLimitedTransactionEditForm = ({account, limitedTransactionId, updateFunc, updated}:props) => {
    const [limitedTransaction, setLimitedTansaction] = useState<ILimitedTransaction & {createdAt?:Date, updatedAt?:Date} | undefined>()
    const [updatedLimitedTransaction, setUpdatedLimitedTransaction] = useState<ILimitedTransaction>({
        limit: 0,
        attempts: 0,
        type: limitedTransactionTypes[0] as TLimitedTransactionType,
        key: '',
        value: '', // optional, can be use to store additional info
        recipient: '', // optional, only for some LT like: otp, pass reset
        disabled: false
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    const handleTextFieldChange = (field:string, value:string, isNumber:boolean=false) => {
        let val:string|number = isNumber? parseInt(value): value
        setUpdatedLimitedTransaction({...updatedLimitedTransaction, ...{[field]: val}})
    }

    const handleSwitchChange = (field:string, event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.checked)
        setUpdatedLimitedTransaction({...updatedLimitedTransaction, ...{[field]: event.target.checked}})
    }

    const onUpdate = async () => {
        if (!limitedTransaction) return

        const updateData:ILimitedTransaction = {
            _id: updatedLimitedTransaction._id,
            key: updatedLimitedTransaction.key === limitedTransaction.key? limitedTransaction.key: updatedLimitedTransaction.key,
            value: updatedLimitedTransaction.value === limitedTransaction.value? limitedTransaction.value: updatedLimitedTransaction.value,
            limit: updatedLimitedTransaction.limit === limitedTransaction.limit? limitedTransaction.limit: updatedLimitedTransaction.limit,
            attempts: updatedLimitedTransaction.attempts === limitedTransaction.attempts? limitedTransaction.attempts: updatedLimitedTransaction.attempts,
            disabled: updatedLimitedTransaction.disabled === limitedTransaction.disabled? limitedTransaction.disabled: updatedLimitedTransaction.disabled,
            recipient: limitedTransaction.recipient,
            type: limitedTransaction.type
        }
        console.log('save update: ', updateData)

        // send update data to the api
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
            if (account && account.limitedTransactions && limitedTransactionId) {
                const lt = AccountLimitedTransactionService.getLimitedTransactionById(account, limitedTransactionId)
                setLimitedTansaction(lt)
                if (lt) {
                    setUpdatedLimitedTransaction(lt)
                } else {
                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: ['Limited transaction does not exist on this account']}
                    })
                }
            }
        }

        init()

    }, [account, limitedTransactionId])

    const itemSx = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        paddingLeft: '20px'
    }

    const hasChanges = (() => {
        if (!limitedTransaction) return false

        return !(
            limitedTransaction.key !== updatedLimitedTransaction.key ||
            limitedTransaction.value !== updatedLimitedTransaction.value ||
            limitedTransaction.limit !== updatedLimitedTransaction.limit ||
            limitedTransaction.attempts !== updatedLimitedTransaction.attempts ||
            limitedTransaction.disabled !== updatedLimitedTransaction.disabled
        )
    })()

    return account? (
        <>
            {
                limitedTransaction? (
                    <>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Type</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <Select
                                    fullWidth
                                    disabled
                                    value={updatedLimitedTransaction?.type}>
                                    {/* onChange={handleTypeSelectionChange}> */}
                                    {
                                        limitedTransactionTypes.map((item, index) => (
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
                                    defaultValue={updatedLimitedTransaction?.key || ''}
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
                                    defaultValue={updatedLimitedTransaction?.value || ''}
                                    onChange={(e) => handleTextFieldChange('value', e.target.value)} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Limit</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    defaultValue={updatedLimitedTransaction?.limit || 0}
                                    onChange={(e) => handleTextFieldChange('limit', e.target.value, true)} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Attempts</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    defaultValue={updatedLimitedTransaction?.attempts || 0}
                                    onChange={(e) => handleTextFieldChange('attempts', e.target.value, true)} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Disabled</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <Switch
                                    onChange={e => handleSwitchChange('disabled', e)}
                                    checked={updatedLimitedTransaction.disabled} />
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
                    disabled={hasChanges || !limitedTransaction}>
                    Update
                </Button>
            </Grid>
        </>
    ): null
}

export default AccountLimitedTransactionEditForm