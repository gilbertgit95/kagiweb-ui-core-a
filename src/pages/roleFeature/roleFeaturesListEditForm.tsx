import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Divider, Typography } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import TableViewIcon from '@mui/icons-material/TableView';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';

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

import ShortendDescription from '../../components/texts/shortendDescription';
import ListItems from '../../components/lists/listItems';
import { IRole } from '../../types/role';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import FilterableTable from '../../components/tables/filterableTable';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import { useAppSelector} from '../../stores/appStore';
import RoleFeatureService from './roleFeatureService';
import { IFeature } from '../../types/feature';
import RoleFeaturesListAddForm from './roleFeaturesListAddForm';

interface IProps {
    role?: IRole
    onChange?: () => void,
    view?: string,
    onChangeView?: (view:string) => void
}

interface IFeatureRow {
    _id: string,
    name: string,
    scope: string,
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

const RoleFeaturesListEditForm = ({role, onChange, view, onChangeView}:IProps) => {
    const navigate = useNavigate()
    const features:IFeature[] = useAppSelector(state => state.appRefs.features) || []
    const roles:IRole[] = useAppSelector(state => state.appRefs.roles) || []
    const [filteredRoles, setFilteredRoles] = useState<IRole[]>([])
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

    const filterConfig = useMemo(() => ({
        searchValue: '',
        searchField: 'name',
        filterValue: '',
        filterField: 'type',
        filterOptions: [],
        sortValue: undefined,
        sortField: 'name',
        fieldOptions: ['name', 'value', 'type']
    }), [])

    const onClickView = (vType:string) => {
        if (onChangeView) onChangeView(vType)
    }

    const cloneFeatures = async () => {
        // console.log(cloneSettings.fromRoleId, cloneSettings.overwrite)
        if (!role) return
        if (!cloneSettings.fromRoleId) return

        try {
            await RoleFeatureService.cloneFeatures(role._id || '', cloneSettings.fromRoleId, cloneSettings.overwrite)
        } catch (err:any) {
            setInfoAndErrors({
                ...{infoMessages: []},
                ...{errorMessages: [err?.response?.data?.message || '']}
            })
        }

        // close the dialogbox
        setDialog({...dialog, ...{cloneDialogOpen: false}})
        if (onChange) onChange()
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
                await RoleFeatureService.createRoleFeature(role?._id || '', featureId)
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
        if (onChange) onChange()
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
                await RoleFeatureService.deleteRoleFeature(role?._id || '', featureRef)
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
        if (onChange) onChange()
    }

    useEffect(() => {
        const init = async () => {

            if (role && features.length) {
                // set filtered roles
                setFilteredRoles(
                    roles
                        .filter(item => !item.absoluteAuthority)
                        .filter(item => item._id !== role._id)
                        .filter(item => item.scope === role.scope)
                )

                try {

                    if (role.featuresRefs) {
                        const featuresMap:{[key: string]:IFeature} = features.reduce((acc:{[key:string]:IFeature}, item:IFeature) => {
                            if (item && item._id) acc[item._id] = item
                            return acc
                        }, {})
                        const tarnsformedData:IFeatureRow[] = role.featuresRefs.map((item) => {
                            const feature = featuresMap[item.featureId || '']
                            return {
                                _id: item._id || '',
                                name: feature?.name || '--',
                                scope: feature?.scope || '--',
                                value: feature?.value || '--',
                                type: feature?.type  || '--',
                                tags: feature?.tags || []
                            }
                        })
                        // console.log(tarnsformedData)
                        setData(tarnsformedData)
                    }

                    if (role.absoluteAuthority) {
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
    }, [role, roles, features])

    return (
        <>
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
                    <Stack
                        sx={{marginRight: '10px'}}
                        direction="row"
                        alignItems="center"
                        spacing={1}>
                        <ButtonGroup>
                            <Button
                                size="small"
                                onClick={() => {
                                    onClickView('list')
                                }}
                                variant={view === 'list'? 'contained': 'outlined'}>
                                <ListIcon />
                            </Button>
                            <Button
                                size="small"
                                onClick={() => {
                                    onClickView('grouped')
                                }}
                                variant={view === 'grouped'? 'contained': 'outlined'}>
                                <TableViewIcon />
                            </Button>
                        </ButtonGroup>
                        {/* <Typography
                            component="span"
                            variant="subtitle1"
                            color="primary">
                            Group View
                        </Typography> */}
                    </Stack>
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
                        maxWidth="xl"
                        open={dialog.addDialogOpen}
                        onClose={() => setDialog({...dialog, ...{addDialogOpen: false}})}>
                        <DialogTitle>
                            Add features to { role?.name } Role
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please Select features to add
                            </DialogContentText>
                            <RoleFeaturesListAddForm
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
                        {/* <PrimaryTable
                            maxHeight={700}
                            enableSelection
                            enableMultipleSelection
                            onSelect={(selectedData) => setTableSelection(selectedData)}
                            columnDefs={colDef}
                            data={data} /> */}
                        <FilterableTable
                            filterConfig={filterConfig}
                            tableConfig={{
                                // maxHeight: 700,
                                enableSelection: true,
                                enableMultipleSelection: true,
                                onSelect: (selectedData) => setTableSelection(selectedData),
                                columnDefs: colDef,
                                data: data
                            }} />
                    </Grid>
                )
            }
            <Grid item xs={12}>
                <ResponseStatus {...infoAndErrors} />
            </Grid>
        </>
    )
}

export default RoleFeaturesListEditForm