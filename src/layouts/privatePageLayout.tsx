import React, {useMemo, useEffect} from 'react';
import _ from 'lodash';
import { Outlet, useNavigate } from 'react-router-dom';
import { Typography, Divider, Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';
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
import PrimaryNav, { TLinkGroup } from '../components/navs/primaryNav';
import WorkspaceSelectorComponent from '../pages/accountAccountConfig/workspaceSelectorComponent';
import RoleSelectorComponent from '../pages/accountAccountConfig/roleSelectorComponent';

import appComponentsHandler from '../utils/appComponentsHandler';
import DataTransformer from '../utils/dataTransformer';
import { IFeature } from '../types/feature';

const NavCustomEl = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const accountData = useAppSelector(state => state.signedInAccount?.accountData)
    const userRole = useAppSelector(state => state.signedInAccount?.role)
    const userFeatures = useAppSelector(state => state.signedInAccount?.features) || []
    const appTheme = useAppSelector(state => state.appRefs.appTheme)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [roleChangeAnchorEl, setRoleChangeAnchorEl] = React.useState<null | HTMLElement>(null)

    const customLinks:TLinkGroup[] = useMemo(() => {
        const filterType = 'ui-account-drawer'
        const featuresMap:{[key:string]:IFeature} = DataTransformer.generateFeaturesDictionary(userFeatures?.filter(item => item.type === filterType) || [])
        const drawers = appComponentsHandler.userDrawer.privateUserDrawers
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

    const handleSignout = async () => {
        try {
            await AuthService.signout()
        } catch (err) {
            console.log('Token has not been remove successfully from the database end, but will be cleared from the browser storage.')
        }
        dispatch(clearAccountData())
        localStorage.removeItem(appComponentsHandler.appConfig.TokenKey)
        window.location.replace('/signin')
    }

    return (
        <>
            <Box component={'div'} style={{width: '100%'}}>
                {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    { appComponentsHandler.appConfig.AppName }
                </Typography> */}
                <WorkspaceSelectorComponent />
            </Box>
            <Box component={'div'}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit">
                    <AccountCircle />
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
                                <Typography variant="caption" color="primary">{ userRole?.name }</Typography>
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
                        <MenuItem onClick={() => handleLinkClick('/owner/notifications')}>
                            <ListItemIcon>
                                <NotificationsIcon />
                            </ListItemIcon>
                            <ListItemText>Notifications*</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={(e) => setRoleChangeAnchorEl(e.currentTarget)}>
                            <ListItemIcon>
                                <AdminPanelSettingsIcon />
                            </ListItemIcon>
                            <ListItemText>Change Role</ListItemText>
                        </MenuItem>
                        <RoleSelectorComponent
                            anchorEl={roleChangeAnchorEl}
                            onClose={() => setRoleChangeAnchorEl(null)} />
                        <MenuItem onClick={() => handleThemeToggle(appTheme)}>
                            <ListItemIcon>
                                { appTheme === 'dark'? <DarkModeIcon />: <WbSunnyIcon /> }
                            </ListItemIcon>
                            <ListItemText>Toggle Theme</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={handleSignout}>
                            <ListItemIcon>
                                <LockIcon />
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
    const userFeatures:IFeature[] = useAppSelector(state => state.signedInAccount?.features) || []

    const links:TLinkGroup[] = useMemo(() => {
        const filterType = 'ui-main-drawer'
        const featuresMap:{[key:string]:IFeature} = DataTransformer.generateFeaturesDictionary(userFeatures?.filter(item => item.type === filterType) || [])
        const drawers = appComponentsHandler.mainDrawer
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