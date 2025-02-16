import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import PersonIcon from '@mui/icons-material/Person';

import Check from '../../components/indicators/check';
import DateChanges, {IChangeDate} from '../../components/dates/dateChanges';
import SimpleLink from '../../components/links/simpleLink';
import PrimaryHeader from '../../components/headers/primaryHeader';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import { useSearchParams } from 'react-router-dom';

import NotificationService from './notificationService';
import appComponentsHandler from '../../utils/appComponentsHandler'
import { useAppSelector} from '../../stores/appStore';
import { link } from 'fs';
import { INotification } from '../../types/notification';

interface INotificationRow {
    _id: string,
    type: string,
    title: string,
    message: string,
    link: string,
    seen: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

const colDef:IColDef[] = [
    {
        header: 'Seen',
        field: 'seen',
        Component: (props:INotificationRow) => {
            return <Check value={props.seen} />
        }
    },
    {
        header: 'Changed',
        field: '',
        Component: (props:INotificationRow & IChangeDate) => {
            return <DateChanges {...props} />
        }
    },
    {
        header: '',
        field: '',
        Component: (props:INotificationRow) => {
            return props.link? (
                <SimpleLink
                    link={props.link}
                    text={'link'} />
            ): null
        }
    }
]

const Notifications = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const { accountId } = useParams()
    const accountData = useAppSelector(state => state.signedInAccount.accountData)
    const pageQuery = parseInt(searchParams.get('page') || '') || appComponentsHandler.appConfig.defaultPage;
    const pageSizeQuery = parseInt(searchParams.get('pageSize') || '') || appComponentsHandler.appConfig.defaultPageSize;

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
            const resp = await NotificationService.getAccountNotifications(accountId,{
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
                        link:  item.link || '--',
                        seen: Boolean(item.seen),
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt
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
                const resp = await NotificationService.getAccountNotifications(accountId, {
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
                            link:  item.link || '--',
                            seen: Boolean(item.seen),
                            createdAt: item.createdAt,
                            updatedAt: item.updatedAt
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
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Account Notifications View'} />
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}>
                        <Button
                            variant="text"
                            startIcon={<PersonAddIcon />}
                            onClick={() => navigate('/accounts/notifications')}>
                            Create Account
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <PrimaryTable
                        maxHeight={650}
                        pagination={pagination}
                        columnDefs={colDef}
                        data={data}
                        onPageChange={onPageChange}
                        onRowsPerPageChange={onPageSizeChange} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Notifications