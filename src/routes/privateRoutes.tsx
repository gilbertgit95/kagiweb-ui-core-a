import React from 'react';
import { useMemo } from 'react';
import _ from 'lodash';
import { Grid, Button, Divider } from '@mui/material'
// import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivatePageLayout from '../layouts/privatePageLayout';
import NotFoundPage from '../components/infoOrWarnings/pageNotFound';

import { IFeature } from '../types/feature';
import appComponentsHandler from '../utils/appComponentsHandler';
import { useAppSelector} from '../stores/appStore';
import DataTransformer from '../utils/dataTransformer';

const PrivateRoutes = () => {
    const accountFeatures = useAppSelector(state => state.signedInAccount?.mergedFeatures) || []

    const privateRoutes = useMemo(() => {
        const filterType = 'ui-route'
        const featuresMap:{[key:string]:IFeature} = DataTransformer.generateFeaturesDictionary(accountFeatures?.filter(item => item?.type === filterType) || [])
        let routes = _.clone(appComponentsHandler.routes.privateRoutes)
        const filteredRoutes = routes.filter(route => {
            const url = route.url
            return featuresMap[url]
        })
        // console.log(featuresMap, routes, filteredRoutes)
        return filteredRoutes
    }, [accountFeatures])

    return (
        <BrowserRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}>
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
                                    <Divider style={{marginBottom: 20}} />
                                    <Button
                                        variant="text"
                                        startIcon={<ArrowBackIosNewIcon />}
                                        onClick={() => window.history.back()}
                                        style={{marginRight: 20}}>
                                        go Back
                                    </Button>
                                    <Button
                                        variant='text'
                                        onClick={() => window.location.replace('/')}
                                        endIcon={<ArrowForwardIos />}
                                        style={{marginLeft: 20}}>home page</Button>
                                </Grid>
                            </NotFoundPage>
                        } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default PrivateRoutes