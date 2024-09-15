import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Box, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import ListIcon from '@mui/icons-material/List';
import TableViewIcon from '@mui/icons-material/TableView';
import Stack from '@mui/material/Stack';

import PrimaryHeader from '../../components/headers/primaryHeader';
import FeaturesListReadOnlyView from './featuresListReadOnlyView';
import FeaturesGroupedReadOnlyView from './featuresGroupedReadOnlyView';

const FeaturesPage = () => {
    let [searchParams] = useSearchParams()
    const view = searchParams.get('view')
    const viewTypes = ['list', 'grouped']
    const [viewType, setViewType] = useState<string|null>((new Set(viewTypes)).has(view || '')? view: viewTypes[0])

    const navigate = useNavigate()

    const onClickView = (vType:string) => {
        setViewType(vType)
        window.history.replaceState(null, '', `?view=${ vType }`)
    }

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Feature List View'} />
                    <Divider />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}>
                        <ButtonGroup>
                            <Button
                                size="small"
                                onClick={() => {
                                    onClickView('list')
                                }}
                                variant={viewType === 'list'? 'contained': 'outlined'}>
                                <ListIcon />
                            </Button>
                            <Button
                                size="small"
                                onClick={() => {
                                    onClickView('grouped')
                                }}
                                variant={viewType === 'grouped'? 'contained': 'outlined'}>
                                <TableViewIcon />
                            </Button>
                        </ButtonGroup>
                        {/* <Typography
                            component="span"
                            variant="subtitle1"
                            color="primary">
                            Group View
                        </Typography> */}
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
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
                { viewType === 'list'? <FeaturesListReadOnlyView />: null }
                { viewType === 'grouped'? <FeaturesGroupedReadOnlyView />: null }
            </Grid>
        </Container>
    )
}

export default FeaturesPage