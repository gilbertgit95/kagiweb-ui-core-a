import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Container, Box, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';
import ListIcon from '@mui/icons-material/List';
import TableViewIcon from '@mui/icons-material/TableView';
import Stack from '@mui/material/Stack';

import PrimaryHeader from '../../components/headers/primaryHeader';
import { IRole } from '../../types/role';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import RoleService from '../role/roleService';
import RoleFeaturesListReadOnlyView from './roleFeaturesListReadOnlyView';
import RoleFeaturesGroupedReadOnlyView from './roleFeaturesGroupedReadOnlyView';

const RoleFeaturesPage = () => {
    const { roleId } = useParams()
    const navigate = useNavigate()
    let [searchParams] = useSearchParams()
    const view = searchParams.get('view')
    const viewTypes = ['list', 'grouped']
    const [viewType, setViewType] = useState<string|null>((new Set(viewTypes)).has(view || '')? view: viewTypes[0])
    const [role, setRole] = useState<IRole | undefined>()
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    const onClickView = (vType:string) => {
        setViewType(vType)
        window.history.replaceState(null, '', `?view=${ vType }`)
    }

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
        }
        console.log('initiate role features page')
        init()
    }, [roleId])

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
                                    variant={viewType === 'list'? 'contained': 'outlined'}>
                                    <ListIcon />
                                </Button>
                                <Button
                                    size="small"
                                    onClick={() => {
                                        onClickView('grouped')
                                    }}
                                    variant={viewType === 'grouped'? 'contained': 'outlined'}>
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
                            startIcon={<EditIcon />}
                            disabled={role?.absoluteAuthority}
                            onClick={() => navigate(`/roles/edit/${ roleId }/features?view=${ viewType }`)}>
                            Edit
                        </Button>
                    </Box>
                </Grid>
                { viewType === 'list'? <RoleFeaturesListReadOnlyView role={role} />: null }
                { viewType === 'grouped'? <RoleFeaturesGroupedReadOnlyView role={role} />: null }
                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default RoleFeaturesPage