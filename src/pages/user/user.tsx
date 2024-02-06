import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Box, Typography, TextField, Divider, Switch } from '@mui/material';
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
import SettingsIcon from '@mui/icons-material/Settings';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';

import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import UserService from './userService';
import { IUser, IUserUpdate } from '../../types/user';
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

export const CreateUser = () => {
    const navigate = useNavigate()
    const [pageState, setPageState] = useState({
        disableSaveButton: false
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [user, setUser] = useState<IUser>({
        username: '',
        rolesRefs: [],
        userInfos: [],
        passwords: [],
        contactInfos: [],
        clientDevices: [],
        limitedTransactions: [],
        disabled: false,
        verified: false
    })

    const handleTextFieldChange = (field:string, value:string) => {
        setUser({...user, ...{[field]: value}})
    }

    const handleSwitchChange = (field:string, event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, ...{[field]: event.target.checked}})
    }

    const onCreate = async () => {
        const newUser:IUser = user
        console.log('create update: ', newUser)
        setPageState({disableSaveButton: true})

        // send update data to the api
        try {
            const userResp = await UserService.createUser(newUser)
            setUser(userResp.data)
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
                        <VisibilityIcon /> User Creation View
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
                        <Typography variant="subtitle1">Username</Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                        <TextField
                            fullWidth
                            defaultValue={user.username}
                            onChange={(e) => handleTextFieldChange('username', e.target.value)} />
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={4} md={3} sx={itemSx}>
                        <Typography variant="subtitle1">Disabled</Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                        <Switch
                            onChange={e => handleSwitchChange('disabled', e)}
                            defaultChecked={user.disabled} />
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={4} md={3} sx={itemSx}>
                        <Typography variant="subtitle1">Verified</Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                        <Switch
                            onChange={e => handleSwitchChange('verified', e)}
                            defaultChecked={user.verified} />
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

export  const EditUser = () => {
    let { userId } = useParams()
    const navigate = useNavigate()
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [user, setUser] = useState<IUser | undefined>()
    const [updatedUser, setUpdatedUser] = useState<IUser>({
        username: '',
        rolesRefs: [],
        userInfos: [],
        passwords: [],
        contactInfos: [],
        clientDevices: [],
        limitedTransactions: [],
        disabled: false,
        verified: false
    })

    const handleTextFieldChange = (field:string, value:string) => {
        setUpdatedUser({...updatedUser, ...{[field]: value}})
    }

    const handleSwitchChange = (field:string, event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked)
        setUpdatedUser({...updatedUser, ...{[field]: event.target.checked}})
    }

    const onUpdate = async () => {
        if (!user) return

        const updateData:IUserUpdate = {
            _id: updatedUser._id,
            username: updatedUser.username === user.username? undefined: updatedUser.username,
            disabled: updatedUser.disabled === user.disabled? undefined: updatedUser.disabled,
            verified: updatedUser.verified === user.verified? undefined: updatedUser.verified
        }
        console.log('save update: ', updateData)

        // send update data to the api
        try {
            const userResp = await UserService.updateUser(updateData)
            setUser(userResp.data)
            setUpdatedUser(userResp.data)
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
            console.log('Edit: ', userId)

            if (userId) {
                try {
                    const userResp = await UserService.getUser(userId)
                    setUser(userResp.data)
                    setUpdatedUser(userResp.data)
                } catch (err:any) {
                    // error fetching user
                    // log to the UI
                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: [err?.response?.data?.message || '']}
                    })
                }
            }
        }

        init()
    }, [userId])

    const itemSx = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        paddingLeft: '20px'
    }

    const hasChanges = (() => {
        if (!user) return false

        return !(
            user.username !== updatedUser.username ||
            user.disabled !== updatedUser.disabled ||
            user.verified !== updatedUser.verified
        )
    })()

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h5' style={{padding:'10px'}}>
                        <VisibilityIcon /> User Update View
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
                    user? (
                        <>
                            <Grid container item xs={12}>
                                <Grid item xs={4} md={3} sx={itemSx}>
                                    <Typography variant="subtitle1">Username</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                    <TextField
                                        fullWidth
                                        defaultValue={updatedUser.username}
                                        onChange={(e) => handleTextFieldChange('username', e.target.value)} />
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={4} md={3} sx={itemSx}>
                                    <Typography variant="subtitle1">Disabled</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                    <Switch
                                        onChange={e => handleSwitchChange('disabled', e)}
                                        checked={updatedUser.disabled} />
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={4} md={3} sx={itemSx}>
                                    <Typography variant="subtitle1">Verified</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                    <Switch
                                        onChange={e => handleSwitchChange('verified', e)}
                                        checked={updatedUser.verified} />
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
                        disabled={hasChanges || !user}>
                        Update
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

const ViewUser = () => {
    const { userId } = useParams()
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
    const [user, setUser] = useState<IUser | undefined>()

    const onDelete = async () => {
        if (userId) {
            try {
                const userResp = await UserService.deleteUser(userId)
                setUser(userResp.data)
                setPageState({
                    disableEditButton: true,
                    disableDeleteButton: true,
                    deleteDialogOpen: false
                })
                setInfoAndErrors({
                    ...{infoMessages: ['Sucessfully deleted this user']},
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
            console.log('View: ', userId)

            if (userId) {
                try {
                    const userResp = await UserService.getUser(userId)
                    setUser(userResp.data)

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
    }, [userId])

    const data:{field: string, value: string|undefined}[] = [
        { field: 'username', value: user?.username },
        { field: 'disabled', value: user?.disabled? 'True': 'False' },
        { field: 'verified', value: user?.verified? 'True': 'False' }
    ]

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h5' style={{padding:'10px'}}>
                        <VisibilityIcon /> User Readonly View
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
                            onClick={() => navigate(`/users/edit/${ user?._id }`)}>
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
                                    Are you sure you want to delete this user?
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
                    user? (
                        <>
                            <Grid item xs={12}>
                                <PrimaryTable
                                    columnDefs={colDef}
                                    data={data} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography color='primary' variant='h6' style={{padding:'10px'}}>
                                    <SettingsIcon /> User Advance Settings
                                </Typography>
                                {/* <Divider /> */}
                            </Grid>
                            <Grid item xs={12}>
                                <PrimaryTable
                                    columnDefs={colDef}
                                    data={data} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography color='primary' variant='h6' style={{padding:'10px'}}>
                                    <SnippetFolderIcon /> User Sub Modules
                                </Typography>
                                {/* <Divider /> */}
                            </Grid>
                            <Grid item xs={12}>
                                <PrimaryTable
                                    columnDefs={colDef}
                                    data={data} />
                            </Grid>
                        </>
                    ): null
                }

                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default ViewUser