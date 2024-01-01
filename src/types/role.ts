export interface IFeatureRef {
    _id?: string,
    featureId: string
}

export interface IRole {
    _id?: string,
    name: string,
    level: number,
    reqLimitPerSec: number,
    description?: string,
    absoluteAuthority?: boolean,
    featuresRefs?: IFeatureRef[]
}