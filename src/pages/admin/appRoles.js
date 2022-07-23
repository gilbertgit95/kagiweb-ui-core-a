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
import NormalDialogBox from '../../common/popups/normalDialogBox'
// import ConfirmDialogBox from '../../common/popups/confirmDialogBox'

// import AccountContext from '../../common/contexts/accountContext'
import AdminContext from '../../common/contexts/adminContext'
import GlobalDialogContext from '../../common/contexts/globalDialogContext'
import utils from '../../common/utilities'

const AppRoles = (props) => {
    const nameRef = useRef()
    const descRef = useRef()

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
        selectedRows: []
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
        setStates({...states, ...{ rows: adminCtx.adminContext.roles }})
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
                                            This will add a new role to the list.
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
                                            This will add multiple roles in the list through data import.
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
                                            This will delete all selected roles from the list.
                                        </Typography>
                                    }>
                                    <Button
                                        color='primary'
                                        variant='outlined'
                                        style={{ marginRight: 5 }}
                                        // startIcon={ <DeleteIcon /> }
                                        onClick={async () => {
                                            // console.log('Delete selected: ', states.selectedRows)
                                            if (states.selectedRows.length > 0) {
                                                let msg = states.selectedRows.length > 1? `${ states.selectedRows.length } items `: `1 item `


                                                msg += ' will be deleted from the list. Do you want to proceed?'
                                                let result = await globalDialogCtx.showDialog({
                                                    title: 'Delete',
                                                    type: 'confirm',
                                                    color: 'secondary',
                                                    message: msg
                                                })

                                                console.log('confirm status: ', result)
                                            } else {
                                                let msg = 'Please select items to delete.'

                                                let result = await globalDialogCtx.showDialog({
                                                    title: 'Alert',
                                                    type: 'alert',
                                                    message: msg
                                                })

                                                console.log('alert status: ', result)
                                            }
                                        }}><DeleteIcon /></Button>
                                </Tooltip>
                                <Tooltip style={{ float: 'right' }} placement='bottom-end'
                                    title={
                                        <Typography style={{ padding: 10 }} variant='body1'>
                                            Role will be the access package for a user.
                                        </Typography>
                                    }>
                                    <InfoIcon color='primary' />
                                </Tooltip>
                            </>
                        } />
                    <NormalDialogBox
                        title={ states.itemDialogMode === 'add'? 'Create Role': 'Update Role' }
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
                                    let isAdd = states.itemDialogMode === 'add'
                                    let msg = isAdd? 'This will create new Role to the list.': 'This will update changes to a Role.'
                                    msg += ' Do you want to proceed?'

                                    let result = await globalDialogCtx.showDialog({
                                        title: isAdd? 'Create Role': 'Update Role',
                                        type: 'confirm',
                                        message: msg
                                    })

                                    if (result.status !== 'proceed') return
                                    
                                    let dialogInputValues = {
                                        name:        nameRef.current.value,
                                        description: descRef.current.value
                                    }

                                    console.log(dialogInputValues)

                                }}>{ states.itemDialogMode === 'add'? 'Create': 'Update' }</Button>
                        }>
                        <Box
                            style={{
                                margin: 0,
                                padding: 0,
                                paddingRight: 20,
                                paddingLeft: 20,
                                width: '100%'
                            }}>
                            <TextField
                                inputRef={ nameRef }
                                defaultValue={states.itemDialogData? states.itemDialogData.name: ''}
                                label='Name' style={{ marginTop: 10 }} fullWidth size='small'/>
                            <TextField
                                inputRef={ descRef }
                                defaultValue={states.itemDialogData? states.itemDialogData.description: ''}
                                multiline rows={4} label='description' style={{ marginTop: 10 }} fullWidth size='small'/>
                        </Box>
                    </NormalDialogBox>
                    <FullScreenDialogBox
                        title={ 'Import Roles from Excel' }
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
                                headers={['name', 'description']} />
                        </Container>
                    </FullScreenDialogBox>
                </Container>
            </Grid>
        </SubPageslayout>
    )
}


export default AppRoles