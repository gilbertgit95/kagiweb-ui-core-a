import React from "react";
import { Outlet } from "react-router-dom";
import { Typography, Divider } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import { useAppDispatch, useAppSelector} from '../stores/appStore';
import { clearUserData } from '../stores/signedInUserSlice';

import Config from "../utils/config";
import AuthService from "../pages/auth/authService";
import PrimaryNav, { TLink } from '../components/navs/primaryNav';

// type Props = {
//     children?: React.ReactNode
// }
const NavCustomEl = () => {
    const dispatch = useAppDispatch()
    const userData = useAppSelector(state => state.signedInUser.userData)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLinkClick = () => {

    }

    const handleThemeToggle = () => {

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
                    // anchorOrigin={{
                    //     vertical: 'top',
                    //     horizontal: 'right',
                    // }}
                    // keepMounted
                    // transformOrigin={{
                    //     vertical: 'top',
                    //     horizontal: 'right',
                    // }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>
                    <MenuItem onClick={handleLinkClick}>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText>My Account</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleThemeToggle}>
                        <ListItemIcon>
                            <DarkModeIcon />
                        </ListItemIcon>
                        <ListItemText>Theme</ListItemText>
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
    const links:TLink[] = [
        { label: 'Home', url: '/', Icon: HomeIcon },
        { label: 'Workspaces', url: '/workspaces', Icon: HomeIcon },
    ]

    return (
        <>
            <PrimaryNav
                links={links}
                CustomEl={NavCustomEl}/>
            <Outlet />
        </>
    )
}

export default PrivatePageLayout