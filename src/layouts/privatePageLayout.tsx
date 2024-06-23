import React, {useMemo} from 'react';
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
import AccountCircle from '@mui/icons-material/AccountCircle';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import { useAppDispatch, useAppSelector} from '../stores/appStore';
import { clearUserData } from '../stores/signedInUserSlice';
import { toggleTheme } from '../stores/appRefsSlice';

import AuthService from '../pages/auth/authService';
import PrimaryNav, { TLinkGroup } from '../components/navs/primaryNav';

import appComponentsHandler from '../utils/appComponentsHandler';
import DataTransformer from '../utils/dataTransformer';
import { IFeature } from '../types/feature';

const NavCustomEl = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const userData = useAppSelector(state => state.signedInUser?.userData)
    const userRole = useAppSelector(state => state.signedInUser?.role)
    const appTheme = useAppSelector(state => state.appRefs.appTheme)
    const features = useAppSelector(state => state.appRefs.features)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const customLinks:TLinkGroup[] = useMemo(() => {
        const filterType = 'ui-user-drawer'
        let featuresMap:{[key:string]:IFeature} = DataTransformer.generateFeaturesDictionary(features?.filter(item => item.type === filterType) || [])
        let links = appComponentsHandler.userDrawer.privateUserDrawers

        console.log(featuresMap)
        return links
    }, [features])

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
        dispatch(clearUserData())
        localStorage.removeItem(appComponentsHandler.appConfig.TokenKey)
        window.location.replace('/signin')
    }

    return (
        <>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                { appComponentsHandler.appConfig.AppName }
            </Typography>
            <div>
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
                                <Typography variant="subtitle1">{ userData && userData.username? userData.username: '' }</Typography>
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
                        {/* default user actions */}
                        { customLinks?.length? <Typography color="primary" sx={{margin: '10px'}}>Default Actions</Typography>: null }
                        <MenuItem onClick={() => handleLinkClick('/owner/edit/roles')}>
                            <ListItemIcon>
                                <AdminPanelSettingsIcon />
                            </ListItemIcon>
                            <ListItemText>Change Role</ListItemText>
                        </MenuItem>
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
            </div>
        </>
    )
}


const PrivatePageLayout = () => {
    const features = useAppSelector(state => state.appRefs.features)

    const links:TLinkGroup[] = useMemo(() => {
        const filterType = 'ui-main-drawer'
        let featuresMap:{[key:string]:IFeature} = DataTransformer.generateFeaturesDictionary(features?.filter(item => item.type === filterType) || [])
        let links = appComponentsHandler.mainDrawer

        console.log(featuresMap)
        return links
    }, [features])

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