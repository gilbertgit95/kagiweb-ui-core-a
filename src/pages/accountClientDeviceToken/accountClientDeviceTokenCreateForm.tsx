import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography, TextField, Switch } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import { IAccount, IAccessToken } from '../../types/account';

interface props {
    account?: IAccount,
    clientDeviceId?:string,
    createFunc: (accountId:string, clientDeviceId:string, newData:IAccessToken & {expiration:number|undefined}) => Promise<{data:IAccessToken}>,
    created?: (accountId:string|undefined, clientDeviceId:string, token:IAccessToken|undefined) => void
}

const AccountClientDeviceTokenCreateForm = ({account, clientDeviceId, createFunc, created}:props) => {
    const [newToken, setNewToken] = useState<IAccessToken & {expiration:number|undefined}>({
        expiration: undefined,
        jwt: '',
        description: '',
        ipAddress: '',
        disabled: false
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    const handleTextFieldChange = (field:string, value:string|number) => {
        setNewToken({...newToken, ...{[field]: value}})
    }

    const handleSwitchChange = (field:string, event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked)
        setNewToken({...newToken, ...{[field]: event.target.checked}})
    }

    const onCreate = async () => {
        if (!account) return

        const newData:IAccessToken & {expiration:number|undefined} = {
            jwt: '',
            expiration: newToken.expiration,
            description: newToken.description,
            ipAddress: newToken.ipAddress,
            disabled: newToken.disabled
        }
        console.log('save update: ', newData)

        // // send update data to the api
        if (account?._id) {
            try {
                const reqResp = await createFunc(account._id, clientDeviceId || '', newData)
                if (created) created(account?._id, clientDeviceId || '', reqResp?.data)
                setInfoAndErrors({
                    ...{infoMessages: [`Successfully created the token. Please copy the token before you exit the page! --> ${ reqResp?.data?.jwt }`]},
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
                    <Typography variant="subtitle1">Expiration</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <TextField
                        fullWidth
                        type="number"
                        placeholder="in hours"
                        defaultValue={newToken?.expiration || ''}
                        onChange={(e) => handleTextFieldChange('expiration', e.target.value)} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Description</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <TextField
                        fullWidth
                        defaultValue={newToken?.description || ''}
                        onChange={(e) => handleTextFieldChange('description', e.target.value)} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">IP Address</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <TextField
                        fullWidth
                        defaultValue={newToken?.ipAddress || ''}
                        onChange={(e) => handleTextFieldChange('ipAddress', e.target.value)} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Disabled</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Switch
                        onChange={e => handleSwitchChange('disabled', e)}
                        checked={newToken.disabled} />
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

export default AccountClientDeviceTokenCreateForm