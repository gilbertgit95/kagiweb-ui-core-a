export type IActionType = 'invitation'

export interface IAccountActionInfo {
    _id: string,
    actionType: string,
    fromAccount: {
        _id: string,
        nameId: string
    },
    toAccount: {
        _id: string,
        nameId: string
    },
    workspace?: {
      _id: string,
      name: string
    },
    ref: {
      _id: string,
      accepted: boolean,
      declined: boolean,
      disabled: boolean,
      createdAt: Date,
      updatedAt: Date
    },
    refRole: {
      _id: string,
      name: string
    }
}

export const actionTypeMap:Record<IActionType, string> = {
  'invitation': 'Invitation'
}