import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Box, Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import PrimaryHeader from '../../components/headers/primaryHeader';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import RoleService from './roleService';
import { IRole } from '../../types/role';
import { useParams} from 'react-router-dom';
import RoleReadOnlyView from './roleReadOnlyView';
import AppUtils from '../../utils/appUtils';

const RolePage = () => {
    const { roleId } = useParams()
    const navigate = useNavigate()
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [pageState, setPageState] = useState({
        disableEditButton: false,
        disableDeleteButton: false,
        deleteDialogOpen: false
    })
    const [role, setRole] = useState<IRole | undefined>()

    const onDelete = async () => {
        if (roleId) {
            try {
                const roleResp = await RoleService.deleteRole(roleId)
                setRole(roleResp.data)
                setPageState({
                    disableEditButton: true,
                    disableDeleteButton: true,
                    deleteDialogOpen: false
                })

                // re load app refs
                await AppUtils.loadAppRefsData()

                setInfoAndErrors({
                    ...{infoMessages: ['Sucessfully deleted this role']},
                    ...{errorMessages: []}
                })
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
            console.log('View: ', roleId)

            if (roleId) {
                try {
                    const roleResp = await RoleService.getRole(roleId)
                    setRole(roleResp.data)

                } catch (err:any) {
                    setPageState({
                        disableEditButton: true,
                        disableDeleteButton: true,
                        deleteDialogOpen: false
                    })

                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: [err?.response?.data?.message || '']}
                    })
                }
            }
        }

        init()
    }, [roleId])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Role Readonly View'} />
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
                <Grid item xs={6} style={{alignContent: 'right'}}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}>
                        <Button
                            variant="text"
                            startIcon={<EditIcon />}
                            disabled={ pageState.disableEditButton }
                            onClick={() => navigate(`/roles/edit/${ role?._id }`)}>
                            Edit
                        </Button>
                        <Button
                            variant="text"
                            startIcon={<DeleteIcon />}
                            color="secondary"
                            disabled={ pageState.disableDeleteButton }
                            onClick={ () => setPageState({...pageState, ...{deleteDialogOpen: true}}) }>
                            Delete
                        </Button>
                        <Dialog
                            open={pageState.deleteDialogOpen}
                            onClose={() => setPageState({...pageState, ...{deleteDialogOpen: false}})}>
                            <DialogTitle>
                                Warning
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to delete this role?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setPageState({...pageState, ...{deleteDialogOpen: false}})}>
                                    no
                                </Button>
                                <Button onClick={onDelete} autoFocus>
                                    yes
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </Grid>

                <RoleReadOnlyView role={role} />

                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default RolePage