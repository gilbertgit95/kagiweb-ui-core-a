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
import RoleService from '../roles/roleService';
import RoleFeatureService from './roleFeatureService';

interface IFeatureRow {
    _id: string,
    name: string,
    value: string,
    type: string,
    tags: string
}

const RoleFeaturesPage = () => {
    const { roleId } = useParams()
    const navigate = useNavigate()
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

                } catch (err:any) {
                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: [err?.response?.data?.message || '']}
                    })
                }
            }
            try {
                const resp = await RoleFeatureService.getRoleFeatures(roleId)
                if (resp.data) {
                    const tarnsformedData:IFeatureRow[] = resp.data.map((item) => {
                        return {
                            _id: item._id || '',
                            name: '--',
                            value: '--',
                            type: '--',
                            tags: '--'
                        }
                    })
                    setData(tarnsformedData)
                }
                // console.log(resp.data)
            } catch (err:any) {
                setInfoAndErrors({
                    ...{infoMessages: []},
                    ...{errorMessages: [err?.response?.data?.message || '']}
                })
            }
        }
        console.log('initiate features page')
        init()
    }, [roleId])

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
        // {
        //     header: '',
        //     field: '',
        //     Component: (props:IFeatureRow) => {
        //         const navigate = useNavigate()
    
        //         return (
        //             <Button
        //                 startIcon={<VisibilityIcon />}
        //                 onClick={() => navigate(`/features/view/${ props._id }`)}
        //                 variant="text">View Feature</Button>
        //         )
        //     }
        // }
    ]

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Role Features'} subtitle={ role?.name } />
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
                            onClick={() => navigate(`/roles/edit/${ roleId }/features`)}>
                            Edit
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <PrimaryTable
                        columnDefs={colDef}
                        data={data} />
                </Grid>
                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default RoleFeaturesPage