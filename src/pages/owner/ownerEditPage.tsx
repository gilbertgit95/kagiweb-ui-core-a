import { Container, Grid, Typography, Divider, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useAppDispatch, useAppSelector} from '../../stores/appStore';
import { setUserData } from '../../stores/signedInUserSlice';
import { useNavigate } from 'react-router-dom';

import UserEditForm from '../user/userEditForm';
import OwnerService from './ownerService';
import { IUser } from '../../types/user';

const OwnerEditPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const userData = useAppSelector(state => state.signedInUser.userData)

    const onUpdated = async (user:IUser|undefined) => {
        if (user) {
            dispatch(setUserData({userData: user}))
        }
    }

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h5' style={{padding:'10px'}}>
                        <VisibilityIcon /> Edit My Account
                    </Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="text"
                        startIcon={<ArrowBackIosNewIcon />}
                        onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </Grid>
                <UserEditForm
                    userId={userData?._id}
                    getFunc={OwnerService.getOwner}
                    updateFunc={OwnerService.updateOwner}
                    updated={onUpdated} />
            </Grid>
        </Container>
    )
}

export default OwnerEditPage