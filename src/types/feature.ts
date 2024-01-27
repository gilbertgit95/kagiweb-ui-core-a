
export type TFeatureType = 'api-route' | 'ui-route' | 'ui-module'
export const featureTypes:TFeatureType[] = ['api-route', 'ui-route', 'ui-module']

// create interfaces
export interface IFeature {
    _id?: string,
    name?: string,
    type?: TFeatureType,
    tags?: string[],
    value: string,
    description?: string
}