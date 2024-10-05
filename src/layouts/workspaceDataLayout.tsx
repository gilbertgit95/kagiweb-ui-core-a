import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Container, Grid, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import PersonIcon from '@mui/icons-material/Person';
import DropDownSearch from '../components/inputs/dropdownSearch';

import { useAppSelector} from '../stores/appStore';

interface Props {
    children?: React.ReactNode
}

const WorkspaceDataLayout = (props:Props) => {
    const { workspaceId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    const accountData = useAppSelector(state => state.signedInAccount?.accountData)
    const defaultWorkspace = useAppSelector(state => state.signedInAccount?.workspace)
    const ownWorkspaces = useAppSelector(state => state.signedInAccount?.workspaces) || []
    const externalWorkspaces = useAppSelector(state => state.signedInAccount?.externalWorkspaces) || []

    const [workspaces, setWorkspaces] = useState<{key: string, label: string, subLabel?:string, Icon?:React.FC}[]>([])
    const [selectedWorkspace, setSelectedWorkspace] = useState<string | undefined>(undefined)
    const [selectedIsOwned, setSelectedIsOwned] = useState<boolean>(false)

    useEffect(() => {
        setSelectedWorkspace(workspaceId)
    }, [workspaceId])

    useEffect(() => {
        const ownedSet = new Set(ownWorkspaces.map(item => item._id))
        let workspaces = [
            ...ownWorkspaces.map(item => ({
                key: item._id || '',
                label: `${ item.name }`,
                subLabel: 'owned',
                Icon: accountData?.accountType === 'user'? PersonIcon: ScatterPlotIcon
            })),
            ...externalWorkspaces.map(item => ({
                key: item._id || '',
                label: item.name,
                subLabel: item.ownerNameId,
                Icon: item?.ownerAccountType === 'user'? PersonIcon: ScatterPlotIcon
            }))
        ]

        setWorkspaces(workspaces)
        setSelectedIsOwned(selectedWorkspace? ownedSet.has(selectedWorkspace): false)
    }, [selectedWorkspace, defaultWorkspace, ownWorkspaces, externalWorkspaces])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    {/* <PrimaryHeader title={'Account Roles Update View'} subtitle={ 'test' } />
                    <Divider /> */}
                    <DropDownSearch
                        placeholder='Select Workspace'
                        selected={selectedWorkspace}
                        options={workspaces}
                        onSelect={(sel) => {
                            const workspaceIdIndex = 4
                            const path = location.pathname.split('/')
                            // console.log(path.split('/'))
                            setSelectedWorkspace(sel)
                            if (path.length >= workspaceIdIndex) {
                                path[workspaceIdIndex - 1] = sel
                                navigate(path.join('/'))
                            }
                        }} />
                    <Button
                        sx={{marginLeft: 1}}
                        size="large"
                        variant="outlined"
                        disabled={!selectedIsOwned}
                        startIcon={<VisibilityIcon />}
                        onClick={() => {
                            navigate(`/owner/view/workspaces/${ selectedWorkspace }`)
                        }}>
                        View
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}></Grid>
                <Grid item xs={12}>
                    { props.children }
                </Grid>
            </Grid>
        </Container>
    )
}

export default WorkspaceDataLayout