// types
export type TContactInfoType = 'email-address' | 'mobile-number' | 'telephone' | 'app-admin'
export type TLimitedTransactionType = 'signin' | 'otp-signin' | 'forgot-pass'| 'reset-pass' | 'verify-contact'
export type TUserInfoType = 'string' | 'number' | 'date' | 'boolean'

export const contactInfoTypes = ['email-address', 'mobile-number', 'telephone', 'app-admin']
export const limitedTransactionTypes = ['signin', 'otp-signin', 'forgot-pass', 'reset-pass', 'verify-contact']
export const userInfoTypes = ['string', 'number', 'date', 'boolean']

// create interfaces
export interface IRoleRef {
    _id?: string,
    roleId: string,
    isActive?: boolean
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
    expTime?: string, // optional expiration time, only for timed LT
    recipient?: string, // optional, only for some LT like: otp, pass reset
    disabled?: boolean
}

export interface IUserInfo {
    _id?: string,
    key: string,
    value: string,
    type: TUserInfoType
}

export interface IWorkspaceUserRef {
    _id?: string,
    userId: string,
    username: string,
    readAccess?: boolean,
    updateAccess?: boolean,
    createAccess?: boolean,
    deleteAccess?: boolean,
    accepted?: boolean,
    declined?: boolean,
    disabled?: boolean
}

export interface IWorkspace {
    _id?: string,
    name: string,
    description?: string,
    userRefs?: IWorkspaceUserRef[],
    isActive?: boolean,
    disabled?: boolean
}

export interface IUser {
    _id?: string,
    username: string,
    rolesRefs: IRoleRef[],
    userInfos: IUserInfo[],

    passwords: IPassword[],

    contactInfos: IContactInfo[],
    clientDevices: IClientDevice[],

    limitedTransactions: ILimitedTransaction[],

    workspaces: IWorkspace[],

    disabled?: boolean,
    verified?: boolean
}

export interface IUserUpdate {
    _id?: string,
    username?: string,
    disabled?: boolean,
    verified?: boolean
}