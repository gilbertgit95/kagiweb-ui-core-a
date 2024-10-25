import React, { useState } from 'react';
import { Button, Typography, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import FeatureService from './featureService';
import { IFeature, TFeatureType, TFeatureScope, featureTypes, featureScopes } from '../../types/feature';
import AppUtils from '../../utils/appUtils';

export const FeatureCreateForm = () => {
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
        scope: featureScopes[0],
        stringTags: '',
    })

    const handleTypeSelectionChange = (event: SelectChangeEvent) => {
        const type = event.target.value as TFeatureType
        setFeature({...feature, ...{type}})
    }

    const handleScopeSelectionChange = (event: SelectChangeEvent) => {
        const scope = event.target.value as TFeatureScope
        setFeature({...feature, ...{scope}})
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
                scope: feature.scope,
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

            // re load app refs
            await AppUtils.loadAppRefsData()

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
        <>
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
                    <Typography variant="subtitle1">Scope</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Select
                        fullWidth
                        value={feature.scope}
                        onChange={handleScopeSelectionChange}>
                        {
                            featureScopes.map((item, index) => (
                                <MenuItem key={index} value={item}>{ item }</MenuItem>
                            ))
                        }
                    </Select>
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
        </>
    )
}

export default FeatureCreateForm