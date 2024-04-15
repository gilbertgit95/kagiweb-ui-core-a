import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Divider } from '@mui/material';

import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import PrimaryHeader from '../../components/headers/primaryHeader';
import UserWorkspaceUserRefEditForm from './userWorkspaceUserRefEditForm';
import UserService from '../user/userService';
import UserWorkspaceUserRefService from './userWorkspaceUserRefService';
import { IUser } from '../../types/user';
import {
  useParams
} from 'react-router-dom';

const UserWorkspaceUserRefEditPage = () => {
    const { userId, workspaceId, userRefId } = useParams()
    const navigate = useNavigate()
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [user, setUser] = useState<IUser | undefined>()

    const onUpdated = async () => {
        if (userId) {
            try {
                const userResp = await UserService.getUser(userId)
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
            console.log('View: ', userId)

            if (userId) {
                try {
                    const userResp = await UserService.getUser(userId)
                    setUser(userResp.data)

                } catch (err:any) {
                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: [err?.response?.data?.message || '']}
                    })
                }
            }
        }

        init()
    }, [userId])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'User Workspace User Reference Update View'} subtitle={ user?.username } />
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

                <UserWorkspaceUserRefEditForm
                    user={user}
                    workspaceId={workspaceId}
                    userRefId={userRefId}
                    getFunc={UserWorkspaceUserRefService.getWorkspaceUserRef}
                    updateFunc={UserWorkspaceUserRefService.updateWorkspaceUserRef}
                    updated={onUpdated} />

                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default UserWorkspaceUserRefEditPage