import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Divider } from '@mui/material';

import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PrimaryHeader from '../../components/headers/primaryHeader';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import AccountService from '../account/accountService';
import AccountRoleService from './accountWorkspaceAccountRefRoleService';
import { IAccount } from '../../types/account';
import AccountRolesEditForm from './accountWorkspaceAccountRefRolesEditForm';

const AccountWorkspaceAccountRefRolesEditPage = () => {
    const { accountId, workspaceId, accountRefId } = useParams()
    const navigate = useNavigate()
    const [account, setAccount] = useState<IAccount | undefined>()
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    const reLoadUser = async () => {
        if (accountId) {
            try {
                const accountResp = await AccountService.getAccount(accountId)
                setAccount(accountResp.data)
            } catch (err:any) {
                setInfoAndErrors({
                    ...{infoMessages: []},
                    ...{errorMessages: [err?.response?.data?.message || '']}
                })
            }
        }
    }

    useEffect(() => {
        const init = async () => {
            if (accountId) {
                try {
                    const accountResp = await AccountService.getAccount(accountId)
                    setAccount(accountResp.data)

                } catch (err:any) {
                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: [err?.response?.data?.message || '']}
                    })
                }
            }
        }
        console.log('initiate account roles edit page')
        init()
    }, [accountId])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Account Workspace Account Ref Roles Update View'} subtitle={ account?.nameId } />
                    <Divider />
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="text"
                        startIcon={<ArrowBackIosNewIcon />}
                        onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </Grid>
                <AccountRolesEditForm
                    account={account}
                    workspaceId={workspaceId || ''}
                    accountRefId={accountRefId || ''}
                    createFunc={AccountRoleService.createAccountWorkspaceAccountRefRole}
                    deleteFunc={AccountRoleService.deleteAccountWorkspaceAccountRefRole}
                    onChange={reLoadUser} />
                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default AccountWorkspaceAccountRefRolesEditPage