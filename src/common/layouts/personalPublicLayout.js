import { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import ThemeToggle from '../themes/themeToggle'

import InitialLoadinglayout from './initalLoadingLayout'
import MainNav from '../navs/mainNav'

import AccountContext from '../contexts/accountContext'
import RouterContext, { useRouterContext } from '../contexts/routerContext'
import LocalStorageContext from '../contexts/localStorageContext'

const PersonalPublicLayout = (props) => {
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
        // {
        //     label: 'Latest news from our team',
        //     component: (
        //         <Button size="small" style={{ borderRadius: 5, marginRight: 15 }}>
        //             <Typography>News</Typography>
        //         </Button>
        //     ),
        //     type: 'link',
        //     value: `/${ config.rootRoute }/home`
        // },
        // {
        //     label: 'Contact or Learn about our Team',
        //     component: (
        //         <Button size="small"  style={{ borderRadius: 5, marginRight: 15 }}>
        //             <Typography>About Us</Typography>
        //         </Button>
        //     ),
        //     type: 'link',
        //     value: `/${ config.rootRoute }/home`
        // }
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
        // [
        //     {
        //         component: <MailIcon />,
        //         label: 'Notes',
        //         type: 'action',
        //         value: 'notes'
        //     }
        // ],
        // [
        //     {
        //         // component: <MailIcon />,
        //         label: 'Notes II',
        //         type: 'action',
        //         value: 'notes II'
        //     }
        // ]
    ]

    const onNavAction = (e) => {
        console.log('Action: ', e)
    }

    useEffect(() => {

    }, [])

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
                <Container maxWidth="md">
                    <Box>
                        <Toolbar />
                        <Outlet />
                    </Box>
                </Container>
            </InitialLoadinglayout>
        </RouterContext.Provider>
    )
}

export default PersonalPublicLayout