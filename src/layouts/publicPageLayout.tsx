import React, {useMemo} from 'react';
import PrimaryNav, { TLinkGroup, TLink } from '../components/navs/primaryNav';
import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import PagesIcon from '@mui/icons-material/Pages';

import Config from '../config';
import appComponentsHandler from '../utils/appComponentsHandler';

const NavCustomEl = () => {
    return (
        <>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                { Config.AppName }
            </Typography>
        </>
    )
}


const PublicPageLayout = () => {
    const links:TLinkGroup[] = useMemo(() => {
        return appComponentsHandler.userDrawer.publicUserDrawers
    }, [])

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