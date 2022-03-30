import { useState, useEffect, useContext } from 'react'
import { Outlet, Link, useHistory } from "react-router-dom"
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
// import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import MailIcon from '@mui/icons-material/Mail'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationsIcon from '@mui/icons-material/Notifications'
import FaceIcon from '@mui/icons-material/Face'
import LogoutIcon from '@mui/icons-material/Logout'

// import Tooltip from '@mui/material/Tooltip'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'

import MainNav from '../navs/mainNav'
import AccountContext from '../context/accountContext'
import ThemeToggle from '../themes/themeToggle'
// import config from '../../config'

const MainLayout = (props) => {
    const accountCtx = useContext(AccountContext)

    let leftLogo = {
        label: 'Root',
        component: <Avatar alt="Logo" src="/favicon.png" />,
        type: 'link',
        value: '/core/home'
    }
    let leftMenu = [
        [
            {
              component: <MailIcon />,
              label: 'Home',
              type: 'link',
              value: '/core/home'
            }
        ],
        [
            {
                component: <MailIcon />,
                label: 'Notes',
                type: 'action',
                value: 'notes'
            }
        ],
        [
            {
                // component: <MailIcon />,
                label: 'Notes II',
                type: 'action',
                value: 'notes II'
            }
        ]
    ]

    let middleMenu = [
        {
            label: 'Administrator',
            component: (
                <IconButton size="large" sx={{ p: 0 }}>
                    <AdminPanelSettingsIcon color="action" size="large" />
                </IconButton>
            ),
            type: 'link',
            value: '/core/admin/appSettings'
        },
        {
            label: 'Notifications',
            component: (
                <IconButton size="large" sx={{ p: 0 }}>
                    <Badge badgeContent={4} color="error">
                        <NotificationsIcon color="action" size="large" />
                    </Badge>
                </IconButton>
            ),
            type: 'action',
            value: 'notifications'
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
                component: <AdminPanelSettingsIcon />,
                label: 'Account',
                type: 'link',
                value: '/core/account/credentials'
            },
            {
                component: <FaceIcon />,
                label: 'Profile',
                type: 'link',
                value: '/core/account/profile'
            },
            {
                component: <SettingsIcon />,
                label: 'Settings',
                type: 'link',
                value: '/core/account/settings'
            },
            // {
            //     component: <MailIcon />,
            //     label: 'Test Act',
            //     type: 'action',
            //     value: 'test_act'
            // },
        ],
        [
            {
                component: <LogoutIcon />,
                label: 'Logout',
                type: 'link',
                value: '/core/auth/logout'
            }
        ]
    ]

    const onNavAction = (e) => {
        console.log('Action: ', e)
    }

    useEffect(() => {
        console.log('init main layout')
        accountCtx.initAccountData()
    }, [])

    return (
        <>
            <MainNav
                leftLogo={leftLogo}
                leftMenu={leftMenu}
                middleMenu={middleMenu}
                rightLogo={rightLogo}
                rightMenu={rightMenu}
                onAction={onNavAction} />

            <Container maxWidth="lg">
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{textAlign: 'center'}}>
                            {/* <Typography variant="h4" gutterBottom component="div">
                                { config.appName }
                            </Typography> */}
                        </Grid>
                        <Grid item xs={12} style={{textAlign: 'center'}}>
                            <Box>
                                <Outlet />
                            </Box>
                        </Grid>
                        {/* <Grid item xs={12} style={{textAlign: 'center'}}>
                            <Typography variant="caption" display="block" gutterBottom>
                                Copyrights 2021
                            </Typography>
                        </Grid> */}
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default MainLayout