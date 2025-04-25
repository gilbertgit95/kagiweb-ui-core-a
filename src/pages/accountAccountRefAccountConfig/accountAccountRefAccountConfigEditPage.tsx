import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Divider } from '@mui/material';

import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import PrimaryHeader from '../../components/headers/primaryHeader';
import AccountContactConfigEditForm from './accountAccountRefAccountConfigEditForm';
import AccountService from '../account/accountService';
import AccountAccountConfigService from './accountAccountRefAccountConfigService';
import { IAccount } from '../../types/account';
import {
  useParams
} from 'react-router-dom';

const AccountAccountRefAccountConfigEditPage = () => {
    const { accountId, accountRefId, accountConfigId } = useParams()
    const navigate = useNavigate()
    const [configAndErrors, setConfigAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [account, setAccount] = useState<IAccount | undefined>()

    const onUpdated = async () => {
        if (accountId) {
            try {
                const accountResp = await AccountService.getAccount(accountId)
                setAccount(accountResp.data)

            } catch (err:any) {
                setConfigAndErrors({
                    ...{infoMessages: []},
                    ...{errorMessages: [err?.response?.data?.message || '']}
                })
            }
        }
    }
    
    useEffect(() => {
        const init = async () => {
            console.log('View: ', accountId)

            if (accountId) {
                try {
                    const accountResp = await AccountService.getAccount(accountId)
                    setAccount(accountResp.data)

                } catch (err:any) {
                    setConfigAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: [err?.response?.data?.message || '']}
                    })
                }
            }
        }

        init()
    }, [accountId])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Account Account Ref Config Update View'} subtitle={ account?.nameId } />
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

                <AccountContactConfigEditForm
                    account={account}
                    accountRefId={accountRefId || ''}
                    accountConfigId={accountConfigId}
                    getCompleteInfo={AccountService.getAccountCompleteInfo}
                    updateFunc={AccountAccountConfigService.updateAccountAccountRefAccountConfig}
                    updated={onUpdated} />

                <Grid item xs={12}>
                    <ResponseStatus {...configAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default AccountAccountRefAccountConfigEditPage