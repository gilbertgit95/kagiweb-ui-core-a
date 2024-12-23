import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography, TextField, Switch } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import { IAccount, IAccountAccountRef } from '../../types/account';

interface props {
    account?: IAccount,
    accountRefId?: string,
    getFunc: (accountId:string, accountRefId: string) => Promise<{data: IAccountAccountRef & {nameId?:string} | null}>
    updateFunc: (
        accountId:string,
        accountRefId:string,
        disabled:boolean
    ) => Promise<{data:IAccountAccountRef}>,
    updated?: (accountId:string|undefined, accountRef:IAccountAccountRef|undefined) => void
}

const AccountAccountRefEditForm = ({account, accountRefId, getFunc, updateFunc, updated}:props) => {
    const [accountRef, setAccountRef] = useState<IAccountAccountRef & {nameId?:string, createdAt?:Date, updatedAt?:Date} | undefined>()
    const [updatedUserRef, setUpdatedUserRef] = useState<IAccountAccountRef & {nameId?:string}>({
        accountId: '',
        disabled: false
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    // const handleTextFieldChange = (field:string, value:string) => {
    //     setUpdatedUserRef({...updatedUserRef, ...{[field]: value}})
    // }

    const handleSwitchChange = (field:string, event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked)
        setUpdatedUserRef({...updatedUserRef, ...{[field]: event.target.checked}})
    }

    const onUpdate = async () => {
        if (!accountRef) return

        // // send update data to the api
        if (account?._id) {
            try {
                const reqResp = await updateFunc(
                    account._id,
                    accountRefId || '',
                    Boolean(updatedUserRef.disabled)
                )
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
            if (account && accountRefId) {
                const usrRef = await getFunc(account._id || '', accountRefId || '')
                if (usrRef?.data) {
                    setAccountRef(usrRef.data)
                    setUpdatedUserRef(usrRef.data)
                } else {
                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: ['Account Reference does not exist on this user']}
                    })
                }
            }
        }

        init()

    }, [account, accountRefId])

    const itemSx = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        paddingLeft: '20px'
    }

    const hasChanges = (() => {
        if (!accountRef) return false

        return !(
            accountRef.disabled !== updatedUserRef.disabled
        )
    })()

    return account? (
        <>
            {
                accountRef? (
                    <>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">NameID</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <TextField
                                    fullWidth
                                    disabled
                                    defaultValue={accountRef?.nameId || ''} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Disabled</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <Switch
                                    onChange={e => handleSwitchChange('disabled', e)}
                                    checked={updatedUserRef.disabled} />
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
                    disabled={hasChanges || !accountRef}>
                    Update
                </Button>
            </Grid>
        </>
    ): null
}

export default AccountAccountRefEditForm