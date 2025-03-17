import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import Stack from '@mui/material/Stack';

const fontStyle = {
    fontWeight: '700',
    fontStyle: 'italic',
    display: 'inline'
}

interface IProps {
    module?: string,
    subModule?: string,
    ref?: string,
    accept?: () => Promise<{} | null>,
    decline?: () => Promise<{} | null>,
}


export default function InvitationView(props: IProps) {

    useEffect(() => {
        console.log('InvitationView mounted')
        return () => {
            console.log('InvitationView unmounted')
        }
    }, [])

  return (
    <Card sx={{ minWidth: 300, padding: '20px' }}>
        <CardContent>
            <Stack direction="row" spacing={2}>
                <LocalPostOfficeIcon sx={{ color: 'text.secondary' }} />
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>Invitation for</Typography>
            </Stack>
            <Typography color="primary" variant="h5">Workspace Level Access</Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                Created on 16th September, 2021
            </Typography>

            <Typography variant="body1" style={{marginBottom: '10px', marginTop: '20px'}}>
                Hello, you are invited to join the workspace
                <Typography variant="body1" sx={fontStyle}> Test Workspace </Typography>
                with a role 
                <Typography variant="body1" sx={fontStyle}> Workspace Admin </Typography>
                under account
                <Typography variant="body1" sx={fontStyle}> Gilbert</Typography>
                . Please accept or decline the invitation.
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Accept</Button>
            <Button size="small">Decline</Button>
        </CardActions>
    </Card>
  );
}