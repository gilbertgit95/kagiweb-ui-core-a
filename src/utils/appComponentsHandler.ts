import React from 'react'
import { IFeature, TFeatureType } from '../types/feature'
import { TLinkGroup } from '../components/navs/primaryNav'
import FeatureService from '../pages/feature/featureService'

export interface IAppRoute {
    url: string,
    page: React.FC
}

export interface IAppConfig {
    AppName: string,
    AppDescription: string,
    ServerAddress:string,
    RootApiEndpoint:string,
    TokenKey:string,
    AccountsKey: string,
    AppThemeKey:string,
    AppThemeConfig:any,
    
    defaultDateFormat:string,
    defaultDateTimeFormat:string,
    defaultPageSizeList:number[],
    defaultPageSize:number,
    defaultPage:number
}

interface IAppConfigOpt {
    AppName?: string,
    AppDescription?: string,
    ServerAddress?:string,
    RootApiEndpoint?:string,
    TokenKey?:string,
    AppThemeKey?:string,
    AppThemeConfig?:any,
    accountsKey?: string,
    defaultDateFormat?:string,
    defaultDateTimeFormat?:string,
    defaultPageSizeList?:number[],
    defaultPageSize?:number,
    defaultPage?:number
}

class AppComponentsHandler {
    public appConfig:IAppConfig = {
        AppName: 'Kagiweb tech',
        AppDescription: '',
        ServerAddress: 'http://127.0.0.1:5000',
        RootApiEndpoint: '/api/v1/',
        TokenKey: '_auth_token',
        AccountsKey: '_signedin_accounts',

        AppThemeKey: '_app_theme',
        AppThemeConfig: {},
    
        defaultDateFormat: 'YYYY-MM-DD',
        defaultDateTimeFormat: 'ddd MMM DD YYYY, hh:mm:ss A',
        defaultPageSizeList: [5, 10, 25, 100],
        defaultPageSize: 10,
        defaultPage: 1
    }

    public routes:{privateRoutes:IAppRoute[], publicRoutes:IAppRoute[]} = {
        privateRoutes: [],
        publicRoutes: []
    }
    public mainDrawer:TLinkGroup[] = []
    public userDrawer:{privateUserDrawers:TLinkGroup[], publicUserDrawers:TLinkGroup[]} = {
        privateUserDrawers:[],
        publicUserDrawers:[]
    }

    public setAppConfig(conf:IAppConfigOpt) {
        this.appConfig = {...this.appConfig, ...conf}
    }

    public addPrivateRoute(route:IAppRoute):void {
        this.routes.privateRoutes.push(route)
    }
    public addPublicRoute(route:IAppRoute):void {
        this.routes.publicRoutes.push(route)
    }

    public addMainDrawer(nav:TLinkGroup):void {
        this.mainDrawer.push(nav)
    }

    public addPrivateUserDrawerNav(nav:TLinkGroup):void {
        this.userDrawer.privateUserDrawers.push(nav)
    }
    public addPublicUserDrawerNav(nav:TLinkGroup):void {
        this.userDrawer.publicUserDrawers.push(nav)
    }

    public async syncToFeatures():Promise<void> {
        const features:IFeature[] = []

        // prepare and sync private routes
        features.push(...this.routes.privateRoutes.map(item => {
            return {
                description: 'One of the ui private route',
                name: `PRIVATE ROUTE - ${ item.url }`,
                tags: [],
                type: 'ui-route' as TFeatureType,
                value: `PRIVATE ROUTE - ${ item.url }`
            }
        }))

        // prepare and sync main drawer
        features.push(...this.mainDrawer.reduce<IFeature[]>((acc, item) => {
            acc = [
                ...acc,
                ...item.links?.map(item => {
                    return {
                        description: 'One of the ui main drawer nav',
                        name: `PRIVATE MAIN NAV - ${ item.label }`,
                        tags: [],
                        type: 'ui-main-drawer' as TFeatureType,
                        value: `PRIVATE MAIN NAV - ${ item.label }`
                    }
                }) || []
            ]
            return acc
        }, []))

        // prepare and sync private account drawer
        features.push(...this.userDrawer.privateUserDrawers.reduce<IFeature[]>((acc, item) => {
            acc = [
                ...acc,
                ...item.links?.map(item => {
                    return {
                        description: 'One of the ui private account drawer nav',
                        name: `PRIVATE ACCOUNT NAV - ${ item.label }`,
                        tags: [],
                        type: 'ui-main-drawer' as TFeatureType,
                        value: `PRIVATE ACCOUNT NAV - ${ item.label }`
                    }
                }) || []
            ]
            return acc
        }, []))

        // sync all features
        for (const feat of features) {
            try {
                console.log('saving... ', `${ feat.type }: `, feat.value)
                await FeatureService.createFeature(feat)
            } catch(err) {
                console.log(err)
            }
        }
    }

}

const appComponentsHandler = new AppComponentsHandler()

export default appComponentsHandler