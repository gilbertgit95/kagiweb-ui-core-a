import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Divider } from '@mui/material';

import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import PrimaryHeader from '../../components/headers/primaryHeader';
import AccountAccountRefCreateForm from '../accountAccountRef/accountAccountRefCreateForm';
import OwnerService from './ownerService';
import { IAccount } from '../../types/account';

const OwnerWorkspaceAccountRefCreatePage = () => {
    const navigate = useNavigate()
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [account, setAccount] = useState<IAccount | undefined>()

    const onCreated = async () => {
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
                    <PrimaryHeader title={'Owner Account Reference Create View'} subtitle={ account?.nameId } />
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

                <AccountAccountRefCreateForm
                    account={account}
                    createFunc={OwnerService.createAccountRef}
                    created={onCreated} />

                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default OwnerWorkspaceAccountRefCreatePage