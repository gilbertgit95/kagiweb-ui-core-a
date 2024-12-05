import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Divider } from '@mui/material';

import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import PrimaryHeader from '../../components/headers/primaryHeader';
import AccountLimitedTransactionEditForm from '../accountLimitedTransaction/accountLimitedTransactionEditForm';
import OwnerService from './ownerService';
import { IAccount } from '../../types/account';
import {
  useParams
} from 'react-router-dom';

const OwnerLimitedTransactionEditPage = () => {
    const { limitedTransactionId } = useParams()
    const navigate = useNavigate()
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [account, setAccount] = useState<IAccount | undefined>()

    const onUpdated = async () => {
        try {
            const accountResp = await OwnerService.getOwner()
            setAccount(accountResp.data)

        } catch (err:any) {
            setInfoAndErrors({
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
                setInfoAndErrors({
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
                    <PrimaryHeader title={'Owner Limited Transactions Update View'} subtitle={ account?.nameId } />
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

                <AccountLimitedTransactionEditForm
                    account={account}
                    limitedTransactionId={limitedTransactionId}
                    updateFunc={OwnerService.updateLT}
                    updated={onUpdated} />

                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default OwnerLimitedTransactionEditPage