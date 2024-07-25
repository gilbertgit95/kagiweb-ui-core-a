import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import AccountContactInfoService from './accountContactInfoService';
import { IAccount, IContactInfo, TContactInfoType, contactInfoTypes } from '../../types/account';

interface props {
    account?: IAccount,
    contactInfoId?: string,
    updateFunc: (accountId:string, updateData:IContactInfo) => Promise<{data:IContactInfo}>,
    updated?: (accountId:string|undefined, accountInfo:IContactInfo|undefined) => void
}

const AccountContactInfoEditForm = ({account, contactInfoId, updateFunc, updated}:props) => {
    const [contactInfo, setContactInfo] = useState<IContactInfo & {createdAt?:Date, updatedAt?:Date} | undefined>()
    const [updatedContactInfo, setUpdatedContactInfo] = useState<IContactInfo>({
        value: '',
        type: contactInfoTypes[0] as TContactInfoType
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    const handleTextFieldChange = (field:string, value:string) => {
        setUpdatedContactInfo({...updatedContactInfo, ...{[field]: value}})
    }

    const handleTypeSelectionChange = (event: SelectChangeEvent) => {
        const type = event.target.value as TContactInfoType
        setUpdatedContactInfo({...updatedContactInfo, ...{type}})
    }

    const onUpdate = async () => {
        if (!contactInfo) return

        const updateData:IContactInfo = {
            _id: updatedContactInfo._id,
            value: updatedContactInfo.value === contactInfo.value? contactInfo.value: updatedContactInfo.value,
            type: updatedContactInfo.type === contactInfo.type? contactInfo.type: updatedContactInfo.type
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
            if (account && account.contactInfos && contactInfoId) {
                const contactInf = AccountContactInfoService.getContactInfoById(account, contactInfoId)
                setContactInfo(contactInf)
                if (contactInf) {
                    setUpdatedContactInfo(contactInf)
                } else {
                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: ['Contact info does not exist on this account']}
                    })
                }
            }
        }

        init()

    }, [account, contactInfoId])

    const itemSx = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        paddingLeft: '20px'
    }

    const hasChanges = (() => {
        if (!contactInfo) return false

        return !(
            contactInfo.value !== updatedContactInfo.value ||
            contactInfo.type !== updatedContactInfo.type
        )
    })()

    return account? (
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
                                    value={updatedContactInfo?.type}
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
                                    defaultValue={updatedContactInfo?.value || ''}
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

export default AccountContactInfoEditForm