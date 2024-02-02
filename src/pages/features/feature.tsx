import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Box, Typography, TextField, Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import VisibilityIcon from '@mui/icons-material/Visibility';

import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import FeatureService from './featureService';
import { IFeature, TFeatureType, featureTypes } from '../../types/feature';
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

export const CreateFeature = () => {
    const navigate = useNavigate()
    const [pageState, setPageState] = useState({
        disableSaveButton: false
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [feature, setFeature] = useState<IFeature & {stringTags: String}>({
        name: '',
        value: '',
        description: '',
        type: featureTypes[0],
        tags: [],
        stringTags: '',
    })

    const handleTypeSelectionChange = (event: SelectChangeEvent) => {
        const type = event.target.value as TFeatureType
        setFeature({...feature, ...{type}})
    }

    const handleTextFieldChange = (field:string, value:string) => {
        setFeature({...feature, ...{[field]: value}})
    }

    const onCreate = async () => {
        const newFeature:IFeature = {
            ...feature,
            ...{
                name: feature.name,
                description: feature.description,
                value: feature.value,
                type: feature.type,
                tags: feature.stringTags.split(', ')
            }
        }
        console.log('create update: ', newFeature)
        setPageState({disableSaveButton: true})

        // send update data to the api
        try {
            const featureResp = await FeatureService.createFeature(newFeature)
            setFeature({
                ...featureResp.data,
                ...{ stringTags: featureResp.data.tags? featureResp.data.tags.join(', '): '' }
            })
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
                        <VisibilityIcon /> Feature Creation View
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
                            defaultValue={feature.name}
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
                            defaultValue={feature.description}
                            onChange={(e) => handleTextFieldChange('description', e.target.value)}/>
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={4} md={3} sx={itemSx}>
                        <Typography variant="subtitle1">Type</Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                        <Select
                            fullWidth
                            value={feature.type}
                            onChange={handleTypeSelectionChange}>
                            {
                                featureTypes.map((item, index) => (
                                    <MenuItem key={index} value={item}>{ item }</MenuItem>
                                ))
                            }
                        </Select>
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={4} md={3} sx={itemSx}>
                        <Typography variant="subtitle1">Value</Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                        <TextField
                            fullWidth
                            defaultValue={feature.value}
                            onChange={(e) => handleTextFieldChange('value', e.target.value)} />
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={4} md={3} sx={itemSx}>
                        <Typography variant="subtitle1">Tags</Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                        <TextField
                            fullWidth
                            multiline
                            maxRows={4}
                            defaultValue={feature.stringTags}
                            onChange={(e) => handleTextFieldChange('stringTags', e.target.value)} />
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
                        startIcon={<FeaturedPlayListIcon />}
                        onClick={onCreate}
                        disabled={pageState.disableSaveButton}>
                        Create
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export  const EditFeature = () => {
    let { featureId } = useParams()
    const navigate = useNavigate()
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [feature, setFeature] = useState<IFeature | undefined>()
    const [updatedFeature, setUpdatedFeature] = useState<IFeature & {stringTags: String}>({
        name: '',
        value: '',
        description: '',
        type: featureTypes[0],
        tags: [],
        stringTags: '',
    })

    const handleTypeSelectionChange = (event: SelectChangeEvent) => {
        const type = event.target.value as TFeatureType
        setUpdatedFeature({...updatedFeature, ...{type}})
    }

    const handleTextFieldChange = (field:string, value:string) => {
        setUpdatedFeature({...updatedFeature, ...{[field]: value}})
    }

    const onUpdate = async () => {
        const updateData:IFeature = {
            ...feature,
            ...{
                name: updatedFeature.name,
                description: updatedFeature.description,
                value: updatedFeature.value,
                type: updatedFeature.type,
                tags: updatedFeature.stringTags.split(', ')
            }
        }
        console.log('save update: ', updateData)

        // send update data to the api
        try {
            const featureResp = await FeatureService.updateFeature(updateData)
            setFeature(featureResp.data)
            setUpdatedFeature({
                ...featureResp.data,
                ...{ stringTags: featureResp.data.tags? featureResp.data.tags.join(', '): '' }
            })
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
            console.log('Edit: ', featureId)

            if (featureId) {
                try {
                    const featureResp = await FeatureService.getFeature(featureId)
                    setFeature(featureResp.data)
                    setUpdatedFeature({
                        ...featureResp.data,
                        ...{ stringTags: featureResp.data.tags? featureResp.data.tags.join(', '): '' }
                    })
                } catch (err:any) {
                    // error fetching feature
                    // log to the UI
                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: [err?.response?.data?.message || '']}
                    })
                }
            }
        }

        init()
    }, [featureId])

    const itemSx = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        paddingLeft: '20px'
    }

    const hasChanges = (() => {
        if (!feature) return false

        return !(
            feature.name !== updatedFeature.name ||
            feature.description !== updatedFeature.description ||
            feature.value !== updatedFeature.value ||
            feature.type !== updatedFeature.type ||
            feature.tags?.join(', ') !== updatedFeature.stringTags
        )
    })()

    return (
        <Container style={{paddingTop: 20}}>
            <Grid item xs={12}>
                <Typography variant='h5' style={{padding:'10px'}}>
                    <VisibilityIcon /> Feature Update View
                </Typography>
                <Divider />
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button
                        variant="text"
                        startIcon={<ArrowBackIosNewIcon />}
                        onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </Grid>
                {
                    feature? (
                        <>
                            <Grid container item xs={12}>
                                <Grid item xs={4} md={3} sx={itemSx}>
                                    <Typography variant="subtitle1">Name</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                    <TextField
                                        fullWidth
                                        defaultValue={updatedFeature.name}
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
                                        defaultValue={updatedFeature.description}
                                        onChange={(e) => handleTextFieldChange('description', e.target.value)}/>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={4} md={3} sx={itemSx}>
                                    <Typography variant="subtitle1">Type</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                    <Select
                                        fullWidth
                                        value={updatedFeature.type}
                                        onChange={handleTypeSelectionChange}>
                                        {
                                            featureTypes.map((item, index) => (
                                                <MenuItem key={index} value={item}>{ item }</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={4} md={3} sx={itemSx}>
                                    <Typography variant="subtitle1">Value</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                    <TextField
                                        fullWidth
                                        defaultValue={updatedFeature.value}
                                        onChange={(e) => handleTextFieldChange('value', e.target.value)} />
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={4} md={3} sx={itemSx}>
                                    <Typography variant="subtitle1">Tags</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        maxRows={4}
                                        defaultValue={updatedFeature.stringTags}
                                        onChange={(e) => handleTextFieldChange('stringTags', e.target.value)} />
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
                        disabled={hasChanges || !feature}>
                        Update
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

const ViewFeature = () => {
    const { featureId } = useParams()
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
    const [feature, setFeature] = useState<IFeature | undefined>()

    const onDelete = async () => {
        if (featureId) {
            // console.log('Delete this: ', feature?._id)
            try {
                const featureResp = await FeatureService.deleteFeature(featureId)
                setFeature(featureResp.data)
                setPageState({
                    disableEditButton: true,
                    disableDeleteButton: true,
                    deleteDialogOpen: false
                })
                setInfoAndErrors({
                    ...{infoMessages: ['Sucessfully deleted this feature']},
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
            console.log('View: ', featureId)

            if (featureId) {
                try {
                    const featureResp = await FeatureService.getFeature(featureId)
                    setFeature(featureResp.data)

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
    }, [featureId])

    const data:{field: string, value: string|undefined}[] = [
        { field: 'name', value: feature?.name },
        { field: 'description', value: feature?.description },
        { field: 'type', value: feature?.type },
        { field: 'value', value: feature?.value },
        { field: 'tags', value: feature?.tags?.join(', ') }
    ]

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h5' style={{padding:'10px'}}>
                        <VisibilityIcon /> Feature Readonly View
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
                            onClick={() => navigate(`/features/edit/${ feature?._id }`)}>
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
                                    Are you sure you want to delete this feature?
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
                    feature? (
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

export default ViewFeature