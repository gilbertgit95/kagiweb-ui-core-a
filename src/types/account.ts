// types
export type TAccountType = 'user' | 'organization'
export type TContactInfoType = 'email-address' | 'mobile-number' | 'telephone' | 'app-admin'
export type TLimitedTransactionType = 'signin' | 'otp-signin' | 'forgot-pass'| 'reset-pass' | 'verify-contact'
export type TAccountInfoType = 'string' | 'number' | 'date' | 'boolean'
export type TAccountConfigType = 'string' | 'number' | 'date' | 'datetime' | 'boolean'

export const acountTypes:TAccountType[] = ['user', 'organization']
export const contactInfoTypes = ['email-address', 'mobile-number', 'telephone', 'app-admin']
export const limitedTransactionTypes = ['signin', 'otp-signin', 'forgot-pass', 'reset-pass', 'verify-contact']
export const accountInfoTypes = ['string', 'number', 'date', 'boolean']
export const accountConfigTypes:TAccountConfigType[] = ['string', 'number', 'date', 'datetime', 'boolean']

// create interfaces
export interface IRoleRef {
    _id?: string,
    roleId: string
}

export interface IPassword {
    _id?: string,
    key: string,
    expTime?: Date,
    isActive?: boolean
}

export interface IContactInfo {
    _id?: string,
    type: TContactInfoType,
    value: string,
    countryCode?: string,
    verified?: boolean
}

export interface IAccessToken {
    _id?: string,
    jwt: string,
    description?: string,
    ipAddress?: string,
    expTime?: Date,
    disabled?: boolean
}

export interface IClientDevice {
    _id?: string,
    ua: string,
    description?: string,
    accessTokens?: IAccessToken[],
    disabled?: boolean
}

export interface IParsedClientDevice {
    browser: {
        name: string | undefined,
        version: string | undefined,
        major: string | undefined
    },
    engine: {
        name: string | undefined,
        version: string | undefined,
    },
    os: {
        name: string | undefined,
        version: string | undefined,
    },
    device: {
        vendor: string | undefined,
        model: string | undefined,
        type: string | undefined,
    },
    cpu: {
        architecture: string | undefined,
    }
}

export interface ILimitedTransaction {
    _id?: string,
    limit: number,
    attempts: number,
    type: TLimitedTransactionType,
    key?: string,
    value?: string, // optional, can be use to store additional info
    expTime?: Date, // optional expiration time, only for timed LT
    recipient?: string, // optional, only for some LT like: otp, pass reset
    disabled?: boolean
}

export interface IAccountInfo {
    _id?: string,
    key: string,
    value: string,
    type: TAccountInfoType
}

export interface IAccountConfig {
    _id?: string,
    key: string,
    value: string,
    type: TAccountConfigType
}

export interface IAccountAccountRef {
    _id?: string,
    accountId: string,
    rolesRefs?: IRoleRef[],
    accountConfigs?: IAccountConfig[],
    declined?: boolean,
    accepted?: boolean,
    disabled?: boolean
}

export interface IWorkspaceAccountRef {
    _id?: string,
    accountId: string,
    rolesRefs?: IRoleRef[],
    accountConfigs?: IAccountConfig[],
    accepted?: boolean,
    declined?: boolean,
    disabled?: boolean
}

export interface IWorkspace {
    _id?: string,
    name: string,
    description?: string,
    accountRefs?: IWorkspaceAccountRef[],
    disabled?: boolean
}

export interface IAccount {
    _id?: string,
    accountType?: TAccountType,
    nameId: string,
    rolesRefs: IRoleRef[],
    accountInfos: IAccountInfo[],
    accountConfigs: IAccountConfig[],

    accountRefs?: IAccountAccountRef[],
    passwords: IPassword[],

    contactInfos: IContactInfo[],
    clientDevices: IClientDevice[],

    limitedTransactions: ILimitedTransaction[],

    workspaces: IWorkspace[],

    disabled?: boolean,
    verified?: boolean
}

export interface IAccountUpdate {
    _id?: string,
    nameId?: string,
    disabled?: boolean,
    verified?: boolean
}