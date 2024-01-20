import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "@mui/material";

import PrimaryTable, { IColDef } from "../../components/tables/primaryTable";

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

const Users = () => {
    const [pagination, setPagination] = useState({
        page: 0,
        pageSize: 100,
        totalItems: 0,
        pageSizeList: [5, 10, 25, 100]
    })
    const [data, setData] = useState<IUserRow[]>([])

    useEffect(() => {
        const init = async () => {
            try {
                const resp = await UserService.getUsers()
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
                        pageSizeList: [5, 10, 25, 100]
                    })
                    setData(tarnsformedData)
                }
                console.log(resp.data)
            } catch (err) {
            }
        }
        console.log('initiate users page')
        init()
    }, [])


    return (
        <Container style={{paddingTop: 30}}>
            <PrimaryTable
                pagination={pagination}
                columnDefs={colDef}
                data={data}
                onPageChange={(e, newPage) => {
                    console.log('newPage: ', newPage)
                }}
                onRowsPerPageChange={(e, newRowPerPage) => {
                    console.log('roePerPage: ', newRowPerPage)
                }} />
        </Container>
    )
}

export default Users