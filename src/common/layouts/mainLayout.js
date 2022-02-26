import { useState, useContext } from 'react'
import { Outlet, Link, useHistory } from "react-router-dom"
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
// import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import MailIcon from '@mui/icons-material/Mail'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import SettingsIcon from '@mui/icons-material/Settings'
import FaceIcon from '@mui/icons-material/Face'
import LogoutIcon from '@mui/icons-material/Logout'

// import Tooltip from '@mui/material/Tooltip'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'

import MainNav from '../navs/mainNav'
// import AccountContext from '../context/accountContext'
import ThemeToggle from '../themes/themeToggle'
// import config from '../../config'

const MainLayout = (props) => {
    // const ctx = useContext(AccountContext)

    // let accountVal = ctx.accountContext && ctx.accountContext.testVal? ctx.accountContext.testVal: ''

    let leftLogo = {
        label: 'Root',
        component: <Avatar alt="Logo" src="/favicon.png" />,
        type: 'link',
        value: '/'
    }
    let leftMenu = [
        [
            {
              component: <MailIcon />,
              label: 'Home',
              type: 'link',
              value: '/home'
            },
            {
                component: <MailIcon />,
                label: 'Login',
                type: 'link',
                value: '/auth/login'
            },
            {
                component: <MailIcon />,
                label: 'Reset Password',
                type: 'link',
                value: '/auth/resetPassword'
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
            label: 'Home',
            component: (
                <IconButton size="large" sx={{ p: 0 }}>
                    <MailIcon color="action" size="large" />
                </IconButton>
            ),
            type: 'link',
            value: '/home'
        },
        {
            label: 'notifications',
            component: (
                <IconButton size="large" sx={{ p: 0 }}>
                    <Badge badgeContent={4} color="error">
                        <MailIcon color="action" size="large" />
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
                value: '/account'
            },
            {
                component: <FaceIcon />,
                label: 'Profile',
                type: 'link',
                value: '/account/profile'
            },
            {
                component: <SettingsIcon />,
                label: 'Settings',
                type: 'link',
                value: '/account/settings'
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
                value: '/auth/logout'
            }
        ]
    ]

    const onNavAction = (e) => {
        console.log('Action: ', e)
    }

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