export type TFeatureScope = 'app' | 'account' | 'workspace'
export type TFeatureType = 'api-route' | 'ui-route' | 'ui-main-drawer' | 'ui-account-drawer'

export const featureScopes:TFeatureScope[] = ['app', 'account', 'workspace']
export const featureTypes:TFeatureType[] = ['api-route', 'ui-route', 'ui-main-drawer', 'ui-account-drawer']

// create interfaces
export interface IFeature {
    _id?: string,
    name?: string,
    type?: TFeatureType,
    scope?: TFeatureScope,
    tags?: string[],
    value: string,
    description?: string
}