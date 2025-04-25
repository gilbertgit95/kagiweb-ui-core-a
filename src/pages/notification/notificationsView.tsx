import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

import {IChangeDate} from '../../components/dates/dateChanges';
import Notification from './notification';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';

import appComponentsHandler from '../../utils/appComponentsHandler'
import { INotification } from '../../types/notification';
import { IPagination, IPageQuery } from "../../types/mixTypes"

interface IProps {
    accountId: string,
    pageQuery: number,
    pageSizeQuery: number,
    getFunc: (accountId:string, pageQuery:IPageQuery) => Promise<{data:IPagination<INotification>}>,
    updateFunc: (accountId:string, ntifId:string, notification:INotification) => Promise<{data:INotification}>,
    onReload?: () => void
}

interface INotificationRow {
    _id: string,
    type: string,
    title: string,
    message: string,
    links: {url:string, label:string}[],
    seen: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    onSeen?: (val:boolean) => void,
    onViewLink?: (link:string) => void
}

const colDef:IColDef[] = [
    {
        header: 'Notifications',
        field: '',
        Component: (props:INotificationRow) => {
            return props.links? (
                <Notification {...props} />
            ): null
        }
    }
]

const NotificationsView = ({accountId, pageQuery, pageSizeQuery, getFunc, updateFunc, onReload}:IProps) => {

    const [pagination, setPagination] = useState({
        page: 0,
        pageSize: pageSizeQuery,
        totalItems: 0,
        pageSizeList: appComponentsHandler.appConfig.defaultPageSizeList
    })
    const [data, setData] = useState<INotificationRow[]>([])

    const search = async (page:number, pageSize:number) => {
        // console.log('pagination: ', pagination)
        window.history.replaceState(null, '', `?page=${ page + 1 }&pageSize=${ pageSize }`)
        try {
            if (!accountId) return
            const resp = await getFunc(accountId, {
                page: page + 1,
                pageSize: pageSize
            })
            if (resp.data && resp.data.items) {
                const tarnsformedData:(INotificationRow & IChangeDate)[] = resp.data.items.map((item:INotification & IChangeDate) => {
                    return {
                        _id: item._id || '',
                        type: item.type || '--',
                        title: item.title || '--',
                        message:  item.message || '--',
                        links:  item.links || [],
                        seen: Boolean(item.seen),
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt,
                        onSeen: async (val) => {

                            try {
                                await updateFunc(
                                    accountId,
                                    item._id || '',
                                    {seen: !item.seen}
                                )
                                await search(page, pageSize)
                                if (onReload) await onReload()
                            } catch (err) {
                                console.log(err)
                            }
                        },
                        onViewLink: async (link) => {
                            console.log('click view link: ', link)
                            window.open(link,'_blank');
                            try {
                                // console.log('click view link: ', link)
                                window.open(link,'_blank');
                                await updateFunc(
                                    accountId,
                                    item._id || '',
                                    {seen: true}
                                )

                                await search(page, pageSize)
                                if (onReload) await onReload()
                            } catch (err) {
                                console.log(err)
                            }
                        }
                    }
                })
                setPagination({
                    page: resp.data.page - 1,
                    pageSize: resp.data.pageSize,
                    totalItems: resp.data.totalItems,
                    pageSizeList: appComponentsHandler.appConfig.defaultPageSizeList
                })
                setData(tarnsformedData)
            }
            // console.log(resp.data)
        } catch (err) {
        }
    }

    const onPageChange = (
        e:React.MouseEvent<HTMLButtonElement> | null,
        newPage:number) => {
        // setPagination({...pagination, ...{page: newPage}})
        search(newPage, pagination.pageSize)
    }

    const onPageSizeChange = (
        e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        newPageSize:number) => {
            // setPagination({...pagination, ...{pageSize: newPageSize}})
        search(0, newPageSize)
    }

    useEffect(() => {
        const init = async () => {
            window.history.replaceState(null, '', `?page=${ pageQuery }&pageSize=${ pageSizeQuery }`)
            try {
                if (!accountId) return
                const resp = await getFunc(accountId, {
                    page: pageQuery,
                    pageSize: pageSizeQuery
                })
                if (resp.data && resp.data.items) {
                    const tarnsformedData:(INotificationRow & IChangeDate)[] = resp.data.items.map((item:INotification & IChangeDate) => {
                        return {
                            _id: item._id || '',
                            type: item.type || '--',
                            title: item.title || '--',
                            message:  item.message || '--',
                            links:  item.links || [],
                            seen: Boolean(item.seen),
                            createdAt: item.createdAt,
                            updatedAt: item.updatedAt,
                            onSeen: async (val) => {
                                // const data = {
                                //     seen: val
                                // }

                                await updateFunc(
                                    accountId,
                                    item._id || '',
                                    {seen: val}
                                )

                                await init()
                                if (onReload) await onReload()
                            },
                            onViewLink: async (link) => {
                                // console.log('click view link: ', link)
                                window.open(link,'_blank');
                                await updateFunc(
                                    accountId,
                                    item._id || '',
                                    {seen: true}
                                )

                                await init()
                                if (onReload) await onReload()
                            }
                        }
                    })
                    setPagination({
                        page: resp.data.page - 1,
                        pageSize: resp.data.pageSize,
                        totalItems: resp.data.totalItems,
                        pageSizeList: appComponentsHandler.appConfig.defaultPageSizeList
                    })
                    setData(tarnsformedData)
                }
                // console.log(resp.data)
            } catch (err) {
            }
        }
        console.log('initiate notifications page')
        init()
    }, [pageQuery, pageSizeQuery])


    return (
        <Grid item xs={12}>
            <PrimaryTable
                noHeader
                minimalStyle
                // maxHeight={650}
                pagination={pagination}
                columnDefs={colDef}
                data={data}
                onPageChange={onPageChange}
                onRowsPerPageChange={onPageSizeChange} />
        </Grid>
    )
}

export default NotificationsView