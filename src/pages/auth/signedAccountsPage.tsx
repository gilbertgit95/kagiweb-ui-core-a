import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import GroupIcon from '@mui/icons-material/Group';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SignedAccountComponent, { ISignedAccount } from './signedAccountComponent';

const tempAccounts:ISignedAccount[] = [
    {
        nameId: 'gilbertgit95',
        status: 'no-token',
        method: 'app-auth',
        dateCreated: new Date(),
        expirationDate: new Date(),
        token: ''
    },
    {
        nameId: 'Berting101',
        status: 'active-token',
        method: 'app-auth',
        dateCreated: new Date(),
        expirationDate: new Date(),
        token: ''
    },
    {
        nameId: 'aiai94',
        status: 'expired-token',
        method: 'app-auth',
        dateCreated: new Date(),
        expirationDate: new Date(),
        token: ''
    },
    {
        nameId: 'testAcc',
        status: 'no-token',
        method: 'app-auth',
        dateCreated: new Date(),
        expirationDate: new Date(),
        token: ''
    }
]

const SignedAccountsPage = () => {
    const navigate = useNavigate()
    const [pageState, setPageState] = useState<{isLoading:boolean}>({
        isLoading: false
    })

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
                    {tempAccounts.map((acc, index) => (
                        <SignedAccountComponent accountInfo={acc} key={index} />
                    ))}
                </Grid>
                <Box style={{marginTop: 30}}>
                    <Button variant="outlined">
                        <AddOutlinedIcon /> Add Account
                    </Button>
                </Box>
            </Box>

      </Container>
    )
}

export default SignedAccountsPage