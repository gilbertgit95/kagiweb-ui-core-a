import React from 'react';
import { useMemo } from 'react';
import { Grid, Button } from '@mui/material'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicPageLayout from '../layouts/publicPageLayout';
import NotFoundPage from '../components/infoOrWarnings/pageNotFound';

import appComponentsHandler from '../utils/appComponentsHandler';

const PublicRoutes = () => {
    const publicRoutes = useMemo(() => {
        return appComponentsHandler.routes.publicRoutes
    }, [])

    return (
        <BrowserRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}>
            <Routes>
                <Route path="/" element={<PublicPageLayout />}>
                    {
                        publicRoutes.map((route, routeIndex)  => {
                            return route.url === 'index'? (
                                <Route key={routeIndex} index element={<route.page />} />
                            ): (
                                <Route key={routeIndex} path={ route.url } element={<route.page />} />
                            )
                        })
                    }

                    <Route
                        path="*"
                        element={
                            <NotFoundPage>
                                <Grid item xs={12}>
                                    <Button
                                        variant='outlined'
                                        onClick={() => window.location.replace('/signin')}
                                        endIcon={<TrendingFlatIcon />}>go to signin page</Button>
                                </Grid>
                            </NotFoundPage>
                        } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default PublicRoutes