import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Divider } from '@mui/material';

import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import PrimaryHeader from '../../components/headers/primaryHeader';
import UserWorkspaceUserRefCreateForm from '../userWorkspaceUserRef/userWorkspaceUserRefCreateForm';
// import UserService from '../user/userService';
// import UserWorkspaceUserRefService from './userWorkspaceUserRefService';
import OwnerService from './ownerService';
import { IUser } from '../../types/user';
import {
  useParams
} from 'react-router-dom';

const OwnerWorkspaceUserRefCreatePage = () => {
    const { workspaceId } = useParams()
    const navigate = useNavigate()
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [user, setUser] = useState<IUser | undefined>()

    const onCreated = async () => {
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

        init()
    }, [])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Owner Workspace User Reference Create View'} subtitle={ user?.username } />
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

                <UserWorkspaceUserRefCreateForm
                    user={user}
                    workspaceId={workspaceId}
                    createFunc={OwnerService.createWorkspaceUserRef}
                    created={onCreated} />

                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default OwnerWorkspaceUserRefCreatePage