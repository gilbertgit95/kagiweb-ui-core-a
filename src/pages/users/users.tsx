import React, { useEffect } from "react";
import { Container } from "@mui/material";

import PrimaryTable, { IColDef } from "../../components/tables/primaryTable";

import UserService from "./userService";

interface IUserRow {
    _id: string,
    username: string,
    name: string,
    email: string,
    phone: string
}

const colDef:IColDef[] = [
    {
        header: 'ID',
        field: '_id',
        component: undefined // react component or undefined
    },
    {
        header: 'Username',
        field: 'username',
        component: undefined // react component or undefined
    },
    {
        header: 'Name',
        field: 'name',
        component: undefined // react component or undefined
    },
    {
        header: 'Email',
        field: 'email',
        component: undefined // react component or undefined
    },
    {
        header: 'Phone',
        field: 'phone',
        component: undefined // react component or undefined
    }
]

const data:IUserRow[] = [
    { _id: '001', username: 'test001', name: 'test001', email: 'test0001@gmail.com', phone: '+6300000001' },
    { _id: '002', username: 'test002', name: 'test002', email: 'test0002@gmail.com', phone: '+6300000002' },
    { _id: '003', username: 'test003', name: 'test003', email: 'test0003@gmail.com', phone: '+6300000003' },
    { _id: '004', username: 'test004', name: 'test004', email: 'test0004@gmail.com', phone: '+6300000004' },
    { _id: '005', username: 'test005', name: 'test005', email: 'test0005@gmail.com', phone: '+6300000005' },
    { _id: '006', username: 'test006', name: 'test006', email: 'test0006@gmail.com', phone: '+6300000006' },
    { _id: '007', username: 'test007', name: 'test007', email: 'test0007@gmail.com', phone: '+6300000007' }
]

// table:
//     columnDefs: column definations
//     onClick: method that callsback the rows ang column that has been clicked

//     enableSelection: show selectbox
//     enableMultipleSelection: if true then use selectbox else use radio button
//     onSelect: callsback when doing selection

//     data: arrays of data rows
//     pagination: recieves paggination data like max, limit, page number and so on
//     onNextPage: callback when triggering next page button
//     onPreviousPage: callback when triggering previous button
//     onFirstPage: callback when triggering firstpage button
//     onLastPage: callback when triggering lastpage button

//     isLoading: show loading indicator and disable the table interactions


const EditView = () => {
    return null
}

const ReadOnlyView = () => {
    return null
}

const Users = () => {
    // get pagination and number of page query from url
    // if nothing then use default
    // const search = () => {
        
    // }

    // const nextPage = () => {

    // }

    // const prevPage = () => {
        
    // }

    // const firstPage = () => {
        
    // }

    // const lastPage = () => {
        
    // }

    useEffect(() => {
        const init = async () => {
            const resp = await UserService.getUsers()
            console.log(resp.data)
        }
        console.log('initiate users page')
        init()
    }, [])


    return (
        <>
            <Container style={{paddingTop: 30}}>
                <PrimaryTable
                    pagination={{
                        page: 0,
                        pageSize: 5,
                        totalItems: 200,
                        pageSizeList: [5, 10, 25, 100]
                    }}
                    columnDefs={colDef}
                    data={data}
                    onPageChange={(e, newPage) => {
                        console.log('newPage: ', newPage)
                    }}
                    onRowsPerPageChange={(e, newRowPerPage) => {
                        console.log('roePerPage: ', newRowPerPage)
                    }} />
            </Container>
            <EditView />
            <ReadOnlyView />
        </>
    )
}

export default Users