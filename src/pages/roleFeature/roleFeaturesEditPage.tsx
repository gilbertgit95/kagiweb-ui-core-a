import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Box, Divider, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import PrimaryHeader from '../../components/headers/primaryHeader';
import ShortendDescription from '../../components/texts/shortendDescription';
import ListItems from '../../components/lists/listItems';
import { IRole } from '../../types/role';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import { useAppSelector} from '../../stores/appStore';
import RoleService from '../role/roleService';
import RoleFeatureService from './roleFeatureService';
import { IFeature } from '../../types/feature';
import RoleFeaturesAddForm from './roleFeaturesAddForm';

interface IFeatureRow {
    _id: string,
    name: string,
    value: string,
    type: string,
    tags: string[]
}

const colDef:IColDef[] = [
    {
        header: 'Name',
        field: '',
        Component: (props:IFeatureRow) => {
            return <ShortendDescription maxWidth={250} value={props.name} />
        }
    },
    {
        header: 'Value',
        field: '',
        Component: (props:IFeatureRow) => {
            return <ShortendDescription maxWidth={250} value={props.value} />
        }
    },
    {
        header: 'Type',
        field: 'type',
        Component: undefined // react Component or undefined
    },
    {
        header: 'Tags',
        field: '',
        Component: (props:IFeatureRow) => {
            return <ListItems items={props.tags} />
        }
    }
]

const colRoleDef:IColDef[] = [
    {
        header: 'Name',
        field: '',
        Component: (props:IRole) => {
            return <ShortendDescription maxWidth={100} value={props.name} />
        }
    },
    {
        header: 'Description',
        field: '',
        Component: (props:IRole) => {
            return <ShortendDescription maxWidth={150} value={props.description || '--'} />
        }
    },
    {
        header: 'Level',
        field: 'level',
    },
    {
        header: 'No. of features',
        field: 'featureRefs',
        Component: (props:IRole) => {
            return <Typography variant='caption'>{ props.featuresRefs?.length || 0}</Typography>
        }
    }
]

