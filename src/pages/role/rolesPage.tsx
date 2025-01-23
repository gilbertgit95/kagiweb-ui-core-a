import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import PrimaryHeader from '../../components/headers/primaryHeader';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';

import DateChanges, {IChangeDate} from '../../components/dates/dateChanges';
import SimpleLink from '../../components/links/simpleLink';
import ShortendDescription from '../../components/texts/shortendDescription';

import { useAppSelector} from '../../stores/appStore';
import { IRole } from '../../types/role';

interface IRoleRow {
    _id: string,
    name: string,
    scope: string,
    description: string,
    level: string,
    features: string
}

const colDef:IColDef[] = [
    {
        header: 'Name',
        field: 'name',
        Component: undefined // react Component or undefined
    },
    {
        header: 'Description',
        field: '',
        Component: (props:IRoleRow) => {
            return <ShortendDescription maxWidth={300} value={props.description} />
        }
    },
    {
        header: 'Scope',
        field: 'scope',
        Component: undefined // react Component or undefined
    },
    {
        header: 'Level',
        field: 'level',
        Component: undefined // react Component or undefined
    },
    {
        header: 'Features',
        field: 'features',
        Component: undefined // react Component or undefined
    },
    {
        header: 'Changed',
        field: '',
        Component: (props:IRoleRow & IChangeDate) => {
            return <DateChanges {...props} />
        }
    },
    {
        header: '',
        field: '',
        Component: (props:IRoleRow) => {
            return (
                <SimpleLink
                    link={`/roles/view/${ props._id }`}
                    text="View Role" />
            )
        }
    }
]

const RolesPage = () => {
    const navigate = useNavigate()
    const roles:IRole[] = useAppSelector(state => state.appRefs.roles) || []
    const [data, setData] = useState<IRoleRow[]>([])

    useEffect(() => {
        const init = async () => {
            try {
                if (roles) {
                    const sortedRoles = [...roles].sort((a, b) => {
                        return a.level - b.level
                    })
                    const tarnsformedData:(IRoleRow & IChangeDate)[] = sortedRoles
                        .map((item:IRole & IChangeDate) => {
                            return {
                                _id: item._id || '',
                                name: item.name || '--',
                                scope: item.scope || '--',
                                description: item.description || '--',
                                level: String(item.level) || '--',
                                features: item.absoluteAuthority? 'Everything':  String(item.featuresRefs?.length),
                                createdAt: item.createdAt,
                                updatedAt: item.updatedAt
                            }
                        })
                    setData(tarnsformedData)
                }
            } catch (err) {
                console.log(err)
            }
        }
        init()
    }, [roles])


    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Role List View'} />
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}>
                        <Button
                            variant="text"
                            startIcon={<AdminPanelSettingsIcon />}
                            onClick={() => navigate('/roles/create')}>
                            Create Role
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <PrimaryTable
                        // maxHeight={700}
                        columnDefs={colDef}
                        data={data} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default RolesPage