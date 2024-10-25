import React, { useState } from 'react';
import { Button, Typography, TextField } from '@mui/material';

import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import RoleService from './roleService';
import { IRole, TRoleScope, roleScopes } from '../../types/role';
import AppUtils from '../../utils/appUtils';

export const RoleCreateForm = () => {
    const [pageState, setPageState] = useState({
        disableSaveButton: false
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [role, setRole] = useState<IRole>({
        name: '',
        scope: roleScopes[0],
        description: '',
        level: 0,
        reqLimitPerSec: 120
    })

    const handleScopeSelectionChange = (event: SelectChangeEvent) => {
        const scope = event.target.value as TRoleScope
        setRole({...role, ...{scope}})
    }

    const handleTextFieldChange = (field:string, value:string) => {
        setRole({...role, ...{[field]: value}})
    }

    const onCreate = async () => {
        const newRole:IRole = {
            ...role,
            ...{
                name: role.name,
                scope: role.scope,
                description: role.description,
                level: role.level,
                reqLimitPerSec: role.reqLimitPerSec
            }
        }
        console.log('create update: ', newRole)
        setPageState({disableSaveButton: true})

        // send update data to the api
        try {
            const roleResp = await RoleService.createRole(newRole)
            setRole(roleResp.data)

            // re load app refs
            await AppUtils.loadAppRefsData()

            setInfoAndErrors({
                ...{infoMessages: ['Successfull Creation']},
                ...{errorMessages: []}
            })
        } catch (err:any) {
            // error while updating
            // log to the UI
            setInfoAndErrors({
                ...infoAndErrors,
                ...{errorMessages: [err?.response?.data?.message || '']}
            })
            setPageState({disableSaveButton: false})
        }
    }

    const itemSx = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        paddingLeft: '20px'
    }

    return (
        <>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Name</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <TextField
                        fullWidth
                        defaultValue={role.name}
                        onChange={(e) => handleTextFieldChange('name', e.target.value)} />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} md={3} sx={itemSx}>
                    <Typography variant="subtitle1">Scope</Typography>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Select
                        fullWidth
                        value={role.scope}
                        onChange={handleScopeSelectionChange}>
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
                        defaultValue={role.description}
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
                        defaultValue={role.level}
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
                        defaultValue={role.reqLimitPerSec}
                        onChange={(e) => handleTextFieldChange('reqLimitPerSec', e.target.value)} />
                </Grid>
            </Grid>
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
                    startIcon={<AdminPanelSettingsIcon />}
                    onClick={onCreate}
                    disabled={pageState.disableSaveButton}>
                    Create
                </Button>
            </Grid>
        </>
    )
}

export default RoleCreateForm