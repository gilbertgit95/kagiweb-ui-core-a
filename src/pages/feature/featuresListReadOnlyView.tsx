import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
// import VisibilityIcon from '@mui/icons-material/Visibility';

import PrimaryHeader from '../../components/headers/primaryHeader';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import DateChanges, {IChangeDate} from '../../components/dates/dateChanges';
import ListItems from '../../components/lists/listItems';
import ShortendDescription from '../../components/texts/shortendDescription';
import SimpleLink from '../../components/links/simpleLink';
import { useAppSelector} from '../../stores/appStore';
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
            return (
                <SimpleLink
                    link={`/features/view/${ props._id }`}
                    text="View Feature" />
            )
        }
    }
]

const FeaturesListReadOnlyView = () => {
    const navigate = useNavigate()
    const features:IFeature[] = useAppSelector(state => state.appRefs.features) || []
    const [data, setData] = useState<(IFeatureRow & IChangeDate)[]>([])

    useEffect(() => {
        const init = async () => {
            try {
                if (features) {
                    const tarnsformedData:(IFeatureRow & IChangeDate)[] = features.map((item:IFeature & IChangeDate) => {
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
                    setData(tarnsformedData)
                }
            } catch (err) {
            }
        }
        console.log('initiate features page')
        init()
    }, [features])


    return (
        <Grid item xs={12}>
            <PrimaryTable
                maxHeight={700}
                columnDefs={colDef}
                data={data} />
        </Grid>
    )
}

export default FeaturesListReadOnlyView