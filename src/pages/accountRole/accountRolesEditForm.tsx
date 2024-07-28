import React, { useEffect, useState } from 'react';
import { Button, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AdjustIcon from '@mui/icons-material/Adjust';

import Check from '../../components/indicators/check';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import { useAppSelector} from '../../stores/appStore';
import AccountRoleService from './accountRoleService';
import { IAccount, IRoleRef } from '../../types/account';
import { IRole } from '../../types/role';
import AccountRolesAddForm from './accountRolesAddForm';

interface IProps {
    account: IAccount|undefined
    // updateFunc: (accountId:string, updateData:{_id: string, isActive?:boolean, roleId?:string}) => Promise<{data:IRoleRef}>,
    activateFunc: (accountId:string, roleRefId:string) => Promise<{data:IRoleRef}>,
    createFunc: (accountId:string, roleId:string) => Promise<{data:IRoleRef}>,
    deleteFunc: (accountId:string, roleRef:string) => Promise<{data:IRoleRef}>,
    onChange: () => void
}

interface IRoleRow {
    _id: string,
    name: string,
    description: string,
    level: number,
    absoluteAuthority: boolean,
    isActive: boolean
}

const AccountRolesEditForm = ({account, activateFunc, createFunc, deleteFunc, onChange}:IProps) => {
    const roles = useAppSelector(state => state.appRefs?.roles) || []
    const [data, setData] = useState<IRoleRow[]>([])
    const [currActive, setCurrActive] = useState<string | undefined>()
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    // selection
    const [tableSelection, setTableSelection] = useState<string[]>([])
    const [addTableSelection, setAddTableSelection] = useState<string[]>([])
    const [dialog, setDialog] = useState({
        addDialogOpen: false,
        removeDialogOpen: false,
        activateDialogOpen: false
    })

    const activateAccountRole = async () => {
        const sel:IRoleRef[] | undefined = account?.rolesRefs?.filter(item => item._id === tableSelection[0])
        if (account?._id && sel) {
            const selRef = sel[0]
            console.log('to activate: ', account?._id, sel)

            try {
                await activateFunc(account?._id, selRef?._id || '')

                setInfoAndErrors({
                    ...{infoMessages: [`Successfully activated the selected role.`]},
                    ...{errorMessages: []}
                })
            } catch (err:any) {
                setInfoAndErrors({
                    ...{infoMessages: []},
                    ...{errorMessages: [err?.response?.data?.message || '']}
                })
            }
            // close the dialog box
            setDialog({...dialog, ...{activateDialogOpen: false}})
            if (onChange) onChange()
        } else {
            setInfoAndErrors({
                ...{infoMessages: []},
                ...{errorMessages: ['No Item selected']}
            })
        }
    }

    const addRoles = async () => {
        // console.log('add this roles: ', addTableSelection)
        const totalItems = addTableSelection.length
        let savedItems = 0
        let error:string | undefined
        // call roleFeature service to add new roles to the role
        // loop to all roles id and post call to api
        for (let roleId of addTableSelection) {
            try {
                await createFunc(account?._id || '', roleId)
                savedItems++
            } catch (err:any) {
                error = err?.response?.data?.message || ''
                break
            }
        }

        // prompt
        if (error) {
            setInfoAndErrors({
                ...{infoMessages: []},
                ...{errorMessages: [`Out of ${ totalItems } role${ totalItems > 1? 's': '' }, ${ savedItems } has been saved.`]}
            })
        } else {
            setInfoAndErrors({
                ...{infoMessages: [`Successfully added ${ totalItems } role${ totalItems > 1? 's': '' }.`]},
                ...{errorMessages: []}
            })
        }
        // close the dialog box
        setDialog({...dialog, ...{addDialogOpen: false}})
        if (onChange) onChange()
    }

    const removeRoles = async () => {
        // console.log('selected items to remove: ', tableSelection)
        const totalItems = tableSelection.length
        let savedItems = 0
        let error:string | undefined
        // call roleFeature service to delete this list of roles refs
        // loop to all feature refs, then delete call to api
        for (let roleRef of tableSelection) {
            try {
                await deleteFunc(account?._id || '', roleRef)
                savedItems++
            } catch (err:any) {
                error = err?.response?.data?.message || ''
                break
            }
        }

        // prompt
        if (error) {
            setInfoAndErrors({
                ...{infoMessages: []},
                ...{errorMessages: [`Out of ${ totalItems } role${ totalItems > 1? 's': '' }, ${ savedItems } has been deleted.`]}
            })
        } else {
            setInfoAndErrors({
                ...{infoMessages: [`Successfully deleted ${ totalItems } role${ totalItems > 1? 's': '' }.`]},
                ...{errorMessages: []}
            })
        }
        // close the dialogbox
        setDialog({...dialog, ...{removeDialogOpen: false}})
        if (onChange) onChange()
    }

    useEffect(() => {
        const init = async () => {
            try {
                if (account && account.rolesRefs) {
                    const rolesMap:{[key: string]:IRole} = roles.reduce((acc:{[key:string]:IRole}, item:IRole) => {
                        if (item && item._id) acc[item._id] = item
                        return acc
                    }, {})
                    const tarnsformedData:IRoleRow[] = account.rolesRefs.map((item) => {
                        const role = rolesMap[item.roleId || '']
                        return {
                            _id: item._id || '',
                            name: role? role.name: '(None Existing Role)',
                            description: role? (role?.description || ''): 'This might have been deleted.',
                            level: role? role.level: -1,
                            absoluteAuthority: Boolean(role?.absoluteAuthority),
                            isActive: Boolean(item?.isActive)
                        }
                    })
                    // console.log(tarnsformedData)
                    setCurrActive(AccountRoleService.getActiveRoleRef(account)?._id)
                    setData(tarnsformedData)
                }

            } catch (err:any) {
                setInfoAndErrors({
                    ...{infoMessages: []},
                    ...{errorMessages: [err?.response?.data?.message || '']}
                })
            }
        }
        console.log('initiate account roles edit page')
        init()
    }, [account, roles])

    const colDef:IColDef[] = [
        {
            header: 'Name',
            field: 'name',
        },
        {
            header: 'Description',
            field: 'description',
        },
        {
            header: 'Level',
            field: 'level',
        },
        {
            header: 'Absolute Authority',
            field: 'absoluteAuthority',
            Component: (props:IRoleRow) => {
                return <Check value={props.absoluteAuthority} />
            }
        },
        {
            header: 'Active',
            field: 'isActive',
            Component: (props:IRoleRow) => {
                return <Check value={props.isActive} />
            }
        }
    ]

    const currActiveIsInSelected = (new Set(tableSelection)).has(currActive || '')

    return (
        <>
            <Grid item xs={12} style={{alignContent: 'right'}}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        disabled={!Boolean(tableSelection.length) || currActiveIsInSelected}
                        startIcon={<AdjustIcon />}
                        onClick={() => {
                            setDialog({...dialog, ...{activateDialogOpen: true}})
                        }}>
                        Activate Selected Role
                    </Button>
                    <Button
                        variant="text"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setDialog({...dialog, ...{addDialogOpen: true}})
                            setAddTableSelection([])
                        }}>
                        add
                    </Button>
                    <Button
                        color="secondary"
                        variant="text"
                        disabled={!Boolean(tableSelection.length) || currActiveIsInSelected}
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                            setDialog({...dialog, ...{removeDialogOpen: true}})
                        }}>
                        remove
                    </Button>
                    <Dialog
                        open={dialog.activateDialogOpen}
                        onClose={() => setDialog({...dialog, ...{activateDialogOpen: false}})}>
                        <DialogTitle>
                            Warning
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to activate selected role for { account?.username }?
                                This will deactivate currect active role.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setDialog({...dialog, ...{activateDialogOpen: false}})}>
                                no
                            </Button>
                            <Button color="secondary" onClick={activateAccountRole} autoFocus>
                                yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={dialog.addDialogOpen}
                        onClose={() => setDialog({...dialog, ...{addDialogOpen: false}})}>
                        <DialogTitle>
                            Add roles to { account?.username } Role
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please Select roles to add
                            </DialogContentText>
                            <AccountRolesAddForm
                                onSelect={(selectedData) => setAddTableSelection(selectedData)}
                                account={account} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setDialog({...dialog, ...{addDialogOpen: false}})}>
                                cancel
                            </Button>
                            <Button onClick={addRoles} autoFocus>
                                confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={dialog.removeDialogOpen}
                        onClose={() => setDialog({...dialog, ...{removeDialogOpen: false}})}>
                        <DialogTitle>
                            Warning
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to remove the selected role/s from { account?.username }?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setDialog({...dialog, ...{removeDialogOpen: false}})}>
                                no
                            </Button>
                            <Button color="secondary" onClick={removeRoles} autoFocus>
                                yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <PrimaryTable
                    enableSelection
                    onSelect={(selectedData) => setTableSelection(selectedData)}
                    columnDefs={colDef}
                    data={data} />
            </Grid>
            <Grid item xs={12}>
                <ResponseStatus {...infoAndErrors} />
            </Grid>
        </>
    )
}

export default AccountRolesEditForm