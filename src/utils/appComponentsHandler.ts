import React from 'react'
import { TLinkGroup } from '../components/navs/primaryNav'

export interface IAppRoute {
    url: string,
    page: React.FC
}

class AppComponentsHandler {
    public routes:{privateRoutes:IAppRoute[], publicRoutes:IAppRoute[]} = {
        privateRoutes: [],
        publicRoutes: []
    }
    public mainDrawer:TLinkGroup[] = []
    public userDrawer:{privateUserDrawers:TLinkGroup[], publicUserDrawers:TLinkGroup[]} = {
        privateUserDrawers:[],
        publicUserDrawers:[]
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