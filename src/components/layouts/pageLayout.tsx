// import React from "react";
import { Outlet } from "react-router-dom";

// type Props = {
//     children?: React.ReactNode
// }
const PageLayout =() => {
    return (
        <div>
            <h2>Page Layout</h2>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default PageLayout