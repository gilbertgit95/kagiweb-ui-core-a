import { useState, useEffect, useRef, useContext } from 'react'
import subpages from './lib/subPages'

import SubPageslayout from '../../common/layouts/subPagesLayout'

// import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
// import LoginIcon from '@mui/icons-material/Login'
import DeleteIcon from '@mui/icons-material/Delete'
import InfoIcon from '@mui/icons-material/Info'
import EditIcon from '@mui/icons-material/Edit'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import AddIcon from '@mui/icons-material/Add'

import InteractiveTable from '../../common/tables/interactiveTable'
import ImportData from '../../common/inputs/importData'
import FullScreenDialogBox from '../../common/popups/fullScreenDialogBox'
import TransferSelection from '../../common/inputs/transferSelection'
// import ConfirmDialogBox from '../../common/popups/confirmDialogBox'

// import AccountContext from '../../common/contexts/accountContext'
import AdminContext from '../../common/contexts/adminContext'
import GlobalDialogContext from '../../common/contexts/globalDialogContext'
import utils from '../../common/utilities'

const AppRoleEndpoints = (props) => {
    const [states, setStates] = useState({
        isLoading: true,
        itemDialogMode: 'add', // add || edit
        itemDialogData: {},
        itemDialog: false,
        bulkImportDialog: false,

        headers: [
            {
                label: 'Name',
                field: 'name',
                type: 'string'
            },
            {
                label: 'Description',
                field: 'description',
                type: 'string'
            },
            {
                label: 'Endpoints',
                field: '__endpoints',
                type: 'string'
            },
            {
                label: '',
                field: 'edit',
                width: 60,
                render: (renderProps = {}) => {
                    return (
                        <Button
                            {...renderProps}
                            startIcon={<EditIcon />}
                            size='small'>
                            Edit
                        </Button>
                    )
                },
                type: 'component'
            }
        ],
        rows: [],
        endpoints: []
    })
    const adminCtx = useContext(AdminContext)
    const globalDialogCtx = useContext(GlobalDialogContext)

    // useEffect(() => {
    //     const fetchData = () => {
    //         setStates({...states, ...{ ioLoading: true }})
    //         setTimeout(() => {
    //             setStates({...states, ...{ ioLoading: false }})
    //         }, 1000)
    //     }

    //     fetchData()
    // }, [])

    useEffect(() => {
        let roles = adminCtx.adminContext.roleEndpoints.map(role => {
            role['__endpoints'] = role.endpoints? role.endpoints.length: 0
            return role
        })
        setStates({...states, ...{ rows: roles, endpoints: adminCtx.adminContext.endpoints }})
        // console.log('admin data: ', adminCtx.adminContext.roles)
    }, [adminCtx.adminContext])

    // console.log('states rows: ', states.rows)

    return (
        <SubPageslayout
            navAnchor={'left'}
            navMenu={subpages}>
            <Grid item xs={12}>
                <Container maxWidth="lg" style={{ paddingTop: 20 }}>
                    <InteractiveTable
                        headers={ states.headers }
                        rows={ states.rows }
                        onInteract={(e) => {
                            // console.log('interact: ', e)
                            if (e.col && e.col.field && e.col.field === 'edit') {
                                setStates({...states, ...{
                                    itemDialog: true,
                                    // itemDialogMode: 'edit',
                                    itemDialogData: e.row
                                }})
                            }
                        }}
                        rightSideComponents={
                            <>
                                <Tooltip style={{ float: 'right' }} placement='bottom-end'
                                    title={
                                        <Typography style={{ padding: 10 }} variant='body1'>
                                            This will associate role and endpoints through data import.
                                        </Typography>
                                    }>
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        style={{ marginRight: 5 }}
                                        // startIcon={ <ImportExportIcon /> }
                                        onClick={() => {
                                            setStates({...states, ...{ bulkImportDialog: true }})
                                        }}><ImportExportIcon /></Button>
                                </Tooltip>
                                <Tooltip style={{ float: 'right' }} placement='bottom-end'
                                    title={
                                        <Typography style={{ padding: 10 }} variant='body1'>
                                            Associated Endpoints to a role
                                        </Typography>
                                    }>
                                    <InfoIcon color='primary' />
                                </Tooltip>
                            </>
                        } />
                    {/* <NormalDialogBox
                        title={ 'Update Role Endpoints' }
                        open={ states.itemDialog }
                        fullWidth={ true }
                        maxWidth={ 'sm' }
                        strictClose={ true }
                        onClose={() => {
                            setStates({...states, ...{ itemDialog: false }})
                        }}
                        actions={
                            <Button
                                color='primary'
                                variant='contained'
                                // style={{ marginRight: 5 }}
                                onClick={async () => {
                                    let msg = 'This will update Role Endpoints. Do you want to proceed?'

                                    let result = await globalDialogCtx.showDialog({
                                        title: 'Update Role Endpoints',
                                        type: 'confirm',
                                        message: msg
                                    })

                                    if (result.status !== 'proceed') return

                                }}>Update</Button>
                        }>
                        <Box
                            style={{
                                margin: 0,
                                padding: 0,
                                paddingRight: 20,
                                paddingLeft: 20,
                                width: '100%'
                            }}>
                            
                        </Box>
                    </NormalDialogBox> */}
                    <FullScreenDialogBox
                        title={ 'Update Role Endpoints' }
                        open={ states.itemDialog }
                        onClose={() => {
                            setStates({...states, ...{ itemDialog: false }})
                        }}>
                        <Container
                            style={{ marginTop: 20 }}
                            maxWidth="lg">
                            <TransferSelection />
                        </Container>
                    </FullScreenDialogBox>
                    <FullScreenDialogBox
                        title={ 'Import Roles Endpoints Association from Excel' }
                        open={ states.bulkImportDialog }
                        onClose={() => {
                            setStates({...states, ...{ bulkImportDialog: false }})
                        }}>
                        <Container
                            style={{ marginTop: 20 }}
                            maxWidth="lg">
                            <ImportData
                                onClose={() => {
                                    setStates({...states, ...{ bulkImportDialog: false }})
                                }}
                                headers={['role', 'endpoint']} />
                        </Container>
                    </FullScreenDialogBox>
                </Container>
            </Grid>
        </SubPageslayout>
    )
}

export default AppRoleEndpoints