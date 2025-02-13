import React, { useState } from 'react';
import { Button, Typography, TextField, Switch } from '@mui/material';
import Grid from '@mui/material/Grid';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import AccountService from './accountService';
import { IAccount } from '../../types/account';

export const AccountCreateForm = () => {
    const [pageState, setPageState] = useState({
        disableSaveButton: false
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [account, setAccount] = useState<IAccount>({
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
        setAccount({...account, ...{[field]: value}})
    }

    const handleSwitchChange = (field:string, event: React.ChangeEvent<HTMLInputElement>) => {
        setAccount({...account, ...{[field]: event.target.checked}})
    }

    const onCreate = async () => {
        const newAccount:IAccount = account
        console.log('create update: ', newAccount)
        setPageState({disableSaveButton: true})

        // send update data to the api
        try {
            const accountResp = await AccountService.createAccount(newAccount)
            setAccount(accountResp.data)
            setInfoAndErrors({
                ...{infoMessages: ['Successfull Creation']},
                ...{errorMessages: []}
            })
        } catch (err:any) {
            // error while updating
            // log to the UI
            setInfoAndErrors({
                ...infoAndErrors,
                ...{errorMessages: [err?.response?.data?.message || '']}
            })
            setPageState({disableSaveButton: false})
        }
    }

    const itemSx = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        paddingLeft: '20px'
    }

    return (
        <>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">NameID</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <TextField
                        fullWidth
                        defaultValue={account.nameId}
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
                        defaultChecked={account.disabled} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Verified</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Switch
                        onChange={e => handleSwitchChange('verified', e)}
                        defaultChecked={account.verified} />
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
                    startIcon={<AdminPanelSettingsIcon />}
                    onClick={onCreate}
                    disabled={pageState.disableSaveButton}>
                    Create
                </Button>
            </Grid>
        </>
    )
}

export default AccountCreateForm