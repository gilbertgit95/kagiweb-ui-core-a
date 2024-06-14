import React from 'react'
import { TLinkGroup } from '../components/navs/primaryNav'

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

}

const appComponentsHandler = new AppComponentsHandler()

export default appComponentsHandler