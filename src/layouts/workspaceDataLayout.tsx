import React, { useState, useEffect } from 'react'
import { Container, Grid } from '@mui/material';

import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DropDownSearch from '../components/inputs/dropdownSearch';

import { useAppDispatch, useAppSelector} from '../stores/appStore';
import { IWorkspace } from '../types/user';

interface Props {
    children?: React.ReactNode
}

const WorkspaceDataLayout = (props:Props) => {
    const defaultWorkspace = useAppSelector(state => state.signedInUser?.workspace)
    const ownWorkspaces = useAppSelector(state => state.signedInUser?.workspaces) || []
    const externalWorkspaces = useAppSelector(state => state.signedInUser?.externalWorkspaces) || []

    const [workspaces, setWorkspaces] = useState<{key: string, label: string, subLabel?:string, Icon?:React.FC}[]>([])
    const [selectedWorkspace, setSelectedWorkspace] = useState<string | undefined>(undefined)

    useEffect(() => {
        let workspaces = [
            ...ownWorkspaces.map(item => ({
                key: item._id || '',
                label: `${ item.name }`,
                subLabel: 'owned',
                Icon: BookmarkIcon
            })),
            ...externalWorkspaces.map(item => ({
                key: item._id || '',
                label: item.name,
                subLabel: item.ownerUsername,
                Icon: ScatterPlotIcon
            }))
        ]

        setWorkspaces(workspaces)
    }, [defaultWorkspace, ownWorkspaces, externalWorkspaces])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    {/* <PrimaryHeader title={'User Roles Update View'} subtitle={ 'test' } />
                    <Divider /> */}
                    <DropDownSearch
                        ariaLabel="Search Select Workspace"
                        ariaControls='select-workspace-menu'
                        placeholder='Select Workspace'
                        selected={selectedWorkspace}
                        options={workspaces}
                        onSelect={(sel) => {
                            setSelectedWorkspace(sel)
                        }} />
                </Grid>
                <Grid item xs={12} md={6}></Grid>
                { props.children }
            </Grid>
        </Container>
    )
}

export default WorkspaceDataLayout