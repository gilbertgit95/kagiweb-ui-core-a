import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFeature } from "../types/feature";
import { IRole } from "../types/role";

import appComponentsHandler from '../utils/appComponentsHandler'

export type TAppTheme = 'light' | 'dark'
export const appThemes:TAppTheme[] = ['light' , 'dark']

const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches? 'dark': 'light';
const savedTheme = localStorage.getItem(appComponentsHandler.appConfig.AppThemeKey) || undefined;
const theme = (savedTheme && (new Set<string>(appThemes)).has(savedTheme))? savedTheme: systemTheme;

export interface IAppRefs {
    appTheme: TAppTheme,
    roles: IRole[]|undefined,
    features: IFeature[]|undefined
}

export interface IOptAppRefs {
    appTheme?: TAppTheme,
    roles?: IRole[]|undefined,
    features?: IFeature[]|undefined
}

const initialState:IAppRefs = {
    appTheme: theme as TAppTheme,
    roles: undefined,
    features: undefined
}

export const AppRefs = createSlice({
    name: 'appRefs',
    initialState,
    reducers: {
        setAppRefs: (
            state,
            action: PayloadAction<IOptAppRefs>
        ) => {
            if (action.payload.appTheme) state.appTheme = action.payload.appTheme
            if (action.payload.roles) state.roles = action.payload.roles
            if (action.payload.features) state.features = action.payload.features
        },
        clearAppRefs: (state) => {
            state.appTheme = 'light'
            state.roles = undefined
            state.features = undefined
        },
        toggleTheme: (state) => {
            state.appTheme = state.appTheme === 'light'? 'dark': 'light'
        }
    }
})

export const { setAppRefs, clearAppRefs, toggleTheme } = AppRefs.actions
export default AppRefs.reducer