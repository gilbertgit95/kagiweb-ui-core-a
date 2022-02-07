import { useState, useContext } from 'react'
import { Outlet, Link } from "react-router-dom"
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import MailIcon from '@mui/icons-material/Mail'
import Tooltip from '@mui/material/Tooltip'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'

import MainNav from '../navs/mainNav'
import AccountContext from '../context/accountContext'
import config from '../../config'

const MainLayout = (props) => {
    // const ctx = useContext(AccountContext)

    // let accountVal = ctx.accountContext && ctx.accountContext.testVal? ctx.accountContext.testVal: ''
    let navLogo = <Avatar alt="Logo" src="/favicon.png" />
    let NavMainMenu = [
        {
          icon: <MailIcon />,
          label: 'Emails',
          type: 'link',
          value: '/home'
        },
        {
            icon: <MailIcon />,
            label: 'Auth',
            type: 'link',
            value: '/auth'
        },
        {
            icon: null,
            label: null,
            type: 'divider',
            value: null
        },
        {
            icon: <MailIcon />,
            label: 'Notes',
            type: 'action',
            value: 'notes'
        }
    ]

    let navExtensionMenus = [
        {
            component: (
                <Tooltip title="notifications" style={{marginRight: 15}}>
                    <IconButton size="large" sx={{ p: 0 }}>
                        <Badge badgeContent={4} color="error">
                            <MailIcon color="action" size="large" />
                        </Badge>
                    </IconButton>
                </Tooltip>
            ),
            type: 'action',
            value: 'notifications'
        },
        {
            component: <Avatar alt="Gebe" src="/static/images/avatar/2.jpg" />,
            value: '',
            type: 'list',
            list: [
                {
                    icon: <MailIcon />,
                    label: 'Emails',
                    type: 'link',
                    value: '/home'
                },
                {
                    icon: <MailIcon />,
                    label: 'Auth',
                    type: 'link',
                    value: '/auth'
                },
                {
                    icon: null,
                    label: null,
                    type: 'divider',
                    value: null
                },
                {
                    icon: <MailIcon />,
                    label: 'Notes',
                    type: 'action',
                    value: 'notes'
                }
            ]
        }
    ]

    return (
        <>
            <MainNav
                logo={navLogo}
                mainMenu={NavMainMenu}
                extensionMenus={navExtensionMenus} />

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