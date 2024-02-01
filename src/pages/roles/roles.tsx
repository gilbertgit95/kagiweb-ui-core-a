import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Box } from "@mui/material";
import Grid from '@mui/material/Grid';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import VisibilityIcon from '@mui/icons-material/Visibility';

import PrimaryTable, { IColDef } from "../../components/tables/primaryTable";
import { useSearchParams } from 'react-router-dom';

import RoleService from "./roleService";
import Config from "../../utils/config";
// import { IUser } from "../../types/user";
// import { IPagination } from "../../types/mixTypes";

interface IRoleRow {
    _id: string,
    name: string,
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
        field: 'description',
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
    // {
    //     header: 'ID',
    //     field: '_id',
    //     Component: undefined // react Component or undefined
    // },
    {
        header: '',
        field: '',
        Component: (props:IRoleRow) => {
            const navigate = useNavigate()

            return (
                <Button
                    startIcon={<VisibilityIcon />}
                    onClick={() => navigate(`/roles/view/${ props._id }`)}
                    variant="text">View Role</Button>
            )
        }
    }
]

const Roles = () => {
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
    const [data, setData] = useState<IRoleRow[]>([])

    const search = async (page:number, pageSize:number) => {
        // console.log('pagination: ', pagination)
        window.history.replaceState(null, '', `?page=${ page + 1 }&pageSize=${ pageSize }`)
        try {
            const resp = await RoleService.getRoles({
                page: page + 1,
                pageSize: pageSize
            })
            if (resp.data && resp.data.items) {
                const tarnsformedData:IRoleRow[] = resp.data.items.map(item => {
                    return {
                        _id: item._id || '',
                        name: item.name || '--',
                        description: item.description || '--',
                        level: String(item.level) || '--',
                        features: item.absoluteAuthority? 'All':  String(item.featuresRefs?.length)
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

    useEffect(() => {
        const init = async () => {
            window.history.replaceState(null, '', `?page=${ pageQuery }&pageSize=${ pageSizeQuery }`)
            try {
                const resp = await RoleService.getRoles({
                    page: pageQuery,
                    pageSize: pageSizeQuery
                })
                if (resp.data && resp.data.items) {
                    const tarnsformedData:IRoleRow[] = resp.data.items.map((item) => {
                        return {
                            _id: item._id || '',
                            name: item.name || '--',
                            description: item.description || '--',
                            level: String(item.level) || '--',
                            features: item.absoluteAuthority? 'Everything':  String(item.featuresRefs?.length)
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
        console.log('initiate users page')
        init()
    }, [])


    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
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