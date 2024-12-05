import React from 'react';
import { Container, Grid, Divider, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useAppDispatch, useAppSelector} from '../../stores/appStore';
import { setAccountData } from '../../stores/signedInAccountSlice';
import { useNavigate } from 'react-router-dom';
import PrimaryHeader from '../../components/headers/primaryHeader';
import AccountEditForm from '../account/accountEditForm';
import OwnerService from './ownerService';
import { IAccount } from '../../types/account';

const OwnerEditPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const accountData = useAppSelector(state => state.signedInAccount.accountData)

    const onUpdated = async (account: IAccount|undefined) => {
        if (account) {
            dispatch(setAccountData({accountData: account}))
        }
    }

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Edit Owner'} />
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
                <AccountEditForm
                    accountId={accountData?._id}
                    getFunc={OwnerService.getOwner}
                    updateFunc={OwnerService.updateOwner}
                    updated={onUpdated} />
            </Grid>
        </Container>
    )
}

export default OwnerEditPage