import { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import MailIcon from '@mui/icons-material/Mail'
import Button from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import ThemeToggle from '../themes/themeToggle'

import InitialLoadinglayout from './initalLoadingLayout'
import MainNav from '../navs/mainNav'
import config from '../../config'

import AccountContext from '../contexts/accountContext'
import RouterContext, { useRouterContext } from '../contexts/routerContext'
import LocalStorageContext from '../contexts/localStorageContext'

const AuthLayout = (props) => {
    const AccCtx = useContext(AccountContext)
    const routerStates = useRouterContext()
    const lsCtx = useContext(LocalStorageContext)

    let rightLogo = {
        label: 'Open settings',
        component: <MenuIcon />,
        type: 'action',
        value: 'openSettings'
    }
    let middleMenu = [
        {
            label: 'Latest news from our team',
            component: (
                <Button size="small" style={{ borderRadius: 5, marginRight: 15 }}>
                    <Typography>News</Typography>
                </Button>
            ),
            type: 'link',
            value: `/${ config.rootRoute }/home`
        },
        {
            label: 'Contact or Learn about our Team',
            component: (
                <Button size="small"  style={{ borderRadius: 5, marginRight: 15 }}>
                    <Typography>About Us</Typography>
                </Button>
            ),
            type: 'link',
            value: `/${ config.rootRoute }/home`
        }
    ]
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

    const onNavAction = (e) => {
        console.log('Action: ', e)
    }

    useEffect(() => {

        //  if user action is to signout, then clear credentials
        if (   AccCtx.accountContext.__action
            && AccCtx.accountContext.__action === 'clearCredentials') {
            //  redirect to home page
            lsCtx.updateLocalStorage({authKey: null})
            AccCtx.signOut()

            return
        }

        // if user is logged in redirect to home page
        if (   typeof AccCtx.accountContext.__isLoggedIn === 'boolean'
            && Boolean(AccCtx.accountContext.__isLoggedIn)) {
            //  redirect to home page
            routerStates.setRouterContext(`/${ config.rootRoute }/home`)
        }

    }, [AccCtx.accountContext])

    return (
        <RouterContext.Provider
            value={{
              ...routerStates
            }}>
            <InitialLoadinglayout>
                <MainNav
                    isTransparent={true}
                    leftLogo={null}
                    leftMenu={[]}
                    middleMenu={middleMenu}
                    rightLogo={rightLogo}
                    rightMenu={rightMenu}
                    onAction={onNavAction} />
                <Container maxWidth="sm">
                    <Box>
                        <Toolbar />
                        <Grid container spacing={2}>
                            <Grid item xs={12} style={{textAlign: 'center'}}>
                                <img
                                    alt="logo"
                                    style={{width: 150}}
                                    src='/favicon.png' />
                                <Typography variant="h4" gutterBottom component="div">
                                    { config.appName }
                                </Typography>
                            </Grid>
                            <Grid item xs={12} style={{textAlign: 'center'}}>
                                <Box
                                    style={{
                                        width: 300,
                                    margin: 'auto',
                                    padding: 20,
                                    paddingTop: 40,
                                    paddingBottom: 40,
                                    boxShadow: '2px 2px 3px 2px rgb(0 0 0 / 20%)'
                                }}>
                                <Outlet />
                            </Box>
                        </Grid>
                        <Grid item xs={12} style={{textAlign: 'center'}}>
                            <Typography variant="caption" display="block" gutterBottom>
                                Copyrights 2021
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            </InitialLoadinglayout>
        </RouterContext.Provider>
    )
}

export default AuthLayout