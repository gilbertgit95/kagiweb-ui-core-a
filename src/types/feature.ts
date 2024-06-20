export type TFeatureType = 'api-route' | 'ui-route' | 'ui-main-drawer' | 'ui-user-drawer'
export const featureTypes:TFeatureType[] = ['api-route', 'ui-route', 'ui-main-drawer', 'ui-user-drawer']

// create interfaces
export interface IFeature {
    _id?: string,
    name?: string,
    type?: TFeatureType,
    tags?: string[],
    value: string,
    description?: string
}