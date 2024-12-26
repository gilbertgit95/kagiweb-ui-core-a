import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Divider } from '@mui/material';

import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import PrimaryHeader from '../../components/headers/primaryHeader';
import AccountAccountConfigEditForm from '../accountAccountRefAccountConfig/accountAccountRefAccountConfigEditForm';
import OwnerService from './ownerService';
import AppUtils from '../../utils/appUtils';
import { IAccount } from '../../types/account';
import {
  useParams
} from 'react-router-dom';

const OwnerAccountConfigEditPage = () => {
    const { accountRefId, accountConfigId } = useParams()
    const navigate = useNavigate()
    const [infoAndErrors, setConfigAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [account, setAccount] = useState<IAccount | undefined>()

    const onUpdated = async () => {
        try {
            const accountResp = await OwnerService.getOwner()
            setAccount(accountResp.data)
            await AppUtils.loadSigninAccountData()
        } catch (err:any) {
            setConfigAndErrors({
                ...{infoMessages: []},
                ...{errorMessages: [err?.response?.data?.message || '']}
            })
        }
    }
    
    useEffect(() => {
        const init = async () => {

            try {
                const accountResp = await OwnerService.getOwner()
                setAccount(accountResp.data)

            } catch (err:any) {
                setConfigAndErrors({
                    ...{infoMessages: []},
                    ...{errorMessages: [err?.response?.data?.message || '']}
                })
            }
        }

        init()
    }, [])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Owner Account Ref Config Update View'} subtitle={ account?.nameId } />
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

                <AccountAccountConfigEditForm
                    account={account}
                    accountRefId={accountRefId || ''}
                    accountConfigId={accountConfigId}
                    getCompleteInfo={OwnerService.reqOwnerCompleteInfo}
                    updateFunc={OwnerService.updateAccountRefConfig}
                    updated={onUpdated} />

                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default OwnerAccountConfigEditPage