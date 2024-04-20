import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';

import PrimaryHeader from '../../components/headers/primaryHeader';
import { IRole } from '../../types/role';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import { useAppSelector} from '../../stores/appStore';
import RoleService from '../role/roleService';
import ShortendDescription from '../../components/texts/shortendDescription';
import ListItems from '../../components/lists/listItems';
import { IFeature } from '../../types/feature';

interface IFeatureRow {
    _id: string,
    name: string,
    value: string,
    type: string,
    tags: string[]
}

const RoleFeaturesPage = () => {
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
                                _id: feature._id || '',
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
        console.log('initiate role features page')
        init()
    }, [roleId, features])

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

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Role Features View'} subtitle={ role?.name } />
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
                            disabled={role?.absoluteAuthority}
                            onClick={() => navigate(`/roles/edit/${ roleId }/features`)}>
                            Edit
                        </Button>
                    </Box>
                </Grid>
                {/* <Grid item xs={12}>
                    <PrimaryTable
                        columnDefs={colDef}
                        data={data} />
                </Grid> */}
                {
                    role?.absoluteAuthority? null:(
                        <Grid item xs={12}>
                            <PrimaryTable
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

export default RoleFeaturesPage