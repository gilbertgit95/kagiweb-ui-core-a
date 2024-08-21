import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography, TextField, Switch } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import { IAccount, IWorkspace } from '../../types/account';

interface props {
    account?: IAccount,
    createFunc: (accountId:string, name:string, description:string, disabled:boolean) => Promise<{data:IWorkspace}>,
    created?: (accountId:string|undefined, accountInfo:IWorkspace|undefined) => void
}

const AccountWorkspaceCreateForm = ({account, createFunc, created}:props) => {
    const [newWorkspace, setNewWorkspace] = useState<IWorkspace>({
        name: '',
        description: '',
        disabled: false
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    const handleTextFieldChange = (field:string, value:string) => {
        setNewWorkspace({...newWorkspace, ...{[field]: value}})
    }

    const handleSwitchChange = (field:string, event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.checked)
        setNewWorkspace({...newWorkspace, ...{[field]: event.target.checked}})
    }

    const onCreate = async () => {
        if (!account) return

        // // send update data to the api
        if (account?._id) {
            console.log('description: ', JSON.stringify(newWorkspace))
            try {
                const reqResp = await createFunc(
                    account._id,
                    newWorkspace.name,
                    newWorkspace.description || '',
                    Boolean(newWorkspace.disabled)
                )
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
                    <Typography variant="subtitle1">Name</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <TextField
                        fullWidth
                        defaultValue={newWorkspace?.name || ''}
                        onChange={(e) => handleTextFieldChange('name', e.target.value)} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Description</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <TextField
                        fullWidth
                        defaultValue={newWorkspace?.description || ''}
                        onChange={(e) => handleTextFieldChange('description', e.target.value)} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Disabled</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Switch
                        onChange={e => handleSwitchChange('disabled', e)}
                        checked={newWorkspace.disabled} />
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

export default AccountWorkspaceCreateForm