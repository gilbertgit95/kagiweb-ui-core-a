import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Box, Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import PrimaryHeader from '../../components/headers/primaryHeader';
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
    tags: string
}

const RoleFeaturesEditPage = () => {
    const { roleId } = useParams()
    const navigate = useNavigate()
    // const roles = useAppSelector(state => state.appRefs.roles)
    const features:IFeature[] = useAppSelector(state => state.appRefs.features) || []
    const [role, setRole] = useState<IRole | undefined>()
    const [data, setData] = useState<IFeatureRow[]>([])
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    // selection
    const [tableSelection, setTableSelection] = useState<string[]>([])
    const [addTableSelection, setAddTableSelection] = useState<string[]>([])
    const [dialog, setDialog] = useState({
        addDialogOpen: false,
        removeDialogOpen: false
    })

    const addFeatures = async () => {
        console.log('add this features: ', addTableSelection)
    }

    const removeFeatures = async () => {
        console.log('selected items to remove: ', tableSelection)
    }

    useEffect(() => {
        const init = async () => {
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
                                tags: feature.tags?.join(', ')  || '--'
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
    }, [roleId, features])

    const colDef:IColDef[] = [
        {
            header: 'Name',
            field: 'name',
            Component: undefined // react Component or undefined
        },
        {
            header: 'Value',
            field: 'value',
            Component: undefined // react Component or undefined
        },
        {
            header: 'Type',
            field: 'type',
            Component: undefined // react Component or undefined
        },
        {
            header: 'Tags',
            field: 'tags',
            Component: undefined // react Component or undefined
        }
    ]

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
                            startIcon={<AddIcon />}
                            onClick={() => setDialog({...dialog, ...{addDialogOpen: true}})}>
                            add
                        </Button>
                        <Button
                            color="secondary"
                            variant="text"
                            disabled={!Boolean(tableSelection.length) || role?.absoluteAuthority}
                            startIcon={<DeleteIcon />}
                            onClick={() => setDialog({...dialog, ...{removeDialogOpen: true}})}>
                            remove
                        </Button>
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