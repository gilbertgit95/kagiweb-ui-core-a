import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import UserLimitedTransactionService from './userLimitedTransactionService';
import { IUser, ILimitedTransaction, TLimitedTransactionType, limitedTransactionTypes } from '../../types/user';

interface props {
    user?: IUser,
    limitedTransactionId?: string,
    updateFunc: (userId:string, updateData:ILimitedTransaction) => Promise<{data:ILimitedTransaction}>,
    updated?: (userId:string|undefined, userInfo:ILimitedTransaction|undefined) => void
}

const UserLimitedTransactionEditForm = ({user, limitedTransactionId, updateFunc, updated}:props) => {
    const [limitedTransaction, setLimitedTansaction] = useState<ILimitedTransaction & {createdAt?:Date, updatedAt?:Date} | undefined>()
    const [updatedLimitedTransaction, setUpdatedLimitedTransaction] = useState<ILimitedTransaction>({
        limit: 0,
        attempts: 0,
        type: limitedTransactionTypes[0] as TLimitedTransactionType,
        key: '',
        value: '', // optional, can be use to store additional info
        expTime: '', // optional expiration time, only for timed LT
        recipient: '', // optional, only for some LT like: otp, pass reset
        disabled: false
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    const handleTextFieldChange = (field:string, value:string) => {
        setUpdatedLimitedTransaction({...updatedLimitedTransaction, ...{[field]: value}})
    }

    const handleTypeSelectionChange = (event: SelectChangeEvent) => {
        const type = event.target.value as TLimitedTransactionType
        setUpdatedLimitedTransaction({...updatedLimitedTransaction, ...{type}})
    }

    const onUpdate = async () => {
        if (!limitedTransaction) return

        // const updateData:ILimitedTransaction = {
        //     _id: updatedLimitedTransaction._id,
        //     value: updatedLimitedTransaction.value === limitedTransaction.value? limitedTransaction.value: updatedLimitedTransaction.value,
        //     type: updatedLimitedTransaction.type === limitedTransaction.type? limitedTransaction.type: updatedLimitedTransaction.type
        // }
        // console.log('save update: ', updateData)

        // // // send update data to the api
        // if (user?._id) {
        //     try {
        //         const reqResp = await updateFunc(user._id, updateData)
        //         setInfoAndErrors({
        //             ...{infoMessages: ['Successfull Update']},
        //             ...{errorMessages: []}
        //         })
        //         if (updated) updated(user?._id, reqResp?.data)
        //     } catch (err:any) {
        //         // error while updating
        //         // log to the UI
        //         setInfoAndErrors({
        //             ...infoAndErrors,
        //             ...{errorMessages: [err?.response?.data?.message || '']}
        //         })
        //     }
        // }
    }

    useEffect(() => {
        const init = async () => {
            if (user && user.limitedTransactions && limitedTransactionId) {
                const contactInf = UserLimitedTransactionService.getLimitedTransactionById(user, limitedTransactionId)
                // setLimitedTansaction(contactInf)
                // if (contactInf) {
                //     setUpdatedLimitedTransaction(contactInf)
                // } else {
                //     setInfoAndErrors({
                //         ...{infoMessages: []},
                //         ...{errorMessages: ['Contact info does not exist on this user']}
                //     })
                // }
            }
        }

        init()

    }, [user, limitedTransactionId])

    const itemSx = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        paddingLeft: '20px'
    }

    const hasChanges = (() => {
        if (!limitedTransaction) return false

        return !(
            limitedTransaction.value !== updatedLimitedTransaction.value ||
            limitedTransaction.type !== updatedLimitedTransaction.type
        )
    })()

    return user? (
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
                                    value={updatedLimitedTransaction?.type}
                                    onChange={handleTypeSelectionChange}>
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
                                <Typography variant="subtitle1">Value</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <TextField
                                    fullWidth
                                    defaultValue={updatedLimitedTransaction?.value || ''}
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
                    disabled={hasChanges || !limitedTransaction}>
                    Update
                </Button>
            </Grid>
        </>
    ): null
}

export default UserLimitedTransactionEditForm