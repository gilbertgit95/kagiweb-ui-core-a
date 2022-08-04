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

const AppUsers = (props) => {
    const usernameRef = useRef()
    const userRoleRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    const [states, setStates] = useState({
        isLoading: true,
        itemDialogMode: 'add', // add || edit
        itemDialogData: {},
        itemDialog: false,
        bulkImportDialog: false,

        headers: [
            {
                label: 'Username',
                field: 'username',
                type: 'string'
            },
            {
                label: 'Role',
                field: '__role',
                type: 'string'
            },
            {
                label: '',
                field: 'edit_credential',
                width: 60,
                render: (renderProps = {}) => {
                    return (
                        <Button
                            {...renderProps}
                            startIcon={<EditIcon />}
                            size='small'>
                            Credential
                        </Button>
                    )
                },
                type: 'component'
            },
            {
                label: '',
                field: 'edit_profile',
                width: 60,
                render: (renderProps = {}) => {
                    return (
                        <Button
                            {...renderProps}
                            startIcon={<EditIcon />}
                            size='small'>
                            Profile
                        </Button>
                    )
                },
                type: 'component'
            },
            {
                label: '',
                field: 'edit_settings',
                width: 60,
                render: (renderProps = {}) => {
                    return (
                        <Button
                            {...renderProps}
                            startIcon={<EditIcon />}
                            size='small'>
                            Settings
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
        let users = adminCtx.adminContext.users
        users = users.map(user => {
            user['__role'] = user.role.name
            return user
        })
        setStates({...states, ...{ rows: users }})
        // console.log('admin data: ', adminCtx.adminContext.users)
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
                            // edit credential
                            if (e.col && e.col.field && e.col.field === 'edit_credential') {
                                setStates({...states, ...{
                                    itemDialog: true,
                                    itemDialogMode: 'edit',
                                    itemDialogData: e.row
                                }})
                            }

                            // edit profile
                            if (e.col && e.col.field && e.col.field === 'edit_profile') {
                                setStates({...states, ...{
                                    itemDialog: true,
                                    itemDialogMode: 'edit',
                                    itemDialogData: e.row
                                }})
                            }

                            // edit settings
                            if (e.col && e.col.field && e.col.field === 'edit_settings') {
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
                                            This will add a new user to the list.
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
                                            This will add multiple users in the list through data import.
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
                                            This will delete all selected users from the list.
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
                                            This are the accounts that can access the main resources of this application.
                                        </Typography>
                                    }>
                                    <InfoIcon color='primary' />
                                </Tooltip>
                            </>
                        } />
                    <NormalDialogBox
                        title={'Create user'}
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
                                    let msg = 'This will create new user to the list. Do you want to proceed?'

                                    let result = await globalDialogCtx.showDialog({
                                        title: 'Create user',
                                        type: 'confirm',
                                        message: msg
                                    })

                                    if (result.status !== 'proceed') return
                                    
                                    let dialogInputValues = {
                                        username:        usernameRef.current.value,
                                        role: userRoleRef.current.value
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
                                inputRef={ usernameRef }
                                label='Username' style={{ marginTop: 10 }} fullWidth size='small'/>
                            <TextField
                                inputRef={ userRoleRef }
                                label='Role' style={{ marginTop: 10 }} fullWidth size='small'/>
                            <TextField
                                inputRef={ passwordRef }
                                label='Password' style={{ marginTop: 10 }} fullWidth size='small'/>
                            <TextField
                                inputRef={ confirmPasswordRef }
                                label='Confirm Password' style={{ marginTop: 10 }} fullWidth size='small'/>
                        </Box>
                    </NormalDialogBox>
                    <FullScreenDialogBox
                        title={ 'Import users from Excel' }
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
                                headers={['name', 'role']} />
                        </Container>
                    </FullScreenDialogBox>
                </Container>
            </Grid>
        </SubPageslayout>
    )
}

export default AppUsers