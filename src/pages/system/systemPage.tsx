import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material'
import { Container, Button, Divider } from '@mui/material';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import PrimaryHeader from '../../components/headers/primaryHeader';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import SystemService from './systemService';
import { ISystemInfo } from '../../dataEndpoints/apiCoreA/systemApi';

const SystemPage = () => {
    const [systemInfo, setSystemInfo] = useState<ISystemInfo>({
        currentDir: null,
        appPort: null,
        localWifiAddress: null,
        localEthernetAddress: null,
        os: null
    })
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const navigate = useNavigate()

    const colDef:IColDef[] = [
        {
            header: 'Field',
            field: 'field'
        },
        {
            header: 'Value',
            field: 'value'
        }
    ]

    const data:{field: string, value: string|undefined}[] = [
        { field: 'Current Directory', value: systemInfo?.currentDir || '--' },
        { field: 'Server Port', value: systemInfo?.appPort || '--' },
        { field: 'Local WIFI Address', value: systemInfo?.localWifiAddress || '--' },
        { field: 'Local Ethernet Address', value: systemInfo?.localEthernetAddress || '--' },
        { field: 'Operating System', value: systemInfo?.os || '--' }
    ]

    useEffect(() => {
        const init = async () => {
            try {
                const sysInfo = await SystemService.getSystemInfo()
                console.log(sysInfo)
                setSystemInfo(sysInfo.data)
            } catch (err:any) {
                setInfoAndErrors({
                    ...{infoMessages: []},
                    ...{errorMessages: [err?.response?.data?.message || '']}
                })
            }
        }

        init()
    }, [])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid item xs={12}>
                <PrimaryHeader title={'System Info'} />
                <Divider />
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button
                        variant="text"
                        startIcon={<ArrowBackIosNewIcon />}
                        onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                 <PrimaryTable
                    columnDefs={colDef}
                    data={data} />
            </Grid>
            <Grid item xs={12}>
                <ResponseStatus {...infoAndErrors} />
            </Grid>
        </Container>
        // <Grid
        //     container
        //     spacing={2}
        //     direction="column"
        //     alignItems="center"
        //     justifyContent="center"
        //     sx={{ minHeight: '80vh' }}>
        //     <Grid item xs={12}>
        //         <Typography color='primary' variant='h5'>System Info</Typography>
        //         <PrimaryTable
        //             columnDefs={colDef}
        //             data={data} />
        //     </Grid>
        //     <Grid item xs={12}>
        //         <ResponseStatus {...infoAndErrors} />
        //     </Grid>
        // </Grid>
    )
}

export default SystemPage