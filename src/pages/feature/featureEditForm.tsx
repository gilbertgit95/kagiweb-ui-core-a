import React, { useState, useEffect } from 'react';
import { Button, Typography, TextField } from '@mui/material';

import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import EditIcon from '@mui/icons-material/Edit';

import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import { IFeature, TFeatureType, featureTypes, featureScopes } from '../../types/feature';
import AppUtils from '../../utils/appUtils';

interface Props {
    featureId: string | undefined,
    getFunc: (accountId:string) => Promise<{data:IFeature}>,
    updateFunc: (updateData:IFeature) => Promise<{data:IFeature}>,
    updated?: (user:IFeature|undefined) => void
}

export  const FeatureEditForm = ({featureId, getFunc, updateFunc}:Props) => {
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [feature, setFeature] = useState<IFeature | undefined>()
    const [updatedFeature, setUpdatedFeature] = useState<IFeature & {stringTags: String}>({
        name: '',
        value: '',
        description: '',
        scope: featureScopes[0],
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
                scope: updatedFeature.scope,
                tags: updatedFeature.stringTags.split(', ')
            }
        }
        console.log('save update: ', updateData)

        // send update data to the api
        try {
            const featureResp = await updateFunc(updateData)
            setFeature(featureResp.data)
            setUpdatedFeature({
                ...featureResp.data,
                ...{ stringTags: featureResp.data.tags? featureResp.data.tags.join(', '): '' }
            })

             // re load app refs
             await AppUtils.loadAppRefsData()

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
                    const featureResp = await getFunc(featureId)
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
    }, [featureId, getFunc])

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
            feature.scope !== updatedFeature.scope ||
            feature.tags?.join(', ') !== updatedFeature.stringTags
        )
    })()

    return (
        <>
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
                                <Typography variant="subtitle1">Scope</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <Select
                                    disabled
                                    fullWidth
                                    value={updatedFeature.scope}>
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
        </>
    )
}

export default FeatureEditForm