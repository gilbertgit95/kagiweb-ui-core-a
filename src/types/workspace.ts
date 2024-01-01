export interface IUserRef {
    _id?: string,
    userId: string,
    readAccess: boolean,
    writeAccess: boolean
}

export interface IWorkspace {
    _id?: string,
    name: string,
    description?: string,
    usersRefs?: IUserRef[],
    isActive?: boolean,
    disabled?: boolean,
    owner: string,
    createdBy: string,
    modifiedBy: string,
}