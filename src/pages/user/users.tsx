import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Box, Typography, Divider } from "@mui/material";
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';

import PrimaryTable, { IColDef } from "../../components/tables/primaryTable";
import { useSearchParams } from 'react-router-dom';

import UserService from "./userService";
import Config from "../../utils/config";
// import { IUser } from "../../types/user";
// import { IPagination } from "../../types/mixTypes";

interface IUserRow {
    _id: string,
    username: string,
    name: string,
    email: string,
    phone: string,
    verified: boolean,
    disabled: boolean
}

const colDef:IColDef[] = [
    {
        header: 'Username',
        field: 'username',
        Component: undefined // react Component or undefined
    },
    {
        header: 'Name',
        field: 'name',
        Component: undefined // react Component or undefined
    },
    {
        header: 'Email',
        field: 'email',
        Component: undefined // react Component or undefined
    },
    {
        header: 'Phone',
        field: 'phone',
        Component: undefined // react Component or undefined
    },
    {
        header: 'Verified',
        field: 'verified',
        Component: (props:IUserRow) => {
            return <Checkbox checked={props.verified} />
        }
    },
    {
        header: 'Disabled',
        field: 'disabled',
        Component: (props:IUserRow) => {
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
        field: 'phone',
        Component: (props:IUserRow) => {
            const navigate = useNavigate()

            return (
                <Button
                    startIcon={<VisibilityIcon />}
                    onClick={() => navigate(`/users/view/${ props._id }`)}
                    variant="text">View User</Button>
            )
        }
    }
]

const Users = () => {
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
    const [data, setData] = useState<IUserRow[]>([])

    const search = async (page:number, pageSize:number) => {
        // console.log('pagination: ', pagination)
        window.history.replaceState(null, '', `?page=${ page + 1 }&pageSize=${ pageSize }`)
        try {
            const resp = await UserService.getUsers({
                page: page + 1,
                pageSize: pageSize
            })
            if (resp.data && resp.data.items) {
                const tarnsformedData:IUserRow[] = resp.data.items.map(item => {
                    return {
                        _id: item._id || '',
                        username: item.username,
                        name: UserService.getUserInfo(item, 'fullname')?.key || '--',
                        email: UserService.getContactInfo(item, 'email-address')?.value || '--',
                        phone: UserService.getContactInfo(item, 'mobile-number')?.value || '--',
                        verified: Boolean(item.verified),
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

    useEffect(() => {
        const init = async () => {
            window.history.replaceState(null, '', `?page=${ pageQuery }&pageSize=${ pageSizeQuery }`)
            try {
                const resp = await UserService.getUsers({
                    page: pageQuery,
                    pageSize: pageSizeQuery
                })
                if (resp.data && resp.data.items) {
                    const tarnsformedData:IUserRow[] = resp.data.items.map((item) => {
                        return {
                            _id: item._id || '',
                            username: item.username,
                            name: UserService.getUserInfo(item, 'fullname')?.key || '--',
                            email: UserService.getContactInfo(item, 'email-address')?.value || '--',
                            phone: UserService.getContactInfo(item, 'mobile-number')?.value || '--',
                            verified: Boolean(item.verified),
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
        console.log('initiate users page')
        init()
    }, [])


    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h5' style={{padding:'10px'}}>
                        <VisibilityIcon /> User List View
                    </Typography>
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
                            startIcon={<PersonAddIcon />}
                            onClick={() => navigate('/users/create')}>
                            Create User
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

export default Users