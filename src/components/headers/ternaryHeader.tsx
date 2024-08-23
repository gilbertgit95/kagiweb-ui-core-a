
import React, { FC } from 'react';
import {Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';

interface Props {
    Icon?: FC,
    title?:string,
    subtitle?:string
}

const TernaryHeader = ({title, subtitle, Icon}:Props) => {
    return (
        <Stack
            direction="column"
            style={{padding:'10px'}}
            alignItems="center"
            spacing={2}>
            { Icon? <Icon />: <VisibilityIcon color="primary" /> }
            <Typography variant='h6' style={{marginTop: 0}}>
                 { title }
            </Typography>
            <Typography color="primary" variant='subtitle2' style={{marginTop: 0}}>
                 { subtitle }
            </Typography>
        </Stack>
    )
}

export default TernaryHeader