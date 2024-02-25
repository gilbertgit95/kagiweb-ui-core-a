import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';

import PrimaryHeader from '../../components/headers/primaryHeader';
import { IRole } from '../../types/role';
import { IUser } from '../../types/user';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import { useAppSelector} from '../../stores/appStore';
import UserService from '../user/userService';
// import RoleService from '../role/roleService';
// import UserRoleService from './userRoleService';
// import { IFeature } from '../../types/feature';

interface IRoleRow {
    _id: string,
    name: string,
    description: string,
    level: number,
    absoluteAuthority: string,
    isActive: string
}

const UserRolesPage = () => {
    const { userId } = useParams()
    const navigate = useNavigate()
    const roles = useAppSelector(state => state.appRefs.roles) || []
    // const features:IFeature[] = useAppSelector(state => state.appRefs.features) || []
    const [user, setUser] = useState<IUser | undefined>()
    const [data, setData] = useState<IRoleRow[]>([])
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    useEffect(() => {
        const init = async () => {
            if (userId) {
                try {
                    const userResp = await UserService.getUser(userId)
                    setUser(userResp.data)

                    if (userResp.data && userResp.data.rolesRefs) {
                        const rolesMap:{[key: string]:IRole} = roles.reduce((acc:{[key:string]:IRole}, item:IRole) => {
                            if (item && item._id) acc[item._id] = item
                            return acc
                        }, {})
                        const tarnsformedData:IRoleRow[] = userResp.data.rolesRefs.map((item) => {
                            const role = rolesMap[item.roleId || '']
                            return {
                                _id: item._id || '',
                                name: role.name || '',
                                description: role?.description || '',
                                level: role.level,
                                absoluteAuthority: role.absoluteAuthority? 'True': 'False',
                                isActive: item.isActive? 'True': 'False',
                            }
                        })
                        // console.log(tarnsformedData)
                        setData(tarnsformedData)
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
    }, [userId, roles])

    const colDef:IColDef[] = [
        {
            header: 'Name',
            field: 'name',
            Component: undefined
        },
        {
            header: 'Description',
            field: 'description',
            Component: undefined
        },
        {
            header: 'Level',
            field: 'level',
            Component: undefined
        },
        {
            header: 'Absolute Authority',
            field: 'absoluteAuthority',
            Component: undefined
        },
        {
            header: 'Active',
            field: 'isActive',
            Component: undefined
        }
    ]

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'User Roles View'} subtitle={ user?.username } />
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
                            // disabled={role?.absoluteAuthority}
                            onClick={() => navigate(`/roles/edit/${ userId }/features`)}>
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

export default UserRolesPage