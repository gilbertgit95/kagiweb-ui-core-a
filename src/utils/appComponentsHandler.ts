import React from 'react'
import { IRole } from '../types/role'
import { IFeature, TFeatureType, TFeatureScope } from '../types/feature'
import { TLinkGroup, TLink } from '../components/navs/primaryNav'
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

    public navigations:{
        privateNavs:{ mainNavs: TLinkGroup[], sideNavs: TLinkGroup[]},
        publicNavs:{ mainNavs: TLinkGroup[], sideNavs: TLinkGroup[]},
    } = {
        privateNavs:{ mainNavs: [], sideNavs: []},
        publicNavs:{ mainNavs: [], sideNavs: []},
    }

    public setAppConfig(conf:IAppConfigOpt) {
        this.appConfig = {...this.appConfig, ...conf}
    }

    public addRoute(route:IAppRoute, groupType: 'privateRoutes' | 'publicRoutes'):void {
        this.routes[groupType].push(route)
    }

    public updateRoute(url:string, page:React.FC, groupType: 'privateRoutes' | 'publicRoutes'):void {
        for (let route of this.routes[groupType]) {
            if (route.url === url) {
                route.page = page
            }
        }
    }

    public addMainNav(nav:TLinkGroup|TLink, groupType: 'privateNavs' | 'publicNavs'):void {
        this.navigations[groupType].mainNavs.push(nav)
    }

    public updateMainNav(groupLabel:string, linkUrl:string, newValue:TLink, groupType: 'privateNavs' | 'publicNavs'):void {
        for (let groupNav of this.navigations[groupType].mainNavs) {
            if (groupNav.label === groupLabel) {
                for (let link of (groupNav.links || [])) {
                    if (link.url === linkUrl) {
                        link = newValue
                    }
                }
            }
        }
    }

    public addSideNav(nav:TLinkGroup, groupType: 'privateNavs' | 'publicNavs'):void {
        this.navigations[groupType].sideNavs.push(nav)
    }

    public updateSideNav(groupLabel:string, linkUrl:string, newValue:TLink, groupType: 'privateNavs' | 'publicNavs'):void {
        for (let groupNav of this.navigations[groupType].sideNavs) {
            if (groupNav.label === groupLabel) {
                for (let link of (groupNav.links || [])) {
                    if (link.url === linkUrl) {
                        link = newValue
                    }
                }
            }
        }
    }

    public async mergedRolesFeatures(appRole:IRole, accountRole:IRole, workspaceRole:IRole):Promise<IFeature[]> {
        // get all features

        // merge all feature ref of the roles

        // then mnap the feature refs to actual fettures data
        
        return []
    }

    public async syncToFeatures():Promise<void> {
        const features:IFeature[] = []

        // prepare and sync private routes
        features.push(...this.routes.privateRoutes.map(item => {
            return {
                description: 'One of the ui private route',
                name: `PRIVATE ROUTE - ${ item.url }`,
                scope: 'app' as TFeatureScope,
                tags: [],
                type: 'ui-route' as TFeatureType,
                value: `PRIVATE ROUTE - ${ item.url }`
            }
        }))

        // prepare and sync main drawer
        features.push(...this.navigations.privateNavs.mainNavs.reduce<IFeature[]>((acc, item) => {
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
        features.push(...this.navigations.privateNavs.sideNavs.reduce<IFeature[]>((acc, item) => {
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