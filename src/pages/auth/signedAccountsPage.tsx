import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import GroupIcon from '@mui/icons-material/Group';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SignedAccountComponent, { ISignedAccount } from './signedAccountComponent';
import AuthService from './authService';

const SignedAccountsPage = () => {
    const navigate = useNavigate()
    const [accounts, setAccounts] = useState<ISignedAccount[]>([])

    const mapStatus = (list:ISignedAccount[]):ISignedAccount[] => {
        return list.map(item => {
            // check for token
            if (item.token) {
                // check for expiration
                const now = moment()
                const expDate = moment(item.expirationDate)
                if (now.isAfter(expDate)) {
                    item.status = 'expired-token'
                }
            } else {
                item.status = 'no-token'
            }

            return item
        })
    }

    const onUpdate = () => {
        // fetch accs list
        const list = AuthService.getSignedAccounts()
        setAccounts(mapStatus(list))
    }

    useEffect(() => {
        // fetch accs list
        const list = AuthService.getSignedAccounts()
        setAccounts(mapStatus(list))
    }, [])

    return (
        <Container component="main" maxWidth="md">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <GroupIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Signed Accounts</Typography>
                <Grid container justifyContent="center" spacing={2} style={{marginTop: 10}}>
                    {accounts.map((acc, index) => (
                        acc.nameId? <SignedAccountComponent accountInfo={acc} key={index} onUpdate={onUpdate} />: null
                    ))}
                </Grid>
                <Box style={{marginTop: 30}}>
                    <Button variant="outlined" onClick={() => navigate('/signin?remember=true')}>
                        <AddOutlinedIcon /> Add Account
                    </Button>
                </Box>
            </Box>

      </Container>
    )
}

export default SignedAccountsPage