import React, { useState, useEffect } from 'react';
import { Button, Typography, TextField, Switch } from '@mui/material';

import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';

import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import { IAccount, IAccountUpdate } from '../../types/account';

interface Props {
    accountId: string | undefined,
    getFunc: (accountId:string) => Promise<{data:IAccount}>,
    updateFunc: (updateData:IAccountUpdate) => Promise<{data:IAccount}>,
    updated?: (account: IAccount|undefined) => void
}

export  const AccountEditForm = ({ accountId, getFunc, updateFunc, updated }:Props) => {
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [account, setAccount] = useState<IAccount | undefined>()
    const [updatedAccount, setUpdatedAccount] = useState<IAccount>({
        nameId: '',
        rolesRefs: [],
        accountInfos: [],
accountConfigs: [],
        passwords: [],
        contactInfos: [],
        clientDevices: [],
        limitedTransactions: [],
        workspaces: [],
        disabled: false,
        verified: false
    })

    const handleTextFieldChange = (field:string, value:string) => {
        setUpdatedAccount({...updatedAccount, ...{[field]: value}})
    }

    const handleSwitchChange = (field:string, event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked)
        setUpdatedAccount({...updatedAccount, ...{[field]: event.target.checked}})
    }

    const onUpdate = async () => {
        if (!account) return

        const updateData:IAccountUpdate = {
            _id: updatedAccount._id,
            nameId: updatedAccount.nameId === account.nameId? undefined: updatedAccount.nameId,
            disabled: updatedAccount.disabled === account.disabled? undefined: updatedAccount.disabled,
            verified: updatedAccount.verified === account.verified? undefined: updatedAccount.verified
        }
        console.log('save update: ', updateData)

        // send update data to the api
        try {
            const accountResp = await updateFunc(updateData)
            setAccount(accountResp.data)
            setUpdatedAccount(accountResp.data)
            setInfoAndErrors({
                ...{infoMessages: ['Successfull Update']},
                ...{errorMessages: []}
            })
            if (updated) updated(accountResp?.data)
        } catch (err:any) {
            // error while updating
            // log to the UI
            setInfoAndErrors({
                ...infoAndErrors,
                ...{errorMessages: [err?.response?.data?.message || '']}
            })
        }
    }
    
    useEffect(() => {
        const init = async () => {
            console.log('Edit: ', accountId)

            if (accountId) {
                try {
                    const accountResp = await getFunc(accountId)
                    setAccount(accountResp.data)
                    setUpdatedAccount(accountResp.data)
                } catch (err:any) {
                    // error fetching account
                    // log to the UI
                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: [err?.response?.data?.message || '']}
                    })
                }
            }
        }

        init()
    }, [accountId, getFunc])

    const itemSx = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        paddingLeft: '20px'
    }

    const hasChanges = (() => {
        if (!account) return false

        return !(
            account.nameId !== updatedAccount.nameId ||
            account.disabled !== updatedAccount.disabled ||
            account.verified !== updatedAccount.verified
        )
    })()

    return (
        <>
            {
                account? (
                    <>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">NameID</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <TextField
                                    fullWidth
                                    defaultValue={updatedAccount.nameId}
                                    onChange={(e) => handleTextFieldChange('nameId', e.target.value)} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Disabled</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <Switch
                                    onChange={e => handleSwitchChange('disabled', e)}
                                    checked={updatedAccount.disabled} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Verified</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <Switch
                                    onChange={e => handleSwitchChange('verified', e)}
                                    checked={updatedAccount.verified} />
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
                    disabled={hasChanges || !account}>
                    Update
                </Button>
            </Grid>
        </>
    )
}

export default AccountEditForm