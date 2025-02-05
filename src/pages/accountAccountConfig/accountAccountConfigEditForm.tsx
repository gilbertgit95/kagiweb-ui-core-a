import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import WorkspaceSelectorComponent from './workspaceSelectorComponent';
import RoleSelectorComponent from './roleSelectorComponent';
import AccountAccountConfigService from './accountAccountConfigService';
import { IAccount, IAccountConfig, TAccountConfigType, accountConfigTypes } from '../../types/account';
import { IAccessInfo } from '../../stores/signedInAccountSlice';

interface props {
    account?: IAccount,
    accountConfigId?: string,
    getCompleteInfo: (accountId:string) => Promise<{data:IAccessInfo}>,
    updateFunc: (accountId:string, accountConfigId:string, value:string) => Promise<{data:IAccountConfig}>,
    updated?: (accountId:string|undefined, accountConfig:IAccountConfig|undefined) => void
}

const AccountAccountConfigEditForm = ({account, accountConfigId, getCompleteInfo, updateFunc, updated}:props) => {
    const [accountConfig, setAccountConfig] = useState<IAccountConfig & {createdAt?:Date, updatedAt?:Date} | undefined>()
    const [updatedAccountConfig, setUpdatedAccountConfig] = useState<IAccountConfig>({
        key: '',
        value: '',
        type: accountConfigTypes[0] as TAccountConfigType
    })
    const [configAndErrors, setConfigAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [completeInfo, setCompleteInfo] = useState<IAccessInfo>({})

    const handleTextFieldChange = (field:string, value:string) => {
        setUpdatedAccountConfig({...updatedAccountConfig, ...{[field]: value}})
    }

    const handleTypeSelectionChange = (event: SelectChangeEvent) => {
        const type = event.target.value as TAccountConfigType
        setUpdatedAccountConfig({...updatedAccountConfig, ...{type}})
    }

    const onUpdate = async () => {
        if (!accountConfig) return

        const updateData:IAccountConfig = {
            _id: updatedAccountConfig._id,
            key: updatedAccountConfig.key === accountConfig.key? accountConfig.key: updatedAccountConfig.key,
            value: updatedAccountConfig.value === accountConfig.value? accountConfig.value: updatedAccountConfig.value,
            type: updatedAccountConfig.type === accountConfig.type? accountConfig.type: updatedAccountConfig.type
        }
        console.log('save update: ', updateData)

        // // send update data to the api
        if (account?._id) {
            try {
                const reqResp = await updateFunc(account._id, updateData._id!, updateData.value)
                setConfigAndErrors({
                    ...{infoMessages: ['Successfull Update']},
                    ...{errorMessages: []}
                })
                if (updated) updated(account?._id, reqResp?.data)
            } catch (err:any) {
                // error while updating
                // log to the UI
                setConfigAndErrors({
                    ...configAndErrors,
                    ...{errorMessages: [err?.response?.data?.message || '']}
                })
            }
        }
    }

    useEffect(() => {
        const init = async () => {
            if (account && account.accountConfigs && accountConfigId) {
                const accInf = AccountAccountConfigService.getAccountConfigById(account, accountConfigId)
                setAccountConfig(accInf)
                if (accInf) {
                    setUpdatedAccountConfig(accInf)
                } else {
                    setConfigAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: ['Config does not exist on this account']}
                    })
                }
            }
        }

        init()

    }, [account, accountConfigId])

    useEffect(() => {
        const init = async () => {
            if (account && account._id) {
                try {
                const compInfo = await getCompleteInfo(account._id!)
                setCompleteInfo(compInfo.data)
                } catch {
                    setConfigAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: ['Error while fetching Account complete info']}
                    })
                }
            }
        }

        init()

    }, [account])

    const itemSx = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        paddingLeft: '20px'
    }

    const hasChanges = (() => {
        if (!accountConfig) return false

        return !(
            accountConfig.key !== updatedAccountConfig.key ||
            accountConfig.value !== updatedAccountConfig.value ||
            accountConfig.type !== updatedAccountConfig.type
        )
    })()

    return account? (
        <>
            {
                accountConfig? (
                    <>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Type</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <Select
                                    fullWidth
                                    disabled
                                    value={updatedAccountConfig?.type}
                                    onChange={handleTypeSelectionChange}>
                                    {
                                        accountConfigTypes.map((item, index) => (
                                            <MenuItem key={index} value={item}>{ item }</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Key</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                <TextField
                                    fullWidth
                                    disabled
                                    defaultValue={updatedAccountConfig?.key || ''}
                                    onChange={(e) => handleTextFieldChange('key', e.target.value)} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4} md={3} sx={itemSx}>
                                <Typography variant="subtitle1">Value</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                {
                                    (accountConfig.key === 'default-role')? (
                                        <RoleSelectorComponent
                                            defaultRole={completeInfo.appRole}
                                            assignedRoles={completeInfo.appRoles || []}
                                            onSelect={(sel) => handleTextFieldChange('value', sel)} />
                                    ): null
                                }
                                {
                                    (accountConfig.key === 'default-workspace')? (
                                        <WorkspaceSelectorComponent
                                            accountData={completeInfo.accountData}
                                            defaultWorkspace={completeInfo.workspace}
                                            ownWorkspaces={completeInfo.workspaces || []}
                                            externalWorkspaces={completeInfo.externalWorkspaces || []}
                                            onSelect={(sel) => handleTextFieldChange('value', sel)} />
                                    ): null
                                }
                                {
                                    (!(new Set(['default-role', 'default-workspace'])).has(accountConfig.key))? (
                                        <TextField
                                            fullWidth
                                            defaultValue={updatedAccountConfig?.value || ''}
                                            onChange={(e) => handleTextFieldChange('value', e.target.value)} />
                                    ): null
                                }
                                {/* <TextField
                                    fullWidth
                                    defaultValue={updatedAccountConfig?.value || ''}
                                    onChange={(e) => handleTextFieldChange('value', e.target.value)} /> */}
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
                    <ResponseStatus {...configAndErrors} />
                </Grid>
            </Grid>
            <Grid container item xs={12} sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                <Button
                    startIcon={<EditIcon />}
                    onClick={onUpdate}
                    disabled={hasChanges || !accountConfig}>
                    Update
                </Button>
            </Grid>
        </>
    ): null
}

export default AccountAccountConfigEditForm