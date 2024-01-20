import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "@mui/material";

import PrimaryTable, { IColDef } from "../../components/tables/primaryTable";
import { useSearchParams } from 'react-router-dom';

import UserService from "./userService";
// import { IUser } from "../../types/user";
// import { IPagination } from "../../types/mixTypes";

interface IUserRow {
    _id: string,
    username: string,
    name: string,
    email: string,
    phone: string
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
        header: 'ID',
        field: '_id',
        Component: undefined // react Component or undefined
    },
    {
        header: '',
        field: 'phone',
        Component: (props:IUserRow) => {
            const navigate = useNavigate()

            return (
                <Button
                    onClick={() => navigate(`/users/${ props._id }`)}
                    variant="text">View User</Button>
            )
        }
    }
]

const defaultPageSizeList = [1, 5, 10, 25, 100]
const defaultPageSize = 10
const defaultPage = 1

const Users = () => {
    const [searchParams] = useSearchParams();
    const pageQuery = parseInt(searchParams.get('page') || '') || defaultPage;
    const pageSizeQuery = parseInt(searchParams.get('pageSize') || '') || defaultPageSize;

    const [pagination, setPagination] = useState({
        page: 0,
        pageSize: pageSizeQuery,
        totalItems: 0,
        pageSizeList: defaultPageSizeList
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
                        phone: UserService.getContactInfo(item, 'mobile-number')?.value || '--'
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
                            phone: UserService.getContactInfo(item, 'mobile-number')?.value || '--'
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
            <PrimaryTable
                pagination={pagination}
                columnDefs={colDef}
                data={data}
                onPageChange={onPageChange}
                onRowsPerPageChange={onPageSizeChange} />
        </Container>
    )
}

export default Users