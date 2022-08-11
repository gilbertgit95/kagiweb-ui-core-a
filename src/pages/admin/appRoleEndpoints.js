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
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import AccessibilityIcon from '@mui/icons-material/Accessibility'
import WebhookIcon from '@mui/icons-material/Webhook'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import InfoIcon from '@mui/icons-material/Info'
import EditIcon from '@mui/icons-material/Edit'

import InteractiveTable from '../../common/tables/interactiveTable'
import ImportData from '../../common/inputs/importData'
import FullScreenDialogBox from '../../common/popups/fullScreenDialogBox'
import TransferSelection from '../../common/inputs/transferSelection'
// import ConfirmDialogBox from '../../common/popups/confirmDialogBox'

// import AccountContext from '../../common/contexts/accountContext'
import AdminContext from '../../common/contexts/adminContext'
import GlobalDialogContext from '../../common/contexts/globalDialogContext'
import utils from '../../common/utilities'
import LoadingButton from '../../common/atomicComponents/loadingButton'

const AppRoleEndpoints = (props) => {
    const [states, setStates] = useState({
        isLoading: true,
        isSaving: false,
        itemDialogData: {},
        itemDialog: false,

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
                <Container maxWidth='lg' style={{ paddingTop: 20 }}>
                    <InteractiveTable
                        headers={ states.headers }
                        rows={ states.rows }
                        onInteract={(e) => {
                            // console.log('interact: ', e)
                            if (e.col && e.col.field && e.col.field === 'edit') {
                                setStates({...states, ...{
                                    isSaving: false,
                                    itemDialog: true,
                                    itemDialogData: e.row
                                }})
                            }
                        }}
                        rightSideComponents={
                            <>
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
                    <FullScreenDialogBox
                        title={ 'Update Role Endpoints' }
                        open={ states.itemDialog }
                        onClose={() => {
                            setStates({...states, ...{ itemDialog: false }})
                        }}>
                        <Container
                            style={{ marginTop: 20 }}
                            maxWidth='md'>
                            
                            <Grid container>
                                <Grid item xs={6}>
                                    <WebhookIcon color='primary' style={{width: 17}} />
                                    <Typography variant='h6' component='span' color='primary' style={{ marginLeft: 10, marginBottom: 20}}>
                                        { states.itemDialogData? states.itemDialogData.name: '' }
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box
                                        style={{ textAlign: 'right' }}>
                                        <Button
                                            style={{ marginRight: 5 }}
                                            onClick={() => {
                                                setStates({...states, ...{ itemDialog: false }})
                                            }}
                                            variant='outlined'>
                                            Cancel
                                        </Button>
                                        <LoadingButton
                                            variant='contained'
                                            isLoading={ states.isSaving }
                                            onClick={async () => {
                                                let confirm = await globalDialogCtx.showDialog({
                                                    type: 'confirm',
                                                    title: 'Confirm',
                                                    color: 'secondary',
                                                    message: 'This will update this roles accessability. Do you want to proceed?'
                                                })
                                                if (confirm.status != 'proceed') return

                                                setStates({...states, ...{ isSaving: true }})
                                                await utils.waitFor(2)
                                                setStates({...states, ...{ itemDialog: false, isSaving: false }})
                                            }}>
                                            Save
                                        </LoadingButton>
                                    </Box>
                                </Grid>
                            </Grid>
                            <TransferSelection
                                style={{ marginTop: 5 }}
                                onChange={(e) => {
                                    console.log('on transfer change: ', e)
                                }}
                                assignedItems={
                                    states.itemDialogData.endpoints?
                                        states.itemDialogData.endpoints.map(item => ({
                                            label: `${ item.type } | ${ item.category } | ${ item.subcategory }`,
                                            secondaryLabel: item.endpoint,
                                            value: item.id
                                        })):[]
                                }
                                referenceItems={
                                    states.endpoints?
                                        states.endpoints.map(item => ({
                                            label: `${ item.type } | ${ item.category } | ${ item.subcategory }`,
                                            secondaryLabel: item.endpoint,
                                            value: item.id
                                        })): []
                                } />
                        </Container>
                    </FullScreenDialogBox>
                </Container>
            </Grid>
        </SubPageslayout>
    )
}

export default AppRoleEndpoints