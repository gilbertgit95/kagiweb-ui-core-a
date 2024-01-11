// import React from "react";
import * as React from 'react';
import PrimaryNav from '../components/navs/primaryNav';
import { Outlet } from "react-router-dom";

// type Props = {
//     children?: React.ReactNode
// }
const PublicPageLayout =() => {
    return (
        <>
            <PrimaryNav />
            <Outlet />
        </>
    )
}

export default PublicPageLayout