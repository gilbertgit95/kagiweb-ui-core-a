export type TRoleScope = 'app' | 'account' | 'workspace'
export const roleScopes:TRoleScope[] = ['app', 'account', 'workspace']

export interface IFeatureRef {
    _id?: string,
    featureId: string
}

export interface IRole {
    _id?: string,
    name: string,
    scope?: TRoleScope,
    level: number,
    reqLimitPerSec: number,
    description?: string,
    absoluteAuthority?: boolean,
    featuresRefs?: IFeatureRef[]
}