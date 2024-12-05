import React from 'react';
import { Container, Grid, Divider, Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector} from '../../stores/appStore';
import PrimaryHeader from '../../components/headers/primaryHeader';
import AccountReadOnlyView from '../account/accountReadOnlyView';
import { useNavigate } from 'react-router-dom';

const OwnerPage = () => {
    const navigate = useNavigate()
    const accountData = useAppSelector(state => state.signedInAccount.accountData)

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={ 'Owner' } subtitle={ accountData?.nameId } />
                    <Divider />
                </Grid>
                <Grid item xs={12} style={{alignContent: 'right'}}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}>
                        <Button
                            variant="text"
                            startIcon={<EditIcon />}
                            onClick={() => navigate(`/owner/edit`)}>
                            Edit
                        </Button>
                    </Box>
                </Grid>
                <AccountReadOnlyView account={accountData} />
            </Grid>
        </Container>
    )
}

export default OwnerPage