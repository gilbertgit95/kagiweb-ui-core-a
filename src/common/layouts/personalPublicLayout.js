import { useState, useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import MenuIcon from '@mui/icons-material/Menu'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography'

import ThemeToggle from '../themes/themeToggle'

import InitialLoadinglayout from './initalLoadingLayout'
import MainNav from '../navs/mainNav'

import RouterContext, { useRouterContext } from '../contexts/routerContext'
import PublicContext from '../contexts/publicContext'
import GlobalDialogContext from '../contexts/globalDialogContext'

const PersonalPublicLayout = (props) => {
    const routerStates = useRouterContext()
    const publicCtx = useContext(PublicContext)
    const globalDialogCtx = useContext(GlobalDialogContext)

    let [states, setStates] = useState({
        aboutMe: null,
        isLoading: true
    })

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
        //         <Button size='small' style={{ borderRadius: 5, marginRight: 15 }}>
        //             <Typography>News</Typography>
        //         </Button>
        //     ),
        //     type: 'link',
        //     value: `/${ config.rootRoute }/home`
        // },
        // {
        //     label: 'Contact or Learn about our Team',
        //     component: (
        //         <Button size='small'  style={{ borderRadius: 5, marginRight: 15 }}>
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
        [
            {
                component: <PictureAsPdfIcon />,
                label: 'Download PDF',
                type: 'action',
                value: 'download_pdf'
            }
        ]
    ]

    const onNavAction = async (e) => {
        // console.log('Action: ', e)
        if (e === 'download_pdf') {
            await globalDialogCtx.showDialog({
                title: 'Alert',
                type: 'alert',
                color: 'secondary',
                message: 'This feature is still on development. Implementation for this feature might take a while.'
            })
        }
    }

    useEffect(() => {
        if (!(publicCtx && publicCtx.publicContext && publicCtx.publicContext.aboutMe)) return
        setStates({...states, ...{
            aboutMe: publicCtx.publicContext.aboutMe,
            isLoading: false
        }})
    }, [publicCtx.publicContext])

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
                <Container maxWidth='md'>
                    <Box>
                        <Toolbar />
                        <Outlet />
                    </Box>
                </Container>
                <AppBar
                    position='static'
                    style={{ boxShadow: 'none', background: 'none', textAlign: 'right' }}>
                    <Toolbar>
                        <Typography
                            variant='body2'
                            component='div'
                            color='primary'
                            sx={{ flexGrow: 1 }}>
                            { states.aboutMe? states.aboutMe.footerMessage: '' }
                        </Typography>
                    </Toolbar>
                </AppBar>
            </InitialLoadinglayout>
        </RouterContext.Provider>
    )
}

export default PersonalPublicLayout