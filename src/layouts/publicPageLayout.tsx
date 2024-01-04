// import React from "react";
import { Outlet } from "react-router-dom";

// type Props = {
//     children?: React.ReactNode
// }
const PublicPageLayout =() => {
    return (
        <div>
            <h2>Public Page Layout</h2>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default PublicPageLayout