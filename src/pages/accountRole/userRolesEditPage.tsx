import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Divider } from '@mui/material';

import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PrimaryHeader from '../../components/headers/primaryHeader';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import AccountService from '../account/accountService';
import UserRoleService from './userRoleService';
import { IAccount } from '../../types/account';
import UserRolesEditForm from './userRolesEditForm';

const UserRolesEditPage = () => {
    const { accountId } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState<IAccount | undefined>()
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    const reLoadUser = async () => {
        if (accountId) {
            try {
                const userResp = await AccountService.getAccount(accountId)
                setUser(userResp.data)
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
                    const userResp = await AccountService.getAccount(accountId)
                    setUser(userResp.data)

                } catch (err:any) {
                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: [err?.response?.data?.message || '']}
                    })
                }
            }
        }
        console.log('initiate user roles edit page')
        init()
    }, [accountId])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'User Roles Update View'} subtitle={ user?.username } />
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
                <UserRolesEditForm
                    user={user}
                    activateFunc={UserRoleService.activateAccountRole}
                    createFunc={UserRoleService.createAccountRole}
                    deleteFunc={UserRoleService.deleteAccountRole}
                    onChange={reLoadUser} />
                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default UserRolesEditPage