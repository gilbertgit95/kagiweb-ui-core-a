import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import UserLimitedTransactionService from './userLimitedTransactionService';
import { IUser, ILimitedTransaction, TContactInfoType, contactInfoTypes } from '../../types/user';

interface props {
    user?: IUser,
    limitedTransactionId?: string,
    updateFunc: (userId:string, updateData:ILimitedTransaction) => Promise<{data:ILimitedTransaction}>,
    updated?: (userId:string|undefined, userInfo:ILimitedTransaction|undefined) => void
}

const UserLimitedTransactionEditForm = ({user, limitedTransactionId, updateFunc, updated}:props) => {
    const [contactInfo, setLimitedTansaction] = useState<ILimitedTransaction & {createdAt?:Date, updatedAt?:Date} | undefined>()
    const [updatedLimitedTransaction, setUpdatedLimitedTransaction] = useState<ILimitedTransaction>({
        value: '',
        // type: contactInfoTypes[0] as TContactInfoType
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    const handleTextFieldChange = (field:string, value:string) => {
        setUpdatedLimitedTransaction({...updatedLimitedTransaction, ...{[field]: value}})
    }

    const handleTypeSelectionChange = (event: SelectChangeEvent) => {
        const type = event.target.value as TContactInfoType
        setUpdatedLimitedTransaction({...updatedLimitedTransaction, ...{type}})
    }

    const onUpdate = async () => {
        if (!contactInfo) return

        const updateData:ILimitedTransaction = {
            _id: updatedLimitedTransaction._id,
            value: updatedLimitedTransaction.value === contactInfo.value? contactInfo.value: updatedLimitedTransaction.value,
            type: updatedLimitedTransaction.type === contactInfo.type? contactInfo.type: updatedLimitedTransaction.type
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
            if (user && user.contactInfos && limitedTransactionId) {
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
        if (!contactInfo) return false

        return !(
            contactInfo.value !== updatedLimitedTransaction.value ||
            contactInfo.type !== updatedLimitedTransaction.type
        )
    })()

    return user? (
        <>
            {
                contactInfo? (
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
                                        contactInfoTypes.map((item, index) => (
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
                    disabled={hasChanges || !contactInfo}>
                    Update
                </Button>
            </Grid>
        </>
    ): null
}

export default UserLimitedTransactionEditForm