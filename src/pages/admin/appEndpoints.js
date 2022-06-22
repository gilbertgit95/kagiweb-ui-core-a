import { useState, useEffect, useContext } from 'react'
import subpages from './lib/subPages'

import SubPageslayout from '../../common/layouts/subPagesLayout'

// import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
// import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
// import TextField from '@mui/material/TextField'
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
import NormalDialogBox from '../../common/popups/normalDialogBox'
import ConfirmDialogBox from '../../common/popups/confirmDialogBox'

// import AccountContext from '../../common/contexts/accountContext'
import AdminContext from '../../common/contexts/adminContext'
import utils from '../../common/utilities'

const AppEndpoints = (props) => {
    const [states, setStates] = useState({
        isLoading: true,
        itemDialogMode: 'add', // add || edit
        itemDialogData: {},
        itemDialog: false,
        bulkImportDialog: false,

        headers: [
            {
                label: 'Endpoint',
                field: 'endpoint',
                type: 'string'
            },
            {
                label: 'Name',
                field: 'name',
                type: 'string'
            },
            {
                label: 'Type',
                field: 'type',
                type: 'string'
            },
            {
                label: 'Category',
                field: 'category',
                type: 'string'
            },
            {
                label: 'Subcategory',
                field: 'subcategory',
                type: 'string',
                width: 50
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
        // headers: ['endpoint', 'name', 'type', 'category', 'subcategory'],
        rows: [],
        selectedRows: []
    })
    const adminCtx = useContext(AdminContext)

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
        setStates({...states, ...{ rows: adminCtx.adminContext.data }})
        console.log('admin data: ', adminCtx.adminContext.data)
    }, [adminCtx.adminContext])

    // console.log('states rows: ', states.rows)

    return (
        <SubPageslayout
            navAnchor={'left'}
            navMenu={subpages}>
            <Grid item xs={12}>
                <Container maxWidth="lg" style={{ paddingTop: 20 }}>
                    <InteractiveTable
                        hasCheckBox={ true }
                        headers={ states.headers }
                        rows={ states.rows }
                        onSelect={(selected) => {
                            setStates({...states, ...{ selectedRows: selected}})
                        }}
                        onInteract={(e) => {
                            // console.log('interact: ', e)
                            if (e.col && e.col.field && e.col.field === 'edit') {
                                setStates({...states, ...{
                                    itemDialog: true,
                                    itemDialogMode: 'edit',
                                    itemDialogData: e.row
                                }})
                            }
                        }}
                        rightSideComponents={
                            <>
                                <Tooltip style={{ float: 'right' }} placement='bottom-end'
                                    title={
                                        <Typography style={{ padding: 10 }} variant='body1'>
                                            This will add a new endpoint to the list.
                                        </Typography>
                                    }>
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        style={{ marginRight: 5 }}
                                        // startIcon={ <AddIcon /> }
                                        onClick={() => {
                                            setStates({...states, ...{
                                                itemDialog: true,
                                                itemDialogMode: 'add',
                                                itemDialogData: {}
                                            }})
                                        }}><AddIcon /></Button>
                                </Tooltip>
                                <Tooltip style={{ float: 'right' }} placement='bottom-end'
                                    title={
                                        <Typography style={{ padding: 10 }} variant='body1'>
                                            This will add multiple endpoints in the list through data import.
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
                                            This will delete all selected endpoints from the list.
                                        </Typography>
                                    }>
                                    <Button
                                        color='primary'
                                        variant='outlined'
                                        style={{ marginRight: 5 }}
                                        // startIcon={ <DeleteIcon /> }
                                        onClick={() => {
                                            console.log('Delete selected: ', states.selectedRows)
                                        }}><DeleteIcon /></Button>
                                </Tooltip>
                                <Tooltip style={{ float: 'right' }} placement='bottom-end'
                                    title={
                                        <Typography style={{ padding: 10 }} variant='body1'>
                                            Endpoints will be the bases for user access rights. The more
                                            endpoints a role has, the more access it has on the system.
                                        </Typography>
                                    }>
                                    <InfoIcon color='primary' />
                                </Tooltip>
                            </>
                        } />
                    <ConfirmDialogBox
                        title={ states.itemDialogMode === 'add'? 'Add Endpoint': 'Edit Endpoint' }
                        open={ states.itemDialog }

                        strictClose={ true }         // will enable/disable close event from the dialog background
                        proceedConfirmation={ true } // a confirm dialog before proceeding
                        proceedLabel={ 'Proceed' }   // button proceed label
                        onProceed={async () => {     // method to run when proceeding
                            console.log('will proceed!')
                            await utils.waitFor(2)
                            return true
                        }}
                        onClose={() => {
                            setStates({...states, ...{ itemDialog: false }})
                        }}>
                        <Typography>add/ edit</Typography>
                    </ConfirmDialogBox>
                    <FullScreenDialogBox
                        title={ 'Import Endpoints from Excel' }
                        open={ states.bulkImportDialog }
                        onClose={() => {
                            setStates({...states, ...{ bulkImportDialog: false }})
                        }}>
                        <Container
                            style={{ marginTop: 20 }}
                            maxWidth="lg">
                            <ImportData
                                // headers={['Endpoint', 'Name', 'Type', 'Category', 'Subcategory']} />
                                headers={['name', 'calories', 'fat', 'carb', 'protein']} />
                        </Container>
                    </FullScreenDialogBox>
                </Container>
            </Grid>
        </SubPageslayout>
    )
}

export default AppEndpoints