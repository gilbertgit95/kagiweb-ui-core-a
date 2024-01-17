import React, { useEffect } from "react";
import { Container } from "@mui/material";

import PrimaryTable from "../../components/tables/primaryTable";

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