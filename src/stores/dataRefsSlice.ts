import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFeature } from "../types/feature";
import { IRole } from "../types/role";
import { IUser } from "../types/user";
import { IWorkspace } from "../types/workspace";

export interface IDataRefs {
    roles: IRole[]|undefined,
    features: IFeature[]|undefined
}

export interface IOptDataRefs {
    roles?: IRole[]|undefined,
    features?: IFeature[]|undefined
}

const initialState:IDataRefs = {
    roles: undefined,
    features: undefined
}

export const DataRefs = createSlice({
    name: 'dataRefs',
    initialState,
    reducers: {
        setDataRefs: (
            state,
            action: PayloadAction<IDataRefs>
        ) => {
            if (action.payload.roles) state.roles = action.payload.roles
            if (action.payload.features) state.features = action.payload.features
        },
        clearDataRefs: (state) => {
            state.roles = undefined
            state.features = undefined
        }
    }
})

export const { setDataRefs, clearDataRefs } = DataRefs.actions
export default DataRefs.reducer