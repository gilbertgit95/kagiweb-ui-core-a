import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import { IAccount, IPassword } from '../../types/account';

interface props {
    account?: IAccount,
    createFunc: (accountId:string, passInfo:{currPassword:string, newPassword:string}) => Promise<{data:IPassword}>,
    created?: (accountId:string|undefined, password:IPassword|undefined) => void
}

const AccountPasswordCreateForm = ({account, createFunc, created}:props) => {
    const [passInfo, setPassInfo] = useState<{currPassword:string, repeatPassword:string, newPassword:string}>({
        currPassword: '',
        repeatPassword: '',
        newPassword: ''
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    const handleTextFieldChange = (field:string, value:string) => {
        setPassInfo({...passInfo, ...{[field]: value}})
    }

    const onCreate = async () => {
        if (!account) return

        const newData:{currPassword:string, newPassword:string} = {
            currPassword: passInfo.currPassword,
            newPassword: passInfo.newPassword
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

    const createEnabled = (
        passInfo.newPassword.length &&
        passInfo.currPassword.length &&
        passInfo.newPassword === passInfo.repeatPassword
    )

    return account? (
        <>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">New Password</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <TextField
                        fullWidth
                        type="password"
                        defaultValue={passInfo?.newPassword || ''}
                        onChange={(e) => handleTextFieldChange('newPassword', e.target.value)} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Repeat Password</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <TextField
                        fullWidth
                        type="password"
                        defaultValue={passInfo?.repeatPassword || ''}
                        onChange={(e) => handleTextFieldChange('repeatPassword', e.target.value)} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Current Password</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <TextField
                        fullWidth
                        type="password"
                        defaultValue={passInfo?.currPassword || ''}
                        onChange={(e) => handleTextFieldChange('currPassword', e.target.value)} />
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
                    disabled={!createEnabled}>
                    Create
                </Button>
            </Grid>
        </>
    ): null
}

export default AccountPasswordCreateForm