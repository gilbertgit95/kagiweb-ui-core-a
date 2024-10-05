import React from 'react';
import { Button, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

interface IProps {
    text: string,
    link: string,
    disabled?: boolean
}

const SimpleLink = (props:IProps) => {
    const navigate = useNavigate()

    return (
        <Button
            disabled={Boolean(props.disabled)}
            startIcon={<VisibilityIcon />}
            onClick={() => navigate(props.link)}
            variant="text">
                <Typography component="div" variant="caption">
                    { props.text }
                </Typography>
            </Button>
    )
}

export default SimpleLink