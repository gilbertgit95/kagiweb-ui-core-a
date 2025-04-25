import React, { useState, useEffect } from 'react';
import { Button, Typography, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import { IRole, roleScopes } from '../../types/role';
import AppUtils from '../../utils/appUtils';

interface Props {
    roleId: string | undefined,
    getFunc: (accountId:string) => Promise<{data:IRole}>,
    updateFunc: (updateData:IRole) => Promise<{data:IRole}>,
    updated?: (user:IRole|undefined) => void
}

export  const RoleEditForm = ({roleId, getFunc, updateFunc}:Props) => {
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [role, setRole] = useState<IRole | undefined>()
    const [updatedRole, setUpdatedRole] = useState<IRole>({
        name: '',
        scope: roleScopes[0],
        description: '',
        level: 0,
        reqLimitPerSec: 120
    })

    const handleTextFieldChange = (field:string, value:string) => {
        setUpdatedRole({...updatedRole, ...{[field]: value}})
    }

    const onUpdate = async () => {
        const updateData:IRole = {
            ...role,
            ...{
                name: updatedRole.name,
                scope: updatedRole.scope,
                description: updatedRole.description,
                level: updatedRole.level,
                reqLimitPerSec: updatedRole.reqLimitPerSec
            }
        }
        console.log('save update: ', updateData)

        // send update data to the api
        try {
            const roleResp = await updateFunc(updateData)
            setRole(roleResp.data)
            setUpdatedRole(roleResp.data)

            // re load app refs
            await AppUtils.loadAppRefsData()

            setInfoAndErrors({
                ...{infoMessages: ['Successfull Update']},
                ...{errorMessages: []}
            })
        } catch (err:any) {
            // error while updating
            // log to the UI
            setInfoAndErrors({
                ...infoAndErrors,
                ...{errorMessages: [err?.response?.data?.message || '']}
            })
        }
    }
    
    useEffect(() => {
        const init = async () => {
            console.log('Edit: ', roleId)

            if (roleId) {
                try {
                    const roleResp = await getFunc(roleId)
                    setRole(roleResp.data)
                    setUpdatedRole(roleResp.data)
                } catch (err:any) {
                    // error fetching role
                    // log to the UI
                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: [err?.response?.data?.message || '']}
                    })
                }
            }
        }

        init()
    }, [roleId, getFunc])

    const itemSx = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        paddingLeft: '20px'
    }

    const hasChanges = (() => {
        if (!role) return false

        return !(
            role.name !== updatedRole.name ||
            role.description !== updatedRole.description ||
            role.level !== updatedRole.level ||
            role.reqLimitPerSec !== updatedRole.reqLimitPerSec
        )
    })()

    return (
        <>
            {
                role? (
                    <>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Name</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <TextField
                                    fullWidth
                                    defaultValue={updatedRole.name}
                                    onChange={(e) => handleTextFieldChange('name', e.target.value)} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Scope</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <Select
                                    disabled
                                    fullWidth
                                    value={role.scope}>
                                    {
                                        roleScopes.map((item, index) => (
                                            <MenuItem key={index} value={item}>{ item }</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Description</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <TextField
                                    fullWidth
                                    multiline
                                    maxRows={4}
                                    defaultValue={updatedRole.description}
                                    onChange={(e) => handleTextFieldChange('description', e.target.value)}/>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Level</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <TextField
                                    fullWidth
                                    defaultValue={updatedRole.level}
                                    onChange={(e) => handleTextFieldChange('level', e.target.value)} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Request Rate Limit</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <TextField
                                    fullWidth
                                    defaultValue={updatedRole.reqLimitPerSec}
                                    onChange={(e) => handleTextFieldChange('reqLimitPerSec', e.target.value)} />
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
                    disabled={hasChanges || !role}>
                    Update
                </Button>
            </Grid>
        </>
    )
}

export default RoleEditForm