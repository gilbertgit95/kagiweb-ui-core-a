import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Divider } from '@mui/material';

import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PrimaryHeader from '../../components/headers/primaryHeader';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import OwnerService from './ownerService';
import { IAccount } from '../../types/account';
import UserRolesEditForm from '../accountRole/userRolesEditForm';
import AppUtils from '../../utils/appUtils';

const OwnerRolesEditPage = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState<IAccount | undefined>()
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    const reLoadUser = async () => {
        try {
            // reload signedin user state
            await AppUtils.loadSigninUserData()

            // reload local owner state in this page
            const userResp = await OwnerService.getOwner()
            setUser(userResp.data)
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
                const userResp = await OwnerService.getOwner()
                setUser(userResp.data)

            } catch (err:any) {
                setInfoAndErrors({
                    ...{infoMessages: []},
                    ...{errorMessages: [err?.response?.data?.message || '']}
                })
            }
        }
        console.log('initiate user roles edit page')
        init()
    }, [])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'My Account Roles Update View'} subtitle={ user?.username } />
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
                <UserRolesEditForm
                    user={user}
                    activateFunc={OwnerService.activateAccountRole}
                    createFunc={OwnerService.createAccountRole}
                    deleteFunc={OwnerService.deleteAccountRole}
                    onChange={reLoadUser} />
                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default OwnerRolesEditPage