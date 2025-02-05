import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import RoleSelectorComponent from '../accountAccountConfig/roleSelectorComponent';
import AccountAccountConfigService from './accountAccountRefAccountConfigService';
import AccountAccountRefService from '../accountAccountRef/accountAccountRefService';
import { IAccount, IAccountConfig, TAccountConfigType, accountConfigTypes } from '../../types/account';
import { IRole } from '../../types/role';
import { IAccessInfo } from '../../stores/signedInAccountSlice';
import { useAppSelector} from '../../stores/appStore';

interface props {
    account?: IAccount,
    accountRefId: string,
    accountConfigId?: string,
    getCompleteInfo: (accountId:string) => Promise<{data:IAccessInfo}>,
    updateFunc: (accountId:string, accountRefId:string, accountConfigId:string, value:string) => Promise<{data:IAccountConfig}>,
    updated?: (accountId:string|undefined, accountRefId:string, accountConfig:IAccountConfig|undefined) => void
}

const AccountAccountRefAccountConfigEditForm = ({account, accountRefId, accountConfigId, getCompleteInfo, updateFunc, updated}:props) => {
    const roles = useAppSelector(state => state.appRefs.roles) || []
    const [accountConfig, setAccountConfig] = useState<IAccountConfig & {createdAt?:Date, updatedAt?:Date} | undefined>()
    const [accRoles, setAccRoles] = useState<IRole[]>([])
    const [accRole, setAccRole] = useState<IRole | undefined>()
    const [updatedAccountConfig, setUpdatedAccountConfig] = useState<IAccountConfig>({
        key: '',
        value: '',
        type: accountConfigTypes[0] as TAccountConfigType
    })
    const [configAndErrors, setConfigAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    // const [completeInfo, setCompleteInfo] = useState<IAccessInfo>({})

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
                const reqResp = await updateFunc(account._id, accountRefId, updateData._id!, updateData.value)
                setConfigAndErrors({
                    ...{infoMessages: ['Successfull Update']},
                    ...{errorMessages: []}
                })
                if (updated) updated(account?._id, accountRefId, reqResp?.data)
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
            if (roles && account && accountConfigId) {
                const appRolesMap = roles? roles.reduce<{[key:string]:IRole}>((acc, item) => {
                    if (item._id) acc[item._id] = item
                    return acc
                }, {}) :{}

                // get account ref
                const accountRef = account? AccountAccountRefService.getAccountAccountRefById(account, accountRefId): null
                const accRefRoles = accountRef?.rolesRefs?.map(item => appRolesMap[item.roleId || '']).filter(item => item) || []

                // get account aconfig
                const accConfig = AccountAccountConfigService.getAccountAccountRefAccountConfigById(account, accountRefId, accountConfigId)
                const accRefConf = accRefRoles?.filter(item => accConfig?.value === item._id)

                console.log(accRefRoles, accRefConf?.length? accRefConf[0]: undefined)

                setAccRole(accRefConf?.length? accRefConf[0]: undefined)
                setAccRoles(accRefRoles)
                setAccountConfig(accConfig)

                if (accConfig) {
                    setUpdatedAccountConfig(accConfig)
                } else {
                    setConfigAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: ['Config does not exist on this account']}
                    })
                }
            }
        }

        init()

    }, [roles, account, accountRefId, accountConfigId])

    // useEffect(() => {
    //     const init = async () => {
    //         if (account && account._id) {
    //             try {
    //             const compInfo = await getCompleteInfo(account._id!)
    //             setCompleteInfo(compInfo.data)
    //             } catch {
    //                 setConfigAndErrors({
    //                     ...{infoMessages: []},
    //                     ...{errorMessages: ['Error while fetching Account complete info']}
    //                 })
    //             }
    //         }
    //     }

    //     init()

    // }, [account])

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
                                            defaultRole={accRole}
                                            assignedRoles={accRoles || []}
                                            onSelect={(sel) => handleTextFieldChange('value', sel)} />
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

export default AccountAccountRefAccountConfigEditForm