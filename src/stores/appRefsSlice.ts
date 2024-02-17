import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFeature } from "../types/feature";
import { IRole } from "../types/role";

import Config from "../config";
// import { IUser } from "../types/user";
// import { IWorkspace } from "../types/workspace";

export type TAppTheme = 'light' | 'dark'

const savedTheme = localStorage.getItem(Config.AppThemeKey) || undefined;
const theme = savedTheme && savedTheme === 'light'? 'light': 'dark';

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
    appTheme: theme,
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