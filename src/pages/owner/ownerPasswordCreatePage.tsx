import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import PrimaryHeader from '../../components/headers/primaryHeader';
import { IAccount } from '../../types/account';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import AccountPasswordCreateForm from '../accountPassword/accountPasswordCreateForm';
import OwnerService from './ownerService';

const OwnerPasswordCreatePage = () => {
    const navigate = useNavigate()
    const [account, setAccount] = useState<IAccount | undefined>()
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

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
                console.log(err)
                setInfoAndErrors({
                    ...{infoMessages: []},
                    ...{errorMessages: [err?.response?.data?.message || '']}
                })
            }
        }
        console.log('initiate owner password create page')
        init()
    }, [])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Owner Password Create View'} subtitle={ account?.nameId } />
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

                <AccountPasswordCreateForm
                    account={account}
                    createFunc={OwnerService.createPassword}
                    created={onCreated} />

                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default OwnerPasswordCreatePage