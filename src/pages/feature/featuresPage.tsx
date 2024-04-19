import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import VisibilityIcon from '@mui/icons-material/Visibility';

import PrimaryHeader from '../../components/headers/primaryHeader';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import { useSearchParams } from 'react-router-dom';
import DateChanges, {IChangeDate} from '../../components/dates/dateChanges';
import ListItems from '../../components/lists/listItems';
import ShortendDescription from '../../components/texts/shortendDescription';
import FeatureService from './featureService';
import Config from '../../config';
import { IFeature } from '../../types/feature';

interface IFeatureRow {
    _id: string,
    name: string,
    value: string,
    type: string,
    tags: string[]
}

const colDef:IColDef[] = [
    {
        header: 'Name',
        field: '',
        Component: (props:IFeatureRow & IChangeDate) => {
            return <ShortendDescription value={props.name} />
        }
    },
    {
        header: 'Value',
        field: '',
        Component: (props:IFeatureRow & IChangeDate) => {
            return <ShortendDescription value={props.value} />
        }
    },
    {
        header: 'Type',
        field: 'type',
        Component: undefined // react Component or undefined
    },
    {
        header: 'Tags',
        field: '',
        Component: (props:IFeatureRow & IChangeDate) => {
            return <ListItems items={props.tags} />
        }
    },
    {
        header: 'Changed',
        field: '',
        Component: (props:IFeatureRow & IChangeDate) => {
            return <DateChanges {...props} />
        }
    },
    {
        header: '',
        field: '',
        Component: (props:IFeatureRow & IChangeDate) => {
            const navigate = useNavigate()

            return (
                <Button
                    startIcon={<VisibilityIcon />}
                    onClick={() => navigate(`/features/view/${ props._id }`)}
                    variant="text">View Feature</Button>
            )
        }
    }
]

const FeaturesPage = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const pageQuery = parseInt(searchParams.get('page') || '') || Config.defaultPage;
    const pageSizeQuery = parseInt(searchParams.get('pageSize') || '') || Config.defaultPageSize;

    const [pagination, setPagination] = useState({
        page: 0,
        pageSize: pageSizeQuery,
        totalItems: 0,
        pageSizeList: Config.defaultPageSizeList
    })
    const [data, setData] = useState<(IFeatureRow & IChangeDate)[]>([])

    const search = async (page:number, pageSize:number) => {
        // console.log('pagination: ', pagination)
        window.history.replaceState(null, '', `?page=${ page + 1 }&pageSize=${ pageSize }`)
        try {
            const resp = await FeatureService.getFeatures({
                page: page + 1,
                pageSize: pageSize
            })
            if (resp.data && resp.data.items) {
                const tarnsformedData:(IFeatureRow & IChangeDate)[] = resp.data.items.map((item:IFeature & IChangeDate) => {
                    return {
                        _id: item._id || '',
                        name: item.name || '--',
                        value: item.value || '--',
                        type: item.type || '--',
                        tags: item.tags || [],
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt
                    }
                })
                setPagination({
                    page: resp.data.page - 1,
                    pageSize: resp.data.pageSize,
                    totalItems: resp.data.totalItems,
                    pageSizeList: Config.defaultPageSizeList
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
                const resp = await FeatureService.getFeatures({
                    page: pageQuery,
                    pageSize: pageSizeQuery
                })
                if (resp.data && resp.data.items) {
                    const tarnsformedData:(IFeatureRow & IChangeDate)[] = resp.data.items.map((item:IFeature & IChangeDate) => {
                        return {
                            _id: item._id || '',
                            name: item.name || '--',
                            value: item.value || '--',
                            type: item.type || '--',
                            tags: item.tags || [],
                            createdAt: item.createdAt,
                            updatedAt: item.updatedAt
                        }
                    })
                    setPagination({
                        page: resp.data.page - 1,
                        pageSize: resp.data.pageSize,
                        totalItems: resp.data.totalItems,
                        pageSizeList: Config.defaultPageSizeList
                    })
                    setData(tarnsformedData)
                }
                // console.log(resp.data)
            } catch (err) {
            }
        }
        console.log('initiate features page')
        init()
    }, [pageQuery, pageSizeQuery])


    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Feature List View'} />
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
                            startIcon={<FeaturedPlayListIcon />}
                            onClick={() => navigate('/features/create')}>
                            Create Feature
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <PrimaryTable
                        maxHeight={700}
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

export default FeaturesPage