import { Container, Grid, Divider, Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector} from '../../stores/appStore';
import PrimaryHeader from '../../components/headers/primaryHeader';
import UserReadOnlyView from '../user/userReadOnlyView';
import { useNavigate } from 'react-router-dom';

const OwnerPage = () => {
    const navigate = useNavigate()
    const userData = useAppSelector(state => state.signedInUser.userData)

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={ 'My Account' } subtitle={ userData?.username } />
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
                <UserReadOnlyView user={userData} />
            </Grid>
        </Container>
    )
}

export default OwnerPage