const RoleFeaturesEditPage = () => {
    const { roleId } = useParams()
    const navigate = useNavigate()
    const features:IFeature[] = useAppSelector(state => state.appRefs.features) || []
    const roles:IRole[] = useAppSelector(state => state.appRefs.roles) || []
    const [filteredRoles, setFilteredRoles] = useState<IRole[]>([])
    const [role, setRole] = useState<IRole | undefined>()
    const [data, setData] = useState<IFeatureRow[]>([])
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    // selection
    const [tableSelection, setTableSelection] = useState<string[]>([])
    const [addTableSelection, setAddTableSelection] = useState<string[]>([])
    const [cloneSettings, setCloneSettings] = useState<{overwrite:boolean, fromRoleId:string|undefined}>({
        overwrite: false,
        fromRoleId: undefined
    })
    const [dialog, setDialog] = useState({
        cloneDialogOpen: false,
        addDialogOpen: false,
        removeDialogOpen: false
    })

    const cloneFeatures = async () => {
        // console.log(cloneSettings.fromRoleId, cloneSettings.overwrite)
        if (!roleId) return
        if (!cloneSettings.fromRoleId) return

        try {
            await RoleFeatureService.cloneFeatures(roleId, cloneSettings.fromRoleId, cloneSettings.overwrite)
        } catch (err:any) {
            setInfoAndErrors({
                ...{infoMessages: []},
                ...{errorMessages: [err?.response?.data?.message || '']}
            })
        }

        // close the dialogbox
        setDialog({...dialog, ...{cloneDialogOpen: false}})
        await reLoadRole()
    }

    const addFeatures = async () => {
        // console.log('add this features: ', addTableSelection)
        const totalItems = addTableSelection.length
        let savedItems = 0
        let error:string | undefined
        // call roleFeature service to add new features to the role
        // loop to all features id and post call to api
        for (let featureId of addTableSelection) {
            try {
                await RoleFeatureService.createRoleFeature(roleId || '', featureId)
                savedItems++
            } catch (err:any) {
                error = err?.response?.data?.message || ''
                break
            }
        }

        // prompt
        if (error) {
            setInfoAndErrors({
                ...{infoMessages: []},
                ...{errorMessages: [`Out of ${ totalItems } feature${ totalItems > 1? 's': '' }, ${ savedItems } has been saved.`]}
            })
        } else {
            setInfoAndErrors({
                ...{infoMessages: [`Successfully added ${ totalItems } feature${ totalItems > 1? 's': '' }.`]},
                ...{errorMessages: []}
            })
        }
        // close the dialog box
        setDialog({...dialog, ...{addDialogOpen: false}})
        await reLoadRole()
    }

    const removeFeatures = async () => {
        // console.log('selected items to remove: ', tableSelection)
        const totalItems = tableSelection.length
        let savedItems = 0
        let error:string | undefined
        // call roleFeature service to delete this list of features refs
        // loop to all feature refs, then delete call to api
        for (let featureRef of tableSelection) {
            try {
                await RoleFeatureService.deleteRoleFeature(roleId || '', featureRef)
                savedItems++
            } catch (err:any) {
                error = err?.response?.data?.message || ''
                break
            }
        }

        // prompt
        if (error) {
            setInfoAndErrors({
                ...{infoMessages: []},
                ...{errorMessages: [`Out of ${ totalItems } feature${ totalItems > 1? 's': '' }, ${ savedItems } has been deleted.`]}
            })
        } else {
            setInfoAndErrors({
                ...{infoMessages: [`Successfully deleted ${ totalItems } feature${ totalItems > 1? 's': '' }.`]},
                ...{errorMessages: []}
            })
        }
        // close the dialogbox
        setDialog({...dialog, ...{removeDialogOpen: false}})
        await reLoadRole()
    }

    const reLoadRole = async () => {
        if (roleId) {
            try {
                const roleResp = await RoleService.getRole(roleId)
                setRole(roleResp.data)

                if (roleResp.data && roleResp.data.featuresRefs) {
                    const featuresMap:{[key: string]:IFeature} = features.reduce((acc:{[key:string]:IFeature}, item:IFeature) => {
                        if (item && item._id) acc[item._id] = item
                        return acc
                    }, {})
                    const tarnsformedData:IFeatureRow[] = roleResp.data.featuresRefs.map((item) => {
                        const feature = featuresMap[item.featureId || '']
                        return {
                            _id: item._id || '',
                            name: feature.name || '--',
                            value: feature.value || '--',
                            type: feature.type  || '--',
                            tags: feature.tags || []
                        }
                    })
                    // console.log(tarnsformedData)
                    setData(tarnsformedData)
                }

                if (roleResp.data.absoluteAuthority) {
                    setInfoAndErrors({
                        ...{infoMessages: ['This role features is not mutable because the role has absolute authority. This means it has access to all features.']},
                        ...{errorMessages: []}
                    })
                }

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

            if (roleId) {
                // set filtered roles
                setFilteredRoles(
                    roles
                        .filter(item => !item.absoluteAuthority)
                        .filter(item => item._id != roleId)
                )

                try {
                    const roleResp = await RoleService.getRole(roleId)
                    setRole(roleResp.data)

                    if (roleResp.data && roleResp.data.featuresRefs) {
                        const featuresMap:{[key: string]:IFeature} = features.reduce((acc:{[key:string]:IFeature}, item:IFeature) => {
                            if (item && item._id) acc[item._id] = item
                            return acc
                        }, {})
                        const tarnsformedData:IFeatureRow[] = roleResp.data.featuresRefs.map((item) => {
                            const feature = featuresMap[item.featureId || '']
                            return {
                                _id: item._id || '',
                                name: feature.name || '--',
                                value: feature.value || '--',
                                type: feature.type  || '--',
                                tags: feature.tags || []
                            }
                        })
                        // console.log(tarnsformedData)
                        setData(tarnsformedData)
                    }

                    if (roleResp.data.absoluteAuthority) {
                        setInfoAndErrors({
                            ...{infoMessages: ['This role features is not mutable because the role has absolute authority. This means it has access to all features.']},
                            ...{errorMessages: []}
                        })
                    }

                } catch (err:any) {
                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: [err?.response?.data?.message || '']}
                    })
                }
            }
        }
        console.log('initiate role features edit page')
        init()
    }, [roleId, roles, features])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Role Features Update'} subtitle={ role?.name } />
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
                            disabled={role?.absoluteAuthority}
                            startIcon={<FileCopyIcon />}
                            onClick={() => {
                                setDialog({...dialog, ...{cloneDialogOpen: true}})
                                setCloneSettings({overwrite: false, fromRoleId: undefined})
                            }}>
                            clone
                        </Button>
                        <Button
                            variant="text"
                            disabled={role?.absoluteAuthority}
                            startIcon={<AddIcon />}
                            onClick={() => {
                                setDialog({...dialog, ...{addDialogOpen: true}})
                                setAddTableSelection([])
                            }}>
                            add
                        </Button>
                        <Button
                            color="secondary"
                            variant="text"
                            disabled={!Boolean(tableSelection.length) || role?.absoluteAuthority}
                            startIcon={<DeleteIcon />}
                            onClick={() => {
                                setDialog({...dialog, ...{removeDialogOpen: true}})
                            }}>
                            remove
                        </Button>
                        <Dialog
                            open={dialog.cloneDialogOpen}
                            onClose={() => setDialog({...dialog, ...{cloneDialogOpen: false}})}>
                            <DialogTitle>
                                Clone features from other role
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText sx={{marginBottom: '10px'}}>
                                    Please check if you want to overwrite the content with the cloned features, then select a role to clone from.
                                </DialogContentText>
                                <Divider />
                                <FormControlLabel
                                    sx={{ marginTop: '20px', marginBottom: '20px' }}
                                    control={
                                        <Checkbox
                                            color="secondary"
                                            checked={cloneSettings.overwrite}
                                            onChange={(event) => {
                                                setCloneSettings({...cloneSettings, ...{overwrite: event.target.checked}})
                                            }}
                                            inputProps={{ 'aria-label': 'controlled' }} />
                                    }
                                    label="Overwrite" />
                                <PrimaryTable
                                    enableSelection
                                    onSelect={(selectedData) => {
                                        setCloneSettings({
                                            ...cloneSettings,
                                            ...{fromRoleId: selectedData.length? selectedData[0]: undefined}
                                        })
                                    }}
                                    columnDefs={colRoleDef}
                                    data={ filteredRoles } />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setDialog({...dialog, ...{cloneDialogOpen: false}})}>
                                    cancel
                                </Button>
                                <Button onClick={cloneFeatures} autoFocus>
                                    confirm
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog
                            open={dialog.addDialogOpen}
                            onClose={() => setDialog({...dialog, ...{addDialogOpen: false}})}>
                            <DialogTitle>
                                Add features to { role?.name } Role
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Please Select features to add
                                </DialogContentText>
                                <RoleFeaturesAddForm
                                    onSelect={(selectedData) => setAddTableSelection(selectedData)}
                                    role={role} />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setDialog({...dialog, ...{addDialogOpen: false}})}>
                                    cancel
                                </Button>
                                <Button onClick={addFeatures} autoFocus>
                                    confirm
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog
                            open={dialog.removeDialogOpen}
                            onClose={() => setDialog({...dialog, ...{removeDialogOpen: false}})}>
                            <DialogTitle>
                                Warning
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to remove the selected feature/s from { role?.name } Role?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setDialog({...dialog, ...{removeDialogOpen: false}})}>
                                    no
                                </Button>
                                <Button color="secondary" onClick={removeFeatures} autoFocus>
                                    yes
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </Grid>
                {
                    role?.absoluteAuthority? null:(
                        <Grid item xs={12}>
                            <PrimaryTable
                                enableSelection
                                enableMultipleSelection
                                onSelect={(selectedData) => setTableSelection(selectedData)}
                                columnDefs={colDef}
                                data={data} />
                        </Grid>
                    )
                }
                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default RoleFeaturesEditPage