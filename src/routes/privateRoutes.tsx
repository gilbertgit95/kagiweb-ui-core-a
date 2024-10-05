import React from 'react';
import { useMemo } from 'react';
import _ from 'lodash';
import { Grid, Button } from '@mui/material'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivatePageLayout from '../layouts/privatePageLayout';
import NotFoundPage from '../components/infoOrWarnings/pageNotFound';

import { IFeature } from '../types/feature';
import appComponentsHandler from '../utils/appComponentsHandler';
import { useAppSelector} from '../stores/appStore';
import DataTransformer from '../utils/dataTransformer';

const PrivateRoutes = () => {
    const userFeatures = useAppSelector(state => state.signedInAccount?.features) || []

    const privateRoutes = useMemo(() => {
        const filterType = 'ui-route'
        const featuresMap:{[key:string]:IFeature} = DataTransformer.generateFeaturesDictionary(userFeatures?.filter(item => item?.type === filterType) || [])
        let routes = _.clone(appComponentsHandler.routes.privateRoutes)
        const filteredRoutes = routes.filter(route => {
            const url = route.url
            return featuresMap[url]
        })
        // console.log(featuresMap, routes, filteredRoutes)
        return filteredRoutes
    }, [userFeatures])

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