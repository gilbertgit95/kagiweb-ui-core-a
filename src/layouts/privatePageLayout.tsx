import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Typography, Divider } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SettingsIcon from '@mui/icons-material/Settings';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';
import NotesIcon from '@mui/icons-material/Notes';
import TaskIcon from '@mui/icons-material/Task';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import WorkspacesIcon from '@mui/icons-material/Workspaces';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import { useAppDispatch, useAppSelector} from '../stores/appStore';
import { clearUserData } from '../stores/signedInUserSlice';
import { toggleTheme } from '../stores/appRefsSlice';

import Config from "../config";
import AuthService from "../pages/auth/authService";
import PrimaryNav, { TLinkGroup, TLink } from '../components/navs/primaryNav';

// type Props = {
//     children?: React.ReactNode
// }
const NavCustomEl = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const userData = useAppSelector(state => state.signedInUser?.userData)
    const userRole = useAppSelector(state => state.signedInUser?.role)
    const appTheme = useAppSelector(state => state.appRefs.appTheme)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

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
        localStorage.setItem(Config.AppThemeKey, updatedTheme)
    }

    const handleSignout = async () => {
        try {
            await AuthService.signout()
        } catch (err) {
            console.log('Token has not been remove successfully from the database end, but will be cleared from the browser storage.')
        }
        dispatch(clearUserData())
        localStorage.removeItem(Config.TokenKey)
        window.location.replace('/signin')
    }

    return (
        <>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                { Config.AppName }
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
                </Menu>
            </div>
        </>
    )
}


const PrivatePageLayout =() => {
    const links:TLinkGroup[] = [
        {
            label: 'Workspace Data',
            links:  [
                { label: 'Workspace Dash*', url: '/workspaces/view/none', Icon: HomeIcon },
                { label: 'Products*', url: '/', Icon: HomeIcon }
            ]
        },
        {
            label: 'User Data',
            links:  [
                { label: 'Home', url: '/', Icon: HomeIcon },
                { label: 'Notes*', url: '/notes', Icon: NotesIcon },
                { label: 'Tasks*', url: '/tasks', Icon: TaskIcon },
                { label: 'Notifications*', url: '/notifications', Icon: NotificationsIcon }
            ]
        },
        {
            label: 'Global Data',
            links:  [
                { label: 'Features', url: '/features', Icon: FeaturedPlayListIcon },
                { label: 'Roles', url: '/roles', Icon: AdminPanelSettingsIcon },
                { label: 'Users', url: '/users', Icon: PeopleIcon },
                // { label: 'Workspaces', url: '/workspaces', Icon: WorkspacesIcon },
            ]
        }
    ]

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