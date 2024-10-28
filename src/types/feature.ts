export type TFeatureScope = 'account' | 'workspace'
export type TFeatureType = 'api-route' | 'ui-route' | 'ui-main-drawer' | 'ui-account-drawer' | 'workspace-access'

export const featureScopes:TFeatureScope[] = ['account', 'workspace']
export const featureTypes:TFeatureType[] = ['api-route', 'ui-route', 'ui-main-drawer', 'ui-account-drawer', 'workspace-access']

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