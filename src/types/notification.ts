export type TNotificationType = 'info' | 'warning' | 'error' | 'success'

export const notificationTypes = ['info', 'warning', 'error', 'success']

// create interfaces
export interface INotification {
    _id?: string,
    accountId?: string,
    title?: string,
    message?: string,
    type?: TNotificationType,
    links?: {url:string, label:string}[],
    seen?: boolean
}