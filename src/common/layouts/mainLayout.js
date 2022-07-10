import { useContext } from 'react'
import { Outlet } from "react-router-dom"
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import Avatar from '@mui/material/Avatar'
import MailIcon from '@mui/icons-material/Mail'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationsIcon from '@mui/icons-material/Notifications'
import FaceIcon from '@mui/icons-material/Face'
import LogoutIcon from '@mui/icons-material/Logout'
import KeyIcon from '@mui/icons-material/Key'

import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'

import MainNav from '../navs/mainNav'
import AccountContext from '../contexts/accountContext'
import RouterContext, { useRouterContext } from '../contexts/routerContext'
import ThemeToggle from '../themes/themeToggle'
import config from '../../config'

const MainLayout = (props) => {
    const routerStates = useRouterContext()
    const AccCtx = useContext(AccountContext)

    let leftLogo = {
        label: 'Root',
        component: <Avatar sx ={{'& :hover': {cursor: 'pointer'}}} alt="Logo" src="/favicon.png" />,
        type: 'link',
        value: `/${ config.rootRoute }/home`
    }
    let leftMenu = [
        [
            {
              component: <MailIcon />,
              label: 'Home',
              type: 'link',
              value: `/${ config.rootRoute }/home`
            },
            {
                component: <MailIcon />,
                label: 'Demo',
                type: 'link',
                value: `/${ config.rootRoute }/demo`
            }
        ],
        [
            {
                component: <MailIcon />,
                label: 'Notes',
                type: 'action',
                value: 'notes'
            }
        ]
    ]

    let middleMenu = [
        {
            label: 'Notifications',
            component: (
                <IconButton size="large" sx={{ p: 0 }}>
                    <Badge badgeContent={4} color="error">
                        <NotificationsIcon color="action" size="large" />
                    </Badge>
                </IconButton>
            ),
            type: 'link',
            value: `/${ config.rootRoute }/notifications`
        },
        {
            label: 'Administrator',
            component: (
                <IconButton size="large" sx={{ p: 0 }}>
                    <AdminPanelSettingsIcon color="action" size="large" />
                </IconButton>
            ),
            type: 'link',
            value: `/${ config.rootRoute }/admin/appSettings`
        }
    ]

    let rightLogo = {
        label: 'Open settings',
        component: <Avatar alt="Gebe" src="/static/images/avatar/2.jpg" />,
        type: 'action',
        value: 'openSettings'
    }
    let rightMenu = [
        [
            {
                component: (
                    <Box sx={{ display: 'inline-block' }}>
                        <ThemeToggle noLabel={true} />
                    </Box>
                ),
                label: 'Dark Mode',
                type: 'none',
                value: 'none'
            }
        ],
        [
            {
                component: <KeyIcon />,
                label: 'Credentials',
                type: 'link',
                value: `/${ config.rootRoute }/account/credentials`
            },
            {
                component: <FaceIcon />,
                label: 'Profile',
                type: 'link',
                value: `/${ config.rootRoute }/account/profile`
            },
            {
                component: <SettingsIcon />,
                label: 'Settings',
                type: 'link',
                value: `/${ config.rootRoute }/account/settings`
            },
        ],
        [
            {
                component: <LogoutIcon />,
                label: 'Logout',
                type: 'action',
                value: 'logout'
            }
        ]
    ]

    const onNavAction = (e) => {
        if (e === 'logout') {
            AccCtx.setAccountContext({ ...AccCtx.accountContext, ...{__action: 'clearCredentials'} })
            routerStates.setRouterContext(`/${ config.rootRoute }/auth/`)
        }
    }

    return (
        <RouterContext.Provider
            value={{
              ...routerStates
            }}>
            <MainNav
                leftLogo={leftLogo}
                leftMenu={leftMenu}
                middleMenu={middleMenu}
                rightLogo={rightLogo}
                rightMenu={rightMenu}
                onAction={onNavAction} />

            <Container maxWidth="false">
                <Box>
                    <Toolbar />
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{paddingLeft: 0, paddingTop: 30}}>
                            <Box>
                                <Outlet />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </RouterContext.Provider>
    )
}

export default MainLayout