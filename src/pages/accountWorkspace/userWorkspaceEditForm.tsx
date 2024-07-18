import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography, TextField, Switch } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import UserWorkspaceService from './userWorkspaceService';
import { IAccount, IWorkspace } from '../../types/account';

interface props {
    user?: IAccount,
    workspaceId?: string,
    updateFunc: (accountId:string, workspaceId:string, name:string, description:string, isActive:boolean, disabled:boolean) => Promise<{data:IWorkspace}>,
    updated?: (accountId:string|undefined, userInfo:IWorkspace|undefined) => void
}

const UserWorkspaceEditForm = ({user, workspaceId, updateFunc, updated}:props) => {
    const [workspace, setWorkspace] = useState<IWorkspace & {createdAt?:Date, updatedAt?:Date} | undefined>()
    const [updatedWorkspace, setUpdatedWorkspace] = useState<IWorkspace>({
        name: '',
        description: '',
        isActive: false,
        disabled: false
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    const handleTextFieldChange = (field:string, value:string) => {
        setUpdatedWorkspace({...updatedWorkspace, ...{[field]: value}})
    }

    const handleSwitchChange = (field:string, event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.checked)
        setUpdatedWorkspace({...updatedWorkspace, ...{[field]: event.target.checked}})
    }

    const onUpdate = async () => {
        if (!workspace) return

        const updateData = {
            _id: updatedWorkspace._id,
            name: updatedWorkspace.name,
            description: updatedWorkspace.description,
            isActive: updatedWorkspace.isActive,
            disabled: updatedWorkspace.disabled
        }
        console.log('save update: ', updateData)

        // // send update data to the api
        if (user?._id && updatedWorkspace) {
            try {
                const reqResp = await updateFunc(
                    user._id,
                    workspaceId || '',
                    updatedWorkspace.name,
                    updatedWorkspace.description || '',
                    Boolean(workspace.isActive),
                    Boolean(updatedWorkspace.disabled)
                )
                setInfoAndErrors({
                    ...{infoMessages: ['Successfull Update']},
                    ...{errorMessages: []}
                })
                if (updated) updated(user?._id, reqResp?.data)
            } catch (err:any) {
                // error while updating
                // log to the UI
                setInfoAndErrors({
                    ...infoAndErrors,
                    ...{errorMessages: [err?.response?.data?.message || '']}
                })
            }
        }
    }

    useEffect(() => {
        const init = async () => {
            if (user && user.workspaces && workspaceId) {
                const contactInf = UserWorkspaceService.getWorkspaceById(user, workspaceId)
                setWorkspace(contactInf)
                if (contactInf) {
                    setUpdatedWorkspace(contactInf)
                } else {
                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: ['Workspace does not exist on this user']}
                    })
                }
            }
        }

        init()

    }, [user, workspaceId])

    const itemSx = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        paddingLeft: '20px'
    }

    const hasChanges = (() => {
        if (!workspace) return false

        return !(
            workspace.name !== updatedWorkspace.name ||
            workspace.description !== updatedWorkspace.description ||
            workspace.disabled !== updatedWorkspace.disabled
        )
    })()

    return user? (
        <>
            {
                workspace? (
                    <>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Name</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <TextField
                                    fullWidth
                                    defaultValue={updatedWorkspace?.name || ''}
                                    onChange={(e) => handleTextFieldChange('name', e.target.value)} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Description</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <TextField
                                    fullWidth
                                    defaultValue={updatedWorkspace?.description || ''}
                                    onChange={(e) => handleTextFieldChange('description', e.target.value)} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Disabled</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <Switch
                                    onChange={e => handleSwitchChange('disabled', e)}
                                    checked={updatedWorkspace.disabled} />
                            </Grid>
                        </Grid>
                    </>
                ):null
            }
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    {/* <Typography variant="subtitle1">Tags</Typography> */}
                </Grid>
                <Grid item xs={8} md={9}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
            <Grid container item xs={12} sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                <Button
                    startIcon={<EditIcon />}
                    onClick={onUpdate}
                    disabled={hasChanges || !workspace}>
                    Update
                </Button>
            </Grid>
        </>
    ): null
}

export default UserWorkspaceEditForm