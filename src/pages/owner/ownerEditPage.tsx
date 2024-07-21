import { Container, Grid, Divider, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useAppDispatch, useAppSelector} from '../../stores/appStore';
import { setAccountData } from '../../stores/signedInAccountSlice';
import { useNavigate } from 'react-router-dom';
import PrimaryHeader from '../../components/headers/primaryHeader';
import UserEditForm from '../account/userEditForm';
import OwnerService from './ownerService';
import { IAccount } from '../../types/account';

const OwnerEditPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const accountData = useAppSelector(state => state.signedInAccount.accountData)

    const onUpdated = async (user:IAccount|undefined) => {
        if (user) {
            dispatch(setAccountData({accountData: user}))
        }
    }

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Edit My Account'} />
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
                    accountId={accountData?._id}
                    getFunc={OwnerService.getOwner}
                    updateFunc={OwnerService.updateOwner}
                    updated={onUpdated} />
            </Grid>
        </Container>
    )
}

export default OwnerEditPage