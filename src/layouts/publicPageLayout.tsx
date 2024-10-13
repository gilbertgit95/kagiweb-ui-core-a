import React, {useMemo} from 'react';
import PrimaryNav, { TLinkGroup } from '../components/navs/primaryNav';
import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import PagesIcon from '@mui/icons-material/Pages';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

import appComponentsHandler from '../utils/appComponentsHandler';

import { useAppDispatch, useAppSelector} from '../stores/appStore';
import { toggleTheme } from '../stores/appRefsSlice';

const NavCustomEl = () => {
    return (
        <>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                { appComponentsHandler.appConfig.AppName }
            </Typography>
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
                            action: () => {
                                handleThemeToggle(appTheme)
                            },
                            Icon:  appTheme === 'dark'? DarkModeIcon: WbSunnyIcon
                        }
                    ]
                }
            ],
            ...appComponentsHandler.userDrawer.publicUserDrawers
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