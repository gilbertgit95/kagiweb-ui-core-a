import React, { useEffect } from "react";
import { Container } from "@mui/material";

import PrimaryTable from "../../components/tables/primaryTable";

interface IUser {
    id: string,
    username: string,
    name: string,
    email: string
}

const colDef = [
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

// table:
//     columnDefs: column definations
//     onClick: method that callsback the rows ang column that has been clicked

//     enableSelection: show selectbox
//     enableMultipleSelection: if true then use selectbox else use radio button
//     onSelect: callsback when doing selection

//     data: arrays of data rows
//     paggination: recieves paggination data like max, limit, page number and so on
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
        console.log('initiate users page')
    }, [])

    return (
        <>
            <Container>
                List of users
                <PrimaryTable />
            </Container>
            <EditView />
            <ReadOnlyView />
        </>
    )
}

export default Users