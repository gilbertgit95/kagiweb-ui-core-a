import React, {useMemo} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import PrimaryNav, { TLinkGroup, TLink } from '../components/navs/primaryNav';
import { Typography, Button } from "@mui/material";
import Box from '@mui/material/Box';
import PagesIcon from '@mui/icons-material/Pages';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

import appComponentsHandler from '../utils/appComponentsHandler';

import { useAppDispatch, useAppSelector} from '../stores/appStore';
import { toggleTheme } from '../stores/appRefsSlice';

const NavCustomEl = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { pathname } = location

    const handleLinkClick = async (item:TLink) => {
        if (item.url) {
            navigate(item.url)
            return
        }

        if (item.action) {
            await item.action()
            return
        }
        // window.location.replace(link)
    }

    return (
        <>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                { appComponentsHandler.appConfig.AppName }
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {
                    appComponentsHandler.navigations.publicNavs.mainNavs.map((itemGroup, keyGroup) => {
                        return (
                            <React.Fragment key={keyGroup}>
                                {
                                    itemGroup.links?.map((item, key) => {
                                        return (
                                            <Button
                                                key={keyGroup + '_' + key}
                                                onClick={() => handleLinkClick(item)}
                                                sx={{ my: 2, color: 'white'}}
                                                disabled={item.url === pathname}>
                                                { item.label }
                                            </Button>
                                        )
                                    })
                                }
                            </React.Fragment>
                        )
                    })
                }
            </Box>
        </>
    )
}


const PublicPageLayout = () => {
    const dispatch = useAppDispatch()
    const appTheme = useAppSelector(state => state.appRefs.appTheme)

    const handleThemeToggle = (theme:string) => {
        const updatedTheme = theme === 'light'? 'dark': 'light'
        dispatch(toggleTheme())
        localStorage.setItem(appComponentsHandler.appConfig.AppThemeKey, updatedTheme)
    }

    const links:TLinkGroup[] = useMemo(() => {
        return [
            ...[
                {
                    label: 'Actions',
                    links: [
                        {
                            label: 'Toggle Theme',
                            action: () => handleThemeToggle(appTheme),
                            Icon:  appTheme === 'dark'? DarkModeIcon: WbSunnyIcon
                        }
                    ]
                }
            ],
            ...appComponentsHandler.navigations.publicNavs.sideNavs
        ]
    }, [appTheme])

    return (
        <>
            <PrimaryNav
                MenuIcon={PagesIcon}
                linkGroups={links}
                CustomEl={NavCustomEl} />
            <Outlet />
        </>
    )
}

export default PublicPageLayout