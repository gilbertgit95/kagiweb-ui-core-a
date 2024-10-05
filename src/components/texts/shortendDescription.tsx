import React from 'react';
import { Typography, Tooltip } from '@mui/material'

interface IProps {
    value: string,
    maxWidth?: number,
    maxHeight?: number
}

const ShortendDescription = (props:IProps) => {
    return (
        <Tooltip title={ props.value }>
            <Typography
                component="div"
                variant="caption"
                sx={{
                    maxWidth: props.maxWidth || 150,
                    maxHeight: props.maxHeight || 40,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                { props.value }
            </Typography>
        </Tooltip>
    )
}

export default ShortendDescription