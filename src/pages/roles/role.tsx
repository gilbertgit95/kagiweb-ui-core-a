import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Box, Typography, TextField, Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import VisibilityIcon from '@mui/icons-material/Visibility';

import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import RoleService from './roleService';
import { IRole } from '../../types/role';
import {
  useParams
} from 'react-router-dom';

const colDef:IColDef[] = [
    {
        header: 'Field',
        field: 'field',
        Component: undefined // react Component or undefined
    },
    {
        header: 'Value',
        field: 'value',
        Component: undefined // react Component or undefined
    }
]

export const CreateRole = () => {
    const navigate = useNavigate()
    const [pageState, setPageState] = useState({
        disableSaveButton: false
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [role, setRole] = useState<IRole>({
        name: '',
        description: '',
        level: 0,
        reqLimitPerSec: 120
    })

    const handleTextFieldChange = (field:string, value:string) => {
        setRole({...role, ...{[field]: value}})
    }

    const onCreate = async () => {
        const newRole:IRole = {
            ...role,
            ...{
                name: role.name,
                description: role.description,
                level: role.level,
                reqLimitPerSec: role.reqLimitPerSec
            }
        }
        console.log('create update: ', newRole)
        setPageState({disableSaveButton: true})

        // send update data to the api
        try {
            const roleResp = await RoleService.createRole(newRole)
            setRole(roleResp.data)
            setInfoAndErrors({
                ...{infoMessages: ['Successfull Creation']},
                ...{errorMessages: []}
            })
        } catch (err:any) {
            // error while updating
            // log to the UI
            setInfoAndErrors({
                ...infoAndErrors,
                ...{errorMessages: [err?.response?.data?.message || '']}
            })
            setPageState({disableSaveButton: false})
        }
    }

    const itemSx = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        paddingLeft: '20px'
    }

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h5' style={{padding:'10px'}}>
                        <VisibilityIcon /> Role Creation View
                    </Typography>
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
                <Grid container item xs={12}>
                    <Grid item xs={4} md={3} sx={itemSx}>
                        <Typography variant="subtitle1">Name</Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                        <TextField
                            fullWidth
                            defaultValue={role.name}
                            onChange={(e) => handleTextFieldChange('name', e.target.value)} />
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={4} md={3} sx={itemSx}>
                        <Typography variant="subtitle1">Description</Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                        <TextField
                            fullWidth
                            multiline
                            maxRows={4}
                            defaultValue={role.description}
                            onChange={(e) => handleTextFieldChange('description', e.target.value)}/>
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={4} md={3} sx={itemSx}>
                        <Typography variant="subtitle1">Level</Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                        <TextField
                            fullWidth
                            defaultValue={role.level}
                            onChange={(e) => handleTextFieldChange('level', e.target.value)} />
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={4} md={3} sx={itemSx}>
                        <Typography variant="subtitle1">Request Rate Limit</Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                        <TextField
                            fullWidth
                            defaultValue={role.reqLimitPerSec}
                            onChange={(e) => handleTextFieldChange('reqLimitPerSec', e.target.value)} />
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={4} md={3} sx={itemSx}>
                        {/* <Typography variant="subtitle1">Tags</Typography> */}
                    </Grid>
                    <Grid item xs={8} md={9}>
                        <ResponseStatus {...infoAndErrors} />
                    </Grid>
                </Grid>
                <Grid container item xs={12} sx={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                    <Button
                        startIcon={<AdminPanelSettingsIcon />}
                        onClick={onCreate}
                        disabled={pageState.disableSaveButton}>
                        Create
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export  const EditRole = () => {
    let { roleId } = useParams()
    const navigate = useNavigate()
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [role, setRole] = useState<IRole | undefined>()
    const [updatedRole, setUpdatedRole] = useState<IRole>({
        name: '',
        description: '',
        level: 0,
        reqLimitPerSec: 120
    })

    const handleTextFieldChange = (field:string, value:string) => {
        setUpdatedRole({...updatedRole, ...{[field]: value}})
    }

    const onUpdate = async () => {
        const updateData:IRole = {
            ...role,
            ...{
                name: updatedRole.name,
                description: updatedRole.description,
                level: updatedRole.level,
                reqLimitPerSec: updatedRole.reqLimitPerSec
            }
        }
        console.log('save update: ', updateData)

        // send update data to the api
        try {
            const roleResp = await RoleService.updateRole(updateData)
            setRole(roleResp.data)
            setUpdatedRole(roleResp.data)
            setInfoAndErrors({
                ...{infoMessages: ['Successfull Update']},
                ...{errorMessages: []}
            })
        } catch (err:any) {
            // error while updating
            // log to the UI
            setInfoAndErrors({
                ...infoAndErrors,
                ...{errorMessages: [err?.response?.data?.message || '']}
            })
        }
    }
    
    useEffect(() => {
        const init = async () => {
            console.log('Edit: ', roleId)

            if (roleId) {
                try {
                    const roleResp = await RoleService.getRole(roleId)
                    setRole(roleResp.data)
                    setUpdatedRole(roleResp.data)
                } catch (err:any) {
                    // error fetching role
                    // log to the UI
                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: [err?.response?.data?.message || '']}
                    })
                }
            }
        }

        init()
    }, [roleId])

    const itemSx = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        paddingLeft: '20px'
    }

    const hasChanges = (() => {
        if (!role) return false

        return !(
            role.name !== updatedRole.name ||
            role.description !== updatedRole.description ||
            role.level !== updatedRole.level ||
            role.reqLimitPerSec !== updatedRole.reqLimitPerSec
        )
    })()

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h5' style={{padding:'10px'}}>
                        <VisibilityIcon /> Role Update View
                    </Typography>
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
                {
                    role? (
                        <>
                            <Grid container item xs={12}>
                                <Grid item xs={4} md={3} sx={itemSx}>
                                    <Typography variant="subtitle1">Name</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                    <TextField
                                        fullWidth
                                        defaultValue={updatedRole.name}
                                        onChange={(e) => handleTextFieldChange('name', e.target.value)} />
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={4} md={3} sx={itemSx}>
                                    <Typography variant="subtitle1">Description</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        maxRows={4}
                                        defaultValue={updatedRole.description}
                                        onChange={(e) => handleTextFieldChange('description', e.target.value)}/>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={4} md={3} sx={itemSx}>
                                    <Typography variant="subtitle1">Level</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                    <TextField
                                        fullWidth
                                        defaultValue={updatedRole.level}
                                        onChange={(e) => handleTextFieldChange('level', e.target.value)} />
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={4} md={3} sx={itemSx}>
                                    <Typography variant="subtitle1">Request Rate Limit</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                    <TextField
                                        fullWidth
                                        defaultValue={updatedRole.reqLimitPerSec}
                                        onChange={(e) => handleTextFieldChange('reqLimitPerSec', e.target.value)} />
                                </Grid>
                            </Grid>
                        </>
                    ):null
                }
                <Grid container item xs={12}>
                    <Grid item xs={4} md={3} sx={itemSx}>
                        {/* <Typography variant="subtitle1">Tags</Typography> */}
                    </Grid>
                    <Grid item xs={8} md={9}>
                        <ResponseStatus {...infoAndErrors} />
                    </Grid>
                </Grid>
                <Grid container item xs={12} sx={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                    <Button
                        startIcon={<EditIcon />}
                        onClick={onUpdate}
                        disabled={hasChanges || !role}>
                        Update
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

const ViewRole = () => {
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

    const data:{field: string, value: string|undefined}[] = [
        { field: 'name', value: role?.name },
        { field: 'description', value: role?.description },
        { field: 'level', value: String(role?.level) },
        { field: 'reqLimitPerSec', value: String(role?.reqLimitPerSec) }
    ]

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h5' style={{padding:'10px'}}>
                        <VisibilityIcon /> Role Readonly View
                    </Typography>
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

                {
                    role? (
                        <Grid item xs={12}>
                            <PrimaryTable
                                columnDefs={colDef}
                                data={data} />
                        </Grid>
                    ): null
                }

                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default ViewRole