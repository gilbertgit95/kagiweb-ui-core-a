import React from 'react'

export interface IAppRoute {
    url: string,
    page: React.ReactNode
}

export interface IAppNav {
    label: string,
    url: string,
    icon: React.FC
}

export interface IUserDrawer {
    label: string,
    url: string,
    action: () => void,
    icon: React.FC
}

class AppComponentsHandler {
    private routes:{privateRoutes:IAppRoute[], publicRoutes:IAppRoute[]} = {
        privateRoutes: [],
        publicRoutes: []
    }
    private mainDrawer:{workspaceNavs:IAppNav[], userNavs:IAppNav[], globalNavs:IAppNav[]} = {
        workspaceNavs: [],
        userNavs: [],
        globalNavs: []
    }
    private userDrawer:{privateUserDrawers:IUserDrawer[], publicUserDrawers:IUserDrawer[]} = {
        privateUserDrawers:[],
        publicUserDrawers:[]
    }

    public addPrivateRoute(route:IAppRoute):void {
        this.routes.privateRoutes.push(route)
    }
    public addPublicRoute(route:IAppRoute):void {
        this.routes.publicRoutes.push(route)
    }

    public addMainDrawerWorkspaceNav(nav:IAppNav):void {
        this.mainDrawer.workspaceNavs.push(nav)
    }
    public addMainDrawerUserNav(nav:IAppNav):void {
        this.mainDrawer.userNavs.push(nav)
    }
    public addMainDrawerGlobalNav(nav:IAppNav):void {
        this.mainDrawer.globalNavs.push(nav)
    }

    public addPrivateUserDrawerNav(nav:IUserDrawer):void {
        this.userDrawer.privateUserDrawers.push(nav)
    }
    public addPublicUserDrawerNav(nav:IUserDrawer):void {
        this.userDrawer.publicUserDrawers.push(nav)
    }

}

export default AppComponentsHandler