import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import PersonIcon from '@mui/icons-material/Person';
// import VisibilityIcon from '@mui/icons-material/Visibility';

import Check from '../../components/indicators/check';
import DateChanges, {IChangeDate} from '../../components/dates/dateChanges';
import SimpleLink from '../../components/links/simpleLink';
import PrimaryHeader from '../../components/headers/primaryHeader';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import { useSearchParams } from 'react-router-dom';

import AccountService from './accountService';
import { IAccount } from '../../types/account';
// import { IAccount } from "../../types/account";
// import { IPagination } from "../../types/mixTypes";
import appComponentsHandler from '../../utils/appComponentsHandler'

interface IAccountRow {
    _id: string,
    accountType: string,
    nameId: string,
    // name: string,
    email: string,
    phone: string,
    verified: boolean,
    disabled: boolean
}

const colDef:IColDef[] = [
    {
        header: 'Account Type',
        field: 'accountType',
        Component: (props:IAccountRow) => {
            return props.accountType === 'user'? <PersonIcon />: <ScatterPlotIcon />
        }
    },
    {
        header: 'NameID',
        field: 'nameId',
        Component: undefined // react Component or undefined
    },
    // {
    //     header: 'Name',
    //     field: 'name',
    //     Component: undefined // react Component or undefined
    // },
    {
        header: 'Email',
        field: 'email',
        Component: undefined // react Component or undefined
    },
    {
        header: 'Phone',
        field: 'phone',
        Component: undefined // react Component or undefined
    },
    {
        header: 'Verified',
        field: 'verified',
        Component: (props:IAccountRow) => {
            return <Check value={props.verified} />
        }
    },
    {
        header: 'Disabled',
        field: 'disabled',
        Component: (props:IAccountRow) => {
            return <Check value={props.disabled} />
        }
    },
    {
        header: 'Changed',
        field: '',
        Component: (props:IAccountRow & IChangeDate) => {
            return <DateChanges {...props} />
        }
    },
    {
        header: '',
        field: '',
        Component: (props:IAccountRow) => {
            return (
                <SimpleLink
                    link={`/accounts/view/${ props._id }`}
                    text={ props.accountType === 'user'? 'view user': 'view organization' } />
            )
        }
    }
]

const Accounts = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const pageQuery = parseInt(searchParams.get('page') || '') || appComponentsHandler.appConfig.defaultPage;
    const pageSizeQuery = parseInt(searchParams.get('pageSize') || '') || appComponentsHandler.appConfig.defaultPageSize;

    const [pagination, setPagination] = useState({
        page: 0,
        pageSize: pageSizeQuery,
        totalItems: 0,
        pageSizeList: appComponentsHandler.appConfig.defaultPageSizeList
    })
    const [data, setData] = useState<IAccountRow[]>([])

    const search = async (page:number, pageSize:number) => {
        // console.log('pagination: ', pagination)
        window.history.replaceState(null, '', `?page=${ page + 1 }&pageSize=${ pageSize }`)
        try {
            const resp = await AccountService.getAccounts({
                page: page + 1,
                pageSize: pageSize
            })
            if (resp.data && resp.data.items) {
                const tarnsformedData:(IAccountRow & IChangeDate)[] = resp.data.items.map((item:IAccount & IChangeDate) => {
                    return {
                        _id: item._id || '',
                        accountType: item.accountType || '--',
                        nameId: item.nameId,
                        // name: AccountService.getUserInfo(item, 'Fullname')?.value || '--',
                        email: AccountService.getContactInfo(item, 'email-address')?.value || '--',
                        phone: AccountService.getContactInfo(item, 'mobile-number')?.value || '--',
                        verified: Boolean(item.verified),
                        disabled: Boolean(item.disabled),
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
                const resp = await AccountService.getAccounts({
                    page: pageQuery,
                    pageSize: pageSizeQuery
                })
                if (resp.data && resp.data.items) {
                    const tarnsformedData:(IAccountRow & IChangeDate)[] = resp.data.items.map((item:IAccount & IChangeDate) => {
                        return {
                            _id: item._id || '',

                            accountType: item.accountType || '--',
                            nameId: item.nameId,
                            // name: AccountService.getUserInfo(item, 'Fullname')?.value || '--',
                            email: AccountService.getContactInfo(item, 'email-address')?.value || '--',
                            phone: AccountService.getContactInfo(item, 'mobile-number')?.value || '--',
                            verified: Boolean(item.verified),
                            disabled: Boolean(item.disabled),
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
        console.log('initiate accounts page')
        init()
    }, [pageQuery, pageSizeQuery])


    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Account List View'} />
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
                            onClick={() => navigate('/accounts/create')}>
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

export default Accounts