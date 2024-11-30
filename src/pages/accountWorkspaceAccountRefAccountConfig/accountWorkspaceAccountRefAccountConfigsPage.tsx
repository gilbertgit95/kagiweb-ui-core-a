import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import PrimaryHeader from '../../components/headers/primaryHeader';
import { IAccount } from '../../types/account';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import AccountService from '../account/accountService';
import AccountAccountConfigsReadOnlyView from './accountWorkspaceAccountRefAccountConfigsReadOnlyView';

const AccountWorkspaceAccountRefAccountConfigsPage = () => {
    const { accountId, workspaceId, accountRefId } = useParams()
    const navigate = useNavigate()
    const [account, setAccount] = useState<IAccount | undefined>()
    const [configAndErrors, setConfigAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    useEffect(() => {
        const init = async () => {
            if (accountId) {
                try {
                    const accountResp = await AccountService.getAccount(accountId)
                    setAccount(accountResp.data)
                } catch (err:any) {
                    console.log(err)
                    setConfigAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: [err?.response?.data?.message || '']}
                    })
                }
            }
        }
        console.log('initiate accountConfig features page')
        init()
    }, [accountId])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Account Workspace Account Ref Configs View'} subtitle={ account?.nameId } />
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="text"
                        startIcon={<ArrowBackIosNewIcon />}
                        onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </Grid>

                <AccountAccountConfigsReadOnlyView
                    account={account}
                    workspaceId={workspaceId || ''}
                    accountRefId={accountRefId || ''} />

                <Grid item xs={12}>
                    <ResponseStatus {...configAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default AccountWorkspaceAccountRefAccountConfigsPage