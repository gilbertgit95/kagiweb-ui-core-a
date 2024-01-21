import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "@mui/material";
import Grid from '@mui/material/Grid';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';

import PrimaryTable, { IColDef } from "../../components/tables/primaryTable";
import { useSearchParams } from 'react-router-dom';

import FeatureService from "./featureService";
// import { IUser } from "../../types/user";
// import { IPagination } from "../../types/mixTypes";

interface IFeatureRow {
    _id: string,
    name: string,
    value: string,
    type: string,
    tags: string
}

const colDef:IColDef[] = [
    {
        header: 'Name',
        field: 'name',
        Component: undefined // react Component or undefined
    },
    {
        header: 'Value',
        field: 'value',
        Component: undefined // react Component or undefined
    },
    {
        header: 'Type',
        field: 'type',
        Component: undefined // react Component or undefined
    },
    {
        header: 'Tags',
        field: 'tags',
        Component: undefined // react Component or undefined
    },
    // {
    //     header: 'ID',
    //     field: '_id',
    //     Component: undefined // react Component or undefined
    // },
    {
        header: '',
        field: '',
        Component: (props:IFeatureRow) => {
            const navigate = useNavigate()

            return (
                <Button
                    onClick={() => navigate(`/features/${ props._id }`)}
                    variant="text">View Feature</Button>
            )
        }
    }
]

const defaultPageSizeList = [1, 5, 10, 25, 100]
const defaultPageSize = 10
const defaultPage = 1

const Features = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const pageQuery = parseInt(searchParams.get('page') || '') || defaultPage;
    const pageSizeQuery = parseInt(searchParams.get('pageSize') || '') || defaultPageSize;

    const [pagination, setPagination] = useState({
        page: 0,
        pageSize: pageSizeQuery,
        totalItems: 0,
        pageSizeList: defaultPageSizeList
    })
    const [data, setData] = useState<IFeatureRow[]>([])

    const search = async (page:number, pageSize:number) => {
        // console.log('pagination: ', pagination)
        window.history.replaceState(null, '', `?page=${ page + 1 }&pageSize=${ pageSize }`)
        try {
            const resp = await FeatureService.getFeatures({
                page: page + 1,
                pageSize: pageSize
            })
            if (resp.data && resp.data.items) {
                const tarnsformedData:IFeatureRow[] = resp.data.items.map(item => {
                    return {
                        _id: item._id || '',
                        name: item.name || '--',
                        value: item.value || '--',
                        type: item.type || '--',
                        tags: item.tags?.join(', ') || '--'
                    }
                })
                setPagination({
                    page: resp.data.page - 1,
                    pageSize: resp.data.pageSize,
                    totalItems: resp.data.totalItems,
                    pageSizeList: defaultPageSizeList
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
                    const tarnsformedData:IFeatureRow[] = resp.data.items.map((item) => {
                        return {
                            _id: item._id || '',
                            name: item.name || '--',
                            value: item.value || '--',
                            type: item.type || '--',
                            tags: item.tags?.join(', ') || '--'
                        }
                    })
                    setPagination({
                        page: resp.data.page - 1,
                        pageSize: resp.data.pageSize,
                        totalItems: resp.data.totalItems,
                        pageSizeList: defaultPageSizeList
                    })
                    setData(tarnsformedData)
                }
                // console.log(resp.data)
            } catch (err) {
            }
        }
        console.log('initiate features page')
        init()
    }, [])


    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button
                        variant="text"
                        startIcon={<FeaturedPlayListIcon />}
                        onClick={() => navigate('/features/create')}>
                        Create Feature
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <PrimaryTable
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

export default Features