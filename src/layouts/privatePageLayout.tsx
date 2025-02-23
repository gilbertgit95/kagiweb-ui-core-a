import React, {useMemo, useEffect} from 'react';
import _ from 'lodash';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Typography, Divider, Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import { useAppDispatch, useAppSelector} from '../stores/appStore';
import { clearAccountData } from '../stores/signedInAccountSlice';
import { toggleTheme } from '../stores/appRefsSlice';

import AuthService from '../pages/auth/authService';
import OwnerService from '../pages/owner/ownerService';
import AccountAccountConfigService from '../pages/accountAccountConfig/accountAccountConfigService';
import PrimaryNav, { TLinkGroup } from '../components/navs/primaryNav';
import WorkspaceSelectorComponent from '../pages/accountAccountConfig/workspaceSelectorComponent';
import RoleSelectorComponent from '../pages/accountAccountConfig/roleSelectorComponent';

import appComponentsHandler from '../utils/appComponentsHandler';
import DataTransformer from '../utils/dataTransformer';
import AppUtils from '../utils/appUtils';
import { IFeature } from '../types/feature';
import { IAccessToken } from '../types/account';

const NavCustomEl = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const accountData = useAppSelector(state => state.signedInAccount?.accountData)
    const accessToken:(IAccessToken & {createdAt?:Date, updatedAt?:Date})|undefined = useAppSelector(state => state.signedInAccount?.accessToken)
    const userFeatures = useAppSelector(state => state.signedInAccount?.appFeatures) || []
    const activeNotifications = useAppSelector(state => state.signedInAccount?.activeNotifications) || 0
    const appTheme = useAppSelector(state => state.appRefs.appTheme)

    const defaultRole = useAppSelector(state => state.signedInAccount?.appRole)
    const assignedRoles = useAppSelector(state => state.signedInAccount?.appRoles) || []

    const defaultWorkspace = useAppSelector(state => state.signedInAccount?.workspace)
    const ownWorkspaces = useAppSelector(state => state.signedInAccount?.workspaces) || []
    const externalWorkspaces = useAppSelector(state => state.signedInAccount?.externalWorkspaces) || []

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [roleChangeAnchorEl, setRoleChangeAnchorEl] = React.useState<null | HTMLElement>(null)

    const customLinks:TLinkGroup[] = useMemo(() => {
        const filterType = 'ui-account-drawer'
        const featuresMap:{[key:string]:IFeature} = DataTransformer.generateFeaturesDictionary(userFeatures?.filter(item => item?.type === filterType) || [])
        const drawers = appComponentsHandler.navigations.privateNavs.sideNavs
        const filteredLinks = drawers.reduce<TLinkGroup[]>((acc, group) => {
            const grp = _.clone(group)
            grp.links = group.links?.filter(item => featuresMap[item.label])
            acc.push(grp)
            return acc
        }, [])
        return filteredLinks
    }, [userFeatures])

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLinkClick = (link:string) => {
        navigate(link)
        setAnchorEl(null)
    }

    const handleThemeToggle = (theme:string) => {
        const updatedTheme = theme === 'light'? 'dark': 'light'
        dispatch(toggleTheme())
        localStorage.setItem(appComponentsHandler.appConfig.AppThemeKey, updatedTheme)
    }

    const handleWorkspaceSelection = async (sel:string) => {
        if (!accountData) return
        // get config id using key
        const config = AccountAccountConfigService.getAccountConfigByKey(accountData, 'default-workspace')

        if (!config) return
        await OwnerService.updateAccountConfig('', config._id!, sel)
        await AppUtils.loadSigninAccountData()
    }

    const handleRoleSelection = async (sel:string) => {
        if (!accountData) return
        // get config id using key
        const config = AccountAccountConfigService.getAccountConfigByKey(accountData, 'default-role')

        if (!config) return
        await OwnerService.updateAccountConfig('', config._id!, sel)
        await AppUtils.loadSigninAccountData()
    }

    const handleSignout = async () => {
        try {
            await AuthService.signout()
        } catch (err) {
            console.log('Token has not been remove successfully from the database end, but will be cleared from the browser storage.')
        }
        AuthService.saveSignedAccount({
            nameId: accountData?.nameId || '',
            status: 'no-token',
            method: 'app-auth',
            dateCreated: undefined,
            expirationDate: undefined,
            token: undefined
        })
        localStorage.removeItem(appComponentsHandler.appConfig.TokenKey)
        dispatch(clearAccountData())
        window.location.replace('/signin')
    }

    const handleSwitchAccount = () => {
        // save account info to memory
        AuthService.saveSignedAccount({
            nameId: accountData?.nameId || '',
            status: 'active-token',
            method: 'app-auth',
            dateCreated: accessToken?.createdAt,
            expirationDate: accessToken?.expTime,
            token: localStorage.getItem(appComponentsHandler.appConfig.TokenKey) || undefined
        })
        // clear auth key
        // redirect to signedinAccounts
        localStorage.removeItem(appComponentsHandler.appConfig.TokenKey)
        // dispatch(clearAccountData())
        window.location.replace('/signedAccounts')
    }

    return (
        <>
            <Box component={'div'} style={{width: '100%'}}>
                {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    { appComponentsHandler.appConfig.AppName }
                </Typography> */}
                <WorkspaceSelectorComponent
                    style={{color: 'white'}}
                    accountData={accountData}
                    defaultWorkspace={defaultWorkspace}
                    ownWorkspaces={ownWorkspaces}
                    externalWorkspaces={externalWorkspaces}
                    onSelect={handleWorkspaceSelection} />
            </Box>
            <Box component={'div'}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit">
                    <Badge badgeContent={activeNotifications} color="secondary" variant="dot" >
                        <AccountCircle />
                    </Badge>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>
                    <Box>
                        <MenuItem onClick={() => handleLinkClick('/owner/view')}>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="subtitle1">{ accountData && accountData.nameId? accountData.nameId: '' }</Typography>
                                <Typography variant="caption" color="primary">{ defaultRole?.name }</Typography>
                            </ListItemText>
                        </MenuItem>
                        {/* <Divider /> */}
                        <MenuItem onClick={handleSwitchAccount}>
                            <ListItemIcon>
                                <CompareArrowsOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="caption">Switch Account</Typography>
                            </ListItemText>
                        </MenuItem>
                        <Divider />
                        {/* custom menu items */}
                        {
                            customLinks?.map((lg, lgIndex) => {
                                if (!lg.links?.length) return null
                                return (
                                    <React.Fragment key={lgIndex}>
                                        <Typography color="primary" sx={{margin: '10px'}}>{ lg.label }</Typography>
                                        {
                                            lg.links?.map((item, index) => {
                                                return (
                                                    <MenuItem
                                                        key={index}
                                                        onClick={async () => {
                                                            if (item.action) await item.action()
                                                            if (item.url) window.location.replace(item.url)
                                                        }}>
                                                        {
                                                            item.Icon? (
                                                                <ListItemIcon>
                                                                    <item.Icon />
                                                                </ListItemIcon>
                                                            ): null
                                                        }
                                                        <ListItemText>{ item.label }</ListItemText>
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                        { (customLinks?.length === (lgIndex + 1))? null: <Divider /> }
                                    </React.Fragment>
                                )
                            })
                        }
                        {/* default account actions */}
                        { customLinks?.length? <Typography color="primary" sx={{margin: '10px'}}>Default Actions</Typography>: null }
                        <MenuItem onClick={() => handleLinkClick('/owner/view/notifications')}>
                            <ListItemIcon>
                                <Badge badgeContent={activeNotifications} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </ListItemIcon>
                            <ListItemText>Notifications</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={(e) => setRoleChangeAnchorEl(e.currentTarget)}>
                            <ListItemIcon>
                                <AdminPanelSettingsIcon />
                            </ListItemIcon>
                            <ListItemText>Change Role</ListItemText>
                        </MenuItem>
                        <RoleSelectorComponent
                            defaultRole={defaultRole}
                            assignedRoles={assignedRoles}
                            anchorEl={roleChangeAnchorEl}
                            onClose={() => setRoleChangeAnchorEl(null)}
                            onSelect={handleRoleSelection} />
                        <MenuItem onClick={() => handleThemeToggle(appTheme)}>
                            <ListItemIcon>
                                { appTheme === 'dark'? <DarkModeIcon />: <WbSunnyIcon /> }
                            </ListItemIcon>
                            <ListItemText>Toggle Theme</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={handleSignout}>
                            <ListItemIcon>
                                <PowerSettingsNewIcon />
                            </ListItemIcon>
                            <ListItemText>Signout</ListItemText>
                        </MenuItem>
                    </Box>
                </Menu>
            </Box>
        </>
    )
}


const PrivatePageLayout = () => {
    const location = useLocation();
    const userFeatures:IFeature[] = useAppSelector(state => state.signedInAccount?.appFeatures) || []

    const links:TLinkGroup[] = useMemo(() => {
        const filterType = 'ui-main-drawer'
        const featuresMap:{[key:string]:IFeature} = DataTransformer.generateFeaturesDictionary(userFeatures?.filter(item => item?.type === filterType) || [])
        const drawers = appComponentsHandler.navigations.privateNavs.mainNavs
        const filteredLinks = drawers.reduce<TLinkGroup[]>((acc, group) => {
            const grp = _.clone(group)
            grp.links = group.links?.filter(item => featuresMap[item.label])
            acc.push(grp)
            return acc
        }, [])
        // console.log('featuresMap: ', featuresMap)
        // console.log('filteredLinks: ', filteredLinks)
        // console.log('use memo was triggered', filteredLinks, userFeatures.length)
        return filteredLinks
    }, [userFeatures])

    useEffect(() => {
        const loadData = async () => {
            // console.log('private page layout!!!, location has change', location)

            const {accountId, workspaceId} = AppUtils.parseAccountAndWorspaceId(location.pathname)
            if (accountId) {
                await AppUtils.loadAccountAccessInfo(accountId)
            } else {
                await AppUtils.loadAccountAccessInfo(accountId || '', true)
            }

            if (accountId && workspaceId) {
                await AppUtils.loadAccountWorkspaceAccessInfo(accountId, workspaceId)
            } else {
                await AppUtils.loadAccountWorkspaceAccessInfo(accountId || '', workspaceId || '', true)
            }

            // console.log('accessInfo: ', accountId, workspaceId)
        }

        loadData()
    }, [location])

    return (
        <>
            <PrimaryNav
                manuIsDrawer
                linkGroups={links}
                CustomEl={NavCustomEl} />
            <Outlet />
        </>
    )
}

export default PrivatePageLayout