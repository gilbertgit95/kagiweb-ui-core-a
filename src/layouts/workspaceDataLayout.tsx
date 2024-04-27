import React from 'react'
import { Container, Grid } from '@mui/material';

import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DropDownSearch from '../components/inputs/dropdownSearch';

interface Props {
    children?: React.ReactNode
}

const WorkspaceDataLayout = (props:Props) => {
   
    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    {/* <PrimaryHeader title={'User Roles Update View'} subtitle={ 'test' } />
                    <Divider /> */}
                    <DropDownSearch
                        ariaLabel="Search Select Workspace"
                        ariaControls='select-workspace-menu'
                        selected={''}
                        options={[
                            {
                                key: 'opt1',
                                label: 'Option 1',
                                Icon: BookmarkIcon
                            },
                            {
                                key: 'opt2',
                                label: 'Option 2',
                                Icon: ScatterPlotIcon
                            },
                            {
                                key: 'opt3',
                                label: 'Option 3',
                                Icon: ScatterPlotIcon
                            }
                        ]} />
                </Grid>
                <Grid item xs={6}></Grid>
                { props.children }
            </Grid>
        </Container>
    )
}

export default WorkspaceDataLayout