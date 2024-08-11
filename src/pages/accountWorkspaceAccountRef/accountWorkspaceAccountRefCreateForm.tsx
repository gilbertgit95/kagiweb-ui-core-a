import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography, TextField, Switch } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import { IAccount, IWorkspaceAccountRef } from '../../types/account';

interface props {
    account?: IAccount,
    workspaceId?:string,
    createFunc: (
        accountId:string,
        workspaceId:string,
        nameId:string,
        readAccess: boolean,
        updateAccess: boolean,
        createAccess: boolean,
        deleteAccess: boolean,
        disabled: boolean
    ) => Promise<{data:IWorkspaceAccountRef & {nameId?: string}}>,
    created?: (accountId:string|undefined, workspaceId:string, accountRef:IWorkspaceAccountRef|undefined) => void
}

const AccountWorkspaceAccountRefCreateForm = ({account, workspaceId, createFunc, created}:props) => {
    const [accountRef, setNewUserRef] = useState<IWorkspaceAccountRef & {nameId?: string}>({
        accountId: '',
        nameId: '',
        readAccess: true,
        updateAccess: false,
        createAccess: false,
        deleteAccess: false,
        disabled: false
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    const handleTextFieldChange = (field:string, value:string) => {
        setNewUserRef({...accountRef, ...{[field]: value}})
    }

    const handleSwitchChange = (field:string, event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked)
        setNewUserRef({...accountRef, ...{[field]: event.target.checked}})
    }

    const onCreate = async () => {
        if (!account) return

        const newData:IWorkspaceAccountRef & {nameId?: string} = {
            accountId: '',
            nameId: accountRef.nameId,
            readAccess: accountRef.readAccess,
            updateAccess: accountRef.updateAccess,
            createAccess: accountRef.createAccess,
            deleteAccess: accountRef.deleteAccess,
            disabled: accountRef.disabled
        }
        console.log('save update: ', newData)

        // // send update data to the api
        if (account?._id) {
            try {
                const reqResp = await createFunc(
                    account._id,
                    workspaceId || '',
                    accountRef.nameId || '',
                    Boolean(accountRef.readAccess),
                    Boolean(accountRef.updateAccess),
                    Boolean(accountRef.createAccess),
                    Boolean(accountRef.deleteAccess),
                    Boolean(accountRef.disabled)
                )
                if (created) created(account?._id, workspaceId || '', reqResp?.data)
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
                    <Typography variant="subtitle1">NameID</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <TextField
                        fullWidth
                        defaultValue={accountRef?.nameId || ''}
                        onChange={(e) => handleTextFieldChange('nameId', e.target.value)} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Read Access</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Switch
                        onChange={e => handleSwitchChange('readAccess', e)}
                        checked={accountRef.readAccess} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Update Access</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Switch
                        onChange={e => handleSwitchChange('updateAccess', e)}
                        checked={accountRef.updateAccess} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Create Access</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Switch
                        onChange={e => handleSwitchChange('createAccess', e)}
                        checked={accountRef.createAccess} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Delete Access</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Switch
                        onChange={e => handleSwitchChange('deleteAccess', e)}
                        checked={accountRef.deleteAccess} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Disabled</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Switch
                        onChange={e => handleSwitchChange('disabled', e)}
                        checked={accountRef.disabled} />
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

export default AccountWorkspaceAccountRefCreateForm