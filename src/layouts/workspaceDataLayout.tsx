import React from 'react'
import { Container, Grid, Divider } from '@mui/material';
import PrimaryHeader from '../components/headers/primaryHeader';

interface Props {
    children?: React.ReactNode
}

const WorkspaceDataLayout = (props:Props) => {
    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'User Roles Update View'} subtitle={ 'test' } />
                    <Divider />
                </Grid>
                { props.children }
            </Grid>
        </Container>
    )
}

export default WorkspaceDataLayout