import React, { useEffect, useState } from 'react';
// import moment from 'moment';
// import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
// import { Button } from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import { IAccount, IContactInfo } from '../../types/account';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import Check from '../../components/indicators/check';
import DateChanges from '../../components/dates/dateChanges';
import SimpleLink from '../../components/links/simpleLink';

interface IProps {
    account: IAccount | undefined
}

interface IContactInfoRow {
    _id: string,
    type: string,
    value: string,
    verified: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

const AccountContactInfosReadOnlyView = ({account}:IProps) => {
    // const navigate = useNavigate()
    const [data, setData] = useState<IContactInfoRow[]>([])

    useEffect(() => {
        if (account && account.contactInfos) {
            const transformedData:IContactInfoRow[] = account.contactInfos.map((item:IContactInfo & {createdAt?: Date, updatedAt?: Date}) => {
                return {
                    _id: item._id || '',
                    type: item.type || '--',
                    value: item.value || '--',
                    verified: Boolean(item.verified),
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                }
            })
            // console.log(transformedData)
            setData(transformedData)
        }

    }, [account])

    const colDef:IColDef[] = [
        {
            header: 'Type',
            field: 'type'
        },
        {
            header: 'Value',
            field: 'value'
        },
        {
            header: 'Changed',
            field: '_id',
            Component: (props:IContactInfoRow) => {
                return <DateChanges {...props} />
            }
        },
        {
            header: 'Verified',
            field: 'verified',
            Component: (props:IContactInfoRow) => {
                return <Check value={props.verified} />
            }
        },
        {
            header: '',
            field: '_id',
            Component: (props:IContactInfoRow) => {
                return (
                    <SimpleLink
                        link={`${ props._id }`}
                        text="View account Contact" />
                )
            }
        }
    ]

    return (
        <Grid item xs={12}>
            <PrimaryTable
                maxHeight={700}
                columnDefs={colDef}
                data={data} />
        </Grid>
    )
}

export default AccountContactInfosReadOnlyView