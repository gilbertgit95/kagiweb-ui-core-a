import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import VisibilityIcon from '@mui/icons-material/Visibility';

import PrimaryTable, { IColDef } from "../../components/tables/primaryTable";
import { useSearchParams } from 'react-router-dom';

import WorkspaceService from "./workspaceService";
// import { IUser } from "../../types/user";
// import { IPagination } from "../../types/mixTypes";

interface IWorkspaceRow {
    _id: string,
    name: string,
    description: string,
    isActive: boolean,
    disabled: boolean
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
            return <Checkbox checked={props.isActive} />
        }
    },
    {
        header: 'Disabled',
        field: 'disabled',
        Component: (props:IWorkspaceRow) => {
            return <Checkbox checked={props.disabled} />
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
                    onClick={() => navigate(`/workspaces/${ props._id }`)}
                    variant="text">View Workspace</Button>
            )
        }
    }
]

const defaultPageSizeList = [5, 10, 25, 100]
const defaultPageSize = 5
const defaultPage = 1

const Roles = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const pageQuery = parseInt(searchParams.get('page') || '') || defaultPage;
    const pageSizeQuery = parseInt(searchParams.get('pageSize') || '') || defaultPageSize;

    const [pagination, setPagination] = useState({
        page: 0,
        pageSize: pageSizeQuery,
        totalItems: 0,
        pageSizeList: defaultPageSizeList
    })
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
                    pageSizeList: defaultPageSizeList
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

    useEffect(() => {
        const init = async () => {
            window.history.replaceState(null, '', `?page=${ pageQuery }&pageSize=${ pageSizeQuery }`)
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
                        pageSizeList: defaultPageSizeList
                    })
                    setData(tarnsformedData)
                }
                // console.log(resp.data)
            } catch (err) {
            }
        }
        console.log('initiate users page')
        init()
    }, [])


    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button
                        variant="text"
                        startIcon={<WorkspacesIcon />}
                        onClick={() => navigate('/workspaces/create')}>
                        Create Workspace
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <PrimaryTable
                        pagination={pagination}
                        columnDefs={colDef}
                        data={data}
                        onPageChange={onPageChange}
                        onRowsPerPageChange={onPageSizeChange} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Roles