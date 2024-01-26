import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Box, Typography, TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
// import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import ListIcon from '@mui/icons-material/List';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import PrimaryTable, { IColDef } from "../../components/tables/primaryTable";
import FeatureService from './featureService'
import { IFeature } from "../../types/feature";
import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
  useParams
} from "react-router-dom";

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

    return <div>create feature</div>
}

export  const EditFeature = () => {
    let { featureId } = useParams()
    const navigate = useNavigate()
    const [feature, setFeature] = useState<IFeature | undefined>()
    
    useEffect(() => {
        const init = async () => {
            console.log('Edit: ', featureId)

            if (featureId) {
                try {
                    const featureResp = await FeatureService.getFeature(featureId)
                    setFeature(featureResp.data)
                } catch (err) {
                    //  do nothing for now
                }
            }
        }

        init()
    }, [])

    // const data:{field: string, value: string|undefined}[] = [
    //     { field: 'name', value: feature?.name },
    //     { field: 'description', value: feature?.description },
    //     { field: 'type', value: feature?.type },
    //     { field: 'value', value: feature?.value },
    //     { field: 'tags', value: feature?.tags?.join(', ') }
    // ]
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
                                <Grid item xs={6} sx={itemSx}>
                                    <Typography variant="subtitle1">Name</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField defaultValue={feature.name} />
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={6} sx={itemSx}>
                                    <Typography variant="subtitle1">Description</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField defaultValue={feature.description} />
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={6} sx={itemSx}>
                                    <Typography variant="subtitle1">Type</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField defaultValue={feature.type} />
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={6} sx={itemSx}>
                                    <Typography variant="subtitle1">Value</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField defaultValue={feature.value} />
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={6} sx={itemSx}>
                                    <Typography variant="subtitle1">Tags</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField defaultValue={feature.tags?.join(', ')} />
                                </Grid>
                            </Grid>
                        </>
                    ):null
                }
            </Grid>
        </Container>
    )
}

const ViewFeature = () => {
    const { featureId } = useParams()
    const navigate = useNavigate()
    const [feature, setFeature] = useState<IFeature | undefined>()
    
    useEffect(() => {
        const init = async () => {
            console.log('View: ', featureId)

            if (featureId) {
                try {
                    const featureResp = await FeatureService.getFeature(featureId)
                    setFeature(featureResp.data)
                } catch (err) {
                    //  do nothing for now
                }
            }
        }

        init()
    }, [])

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
                            onClick={() => navigate(`/features/edit/${ feature?._id }`)}>
                            Edit
                        </Button>
                        <Button
                            variant="text"
                            startIcon={<DeleteIcon />}
                            color="secondary"
                            onClick={() => console.log('delete: ', feature?._id)}>
                            Delete
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <PrimaryTable
                        columnDefs={colDef}
                        data={data} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default ViewFeature