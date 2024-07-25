import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import { IAccount, IContactInfo, TContactInfoType, contactInfoTypes } from '../../types/account';

interface props {
    account?: IAccount,
    createFunc: (accountId:string, newData:IContactInfo) => Promise<{data:IContactInfo}>,
    created?: (accountId:string|undefined, accountInfo:IContactInfo|undefined) => void
}

const AccountContactInfoCreateForm = ({account, createFunc, created}:props) => {
    const [newContactInfo, setNewContactInfo] = useState<IContactInfo>({
        value: '',
        type: contactInfoTypes[0] as TContactInfoType
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    const handleTextFieldChange = (field:string, value:string) => {
        setNewContactInfo({...newContactInfo, ...{[field]: value}})
    }

    const handleTypeSelectionChange = (event: SelectChangeEvent) => {
        const type = event.target.value as TContactInfoType
        setNewContactInfo({...newContactInfo, ...{type}})
    }

    const onCreate = async () => {
        if (!account) return

        const newData:IContactInfo = {
            _id: newContactInfo._id,
            value: newContactInfo.value,
            type: newContactInfo.type
        }
        console.log('save update: ', newData)

        // // send update data to the api
        if (account?._id) {
            try {
                const reqResp = await createFunc(account._id, newData)
                if (created) created(account?._id, reqResp?.data)
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

    return account? (
        <>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Type</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Select
                        fullWidth
                        value={newContactInfo?.type}
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
                        defaultValue={newContactInfo?.value || ''}
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

export default AccountContactInfoCreateForm