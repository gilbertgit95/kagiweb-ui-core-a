import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Check from '../../components/indicators/check';
import PrimaryHeader from '../../components/headers/primaryHeader';

import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import { useSearchParams } from 'react-router-dom';

import UserService from '../user/userService';
import WorkspaceService from './workspaceService';
import Config from '../../config';
import { IUser } from '../../types/user';
// import { IPagination } from '../../types/mixTypes';

interface IWorkspaceRow {
    _id: string,
    name: string,
    description: string,
    isActive: boolean,
    disabled: boolean
}

const UserWorkspacesPage = () => {
    const { userId } = useParams()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const pageQuery = parseInt(searchParams.get('page') || '') || Config.defaultPage;
    const pageSizeQuery = parseInt(searchParams.get('pageSize') || '') || Config.defaultPageSize;

    const [pagination, setPagination] = useState({
        page: 0,
        pageSize: pageSizeQuery,
        totalItems: 0,
        pageSizeList: Config.defaultPageSizeList
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    const [user, setUser] = useState<IUser | undefined>()
    const [data, setData] = useState<IWorkspaceRow[]>([])

    const search = async (page:number, pageSize:number) => {
        // console.log('pagination: ', pagination)
        window.history.replaceState(null, '', `?page=${ page + 1 }&pageSize=${ pageSize }`)
        try {
            const resp = await WorkspaceService.getWorkspaces({
                page: page + 1,
                pageSize: pageSize
            })
            if (resp.data && resp.data.items) {
                const tarnsformedData:IWorkspaceRow[] = resp.data.items.map(item => {
                    return {
                        _id: item._id || '',
                        name: item.name || '--',
                        description: item.description || '--',
                        isActive: Boolean(item.isActive),
                        disabled: Boolean(item.disabled)
                    }
                })
                setPagination({
                    page: resp.data.page - 1,
                    pageSize: resp.data.pageSize,
                    totalItems: resp.data.totalItems,
                    pageSizeList: Config.defaultPageSizeList
                })
                setData(tarnsformedData)
            }
            // console.log(resp.data)
        } catch (err) {
        }
    }

    const onPageChange = (
        e:React.MouseEvent<HTMLButtonElement> | null,
        newPage:number) => {
        // setPagination({...pagination, ...{page: newPage}})
        search(newPage, pagination.pageSize)
    }

    const onPageSizeChange = (
        e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        newPageSize:number) => {
            // setPagination({...pagination, ...{pageSize: newPageSize}})
        search(0, newPageSize)
    }

    const colDef:IColDef[] = [
        {
            header: 'Name',
            field: 'name',
            Component: undefined // react Component or undefined
        },
        {
            header: 'Description',
            field: 'description',
            Component: undefined // react Component or undefined
        },
        {
            header: 'Active',
            field: 'isActive',
            Component: (props:IWorkspaceRow) => {
                return <Check value={props.isActive} />
            }
        },
        {
            header: 'Disabled',
            field: 'disabled',
            Component: (props:IWorkspaceRow) => {
                return <Check value={props.disabled} />
            }
        },
        // {
        //     header: 'ID',
        //     field: '_id',
        //     Component: undefined // react Component or undefined
        // },
        {
            header: '',
            field: '',
            Component: (props:IWorkspaceRow) => {
                const navigate = useNavigate()
    
                return (
                    <Button
                        startIcon={<VisibilityIcon />}
                        onClick={() => navigate(`/users/view/${ userId }/workspaces/${ props._id }`)}
                        variant="text">View Workspace</Button>
                )
            }
        }
    ]

    useEffect(() => {
        const init = async () => {
            window.history.replaceState(null, '', `?page=${ pageQuery }&pageSize=${ pageSizeQuery }`)
            // fetch user data
            if (userId) {
                try {
                    const userResp = await UserService.getUser(userId)
                    setUser(userResp.data)

                } catch (err:any) {
                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: [err?.response?.data?.message || '']}
                    })
                }
            }
            // fetch user workspaces
            try {
                const resp = await WorkspaceService.getWorkspaces({
                    page: pageQuery,
                    pageSize: pageSizeQuery
                })
                if (resp.data && resp.data.items) {
                    const tarnsformedData:IWorkspaceRow[] = resp.data.items.map((item) => {
                        return {
                            _id: item._id || '',
                            name: item.name || '--',
                            description: item.description || '--',
                            isActive: Boolean(item.isActive),
                            disabled: Boolean(item.disabled)
                        }
                    })
                    setPagination({
                        page: resp.data.page - 1,
                        pageSize: resp.data.pageSize,
                        totalItems: resp.data.totalItems,
                        pageSizeList: Config.defaultPageSizeList
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
        console.log('initiate users page')
        init()
    }, [userId, pageQuery, pageSizeQuery])


    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={ user?.username } subtitle={ 'Workspace List View' } />
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
                            startIcon={<WorkspacesIcon />}
                            onClick={() => navigate(`/users/view/${ userId }/workspaces/create`)}>
                            Create Workspace
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <PrimaryTable
                        pagination={pagination}
                        columnDefs={colDef}
                        data={data}
                        onPageChange={onPageChange}
                        onRowsPerPageChange={onPageSizeChange} />
                </Grid>
                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default UserWorkspacesPage