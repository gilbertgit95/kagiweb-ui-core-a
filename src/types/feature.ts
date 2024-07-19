export type TFeatureType = 'api-route' | 'ui-route' | 'ui-main-drawer' | 'ui-account-drawer'
export const featureTypes:TFeatureType[] = ['api-route', 'ui-route', 'ui-main-drawer', 'ui-account-drawer']

// create interfaces
export interface IFeature {
    _id?: string,
    name?: string,
    type?: TFeatureType,
    tags?: string[],
    value: string,
    description?: string
}