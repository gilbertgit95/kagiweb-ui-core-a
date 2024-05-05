import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
// import VisibilityIcon from '@mui/icons-material/Visibility';

import PrimaryHeader from '../../components/headers/primaryHeader';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import TreeDirectory, { IDir } from '../../components/navs/treeDirectory';
import DateChanges, {IChangeDate} from '../../components/dates/dateChanges';
import ListItems from '../../components/lists/listItems';
import ShortendDescription from '../../components/texts/shortendDescription';
import SimpleLink from '../../components/links/simpleLink';
import { useAppSelector} from '../../stores/appStore';
import { IFeature } from '../../types/feature';
import Users from '../user/usersPage';

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

const FeaturesGroupedReadOnlyView = () => {
    const navigate = useNavigate()
    const features:IFeature[] = useAppSelector(state => state.appRefs.features) || []
    const [data, setData] = useState<(IFeatureRow & IChangeDate)[]>([])

    // grouped features by
    // - features
    // - roles
    //     - role features
    // - users
    //     - user infos
    //     - contact infos
    //     - roles
    //     - limited transactions
    //     - passwords
    //     - workspaces
    //     - client devices
    //         - tokens

    // - owner
    //     - user infos
    //     - contact infos
    //     - roles
    //     - limited transactions
    //     - passwords
    //     - workspaces
    //     - client devices
    //         - tokens

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

    const testDir:IDir[] = [
        {
            name: 'System',
            subDir: [
                
            ]
        },
        {
            name: 'Features',
            subDir: [

            ]
        },
        {
            name: 'Roles',
            subDir: [
                {
                    name: 'Role Features',
                    subDir: []
                }
            ]
        },
        {
            name: 'Users',
            subDir: [
                {
                    name: 'User Infos',
                    subDir: [
                        
                    ]
                },
                {
                    name: 'Contact Infos',
                    subDir: [
        
                    ]
                },
                {
                    name: 'Limited Transactions',
                    subDir: [
                        
                    ]
                },
                {
                    name: 'Roles',
                    subDir: [
        
                    ]
                },
                {
                    name: 'Passwords',
                    subDir: [
                        
                    ]
                },
                {
                    name: 'Client Devices',
                    subDir: [
                        {
                            name: 'Tokens',
                            subDir: [
                            ]
                        },
                    ]
                },
            ]
        },
        {
            name: 'Owner',
            subDir: [
                {
                    name: 'User Infos',
                    subDir: [
                        
                    ]
                },
                {
                    name: 'Contact Infos',
                    subDir: [
        
                    ]
                },
                {
                    name: 'Limited Transactions',
                    subDir: [
                        
                    ]
                },
                {
                    name: 'Roles',
                    subDir: [
        
                    ]
                },
                {
                    name: 'Passwords',
                    subDir: [
                        
                    ]
                },
                {
                    name: 'Client Devices',
                    subDir: [
                        {
                            name: 'Tokens',
                            subDir: [
                            ]
                        },
                    ]
                },
            ]
        }
    ]

    return (
        <>
            <Grid item xs={12} md={3}>
                <TreeDirectory
                    directories={testDir} />
            </Grid>
            <Grid item xs={12} md={9}>
                <PrimaryTable
                    maxHeight={800}
                    columnDefs={colDef}
                    data={data} />
            </Grid>
        </>
    )
}

export default FeaturesGroupedReadOnlyView