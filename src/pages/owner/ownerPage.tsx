import { Container, Grid, Typography, Divider, Box, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector} from '../../stores/appStore';
import UserReadOnlyView from '../user/userReadOnlyView';
import { useNavigate } from 'react-router-dom';

const OwnerPage = () => {
    const navigate = useNavigate()
    const userData = useAppSelector(state => state.signedInUser.userData)

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h5' style={{padding:'10px'}}>
                        <VisibilityIcon /> My Account
                    </Typography>
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