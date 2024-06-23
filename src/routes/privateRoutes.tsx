import { useMemo } from 'react';
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
    const features = useAppSelector(state => state.appRefs.features)

    const privateRoutes = useMemo(() => {
        const filterType = 'ui-route'
        let featuresMap:{[key:string]:IFeature} = DataTransformer.generateFeaturesDictionary(features?.filter(item => item.type === filterType) || [])
        let routes = appComponentsHandler.routes.privateRoutes

        console.log(featuresMap)
        return routes
    }, [features])

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