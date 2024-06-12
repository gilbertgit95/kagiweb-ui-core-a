import { useMemo } from 'react';
import { Grid, Button } from '@mui/material'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivatePageLayout from '../layouts/privatePageLayout';
import NotFoundPage from '../components/infoOrWarnings/pageNotFound';

import appComponentsHandler from '../utils/appComponentsHandler';

const PrivateRoutes = () => {
    const privateRoutes = useMemo(() => {
        return appComponentsHandler.routes.privateRoutes
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrivatePageLayout />}>
                    {
                        privateRoutes.map((route, routeIndex)  => {
                            return route.url === 'index'? (
                                <Route key={routeIndex} index element={<route.page />} />
                            ): (
                                <Route key={routeIndex} path={ route.url } element={<route.page />} />
                            )
                        })
                    }

                    {/* for none existing page */}
                    <Route
                        path="*"
                        element={
                            <NotFoundPage>
                                <Grid item xs={12}>
                                    <Button
                                        variant='outlined'
                                        onClick={() => window.location.replace('/')}
                                        endIcon={<TrendingFlatIcon />}>go to home page</Button>
                                </Grid>
                            </NotFoundPage>
                        } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default PrivateRoutes