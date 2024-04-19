import { Typography, Box, Tooltip } from '@mui/material'

interface IProps {
    value: string,
    maxWidth?: number,
    maxHeight?: number
}

const ShortendDescription = (props:IProps) => {
    return (
        <Box sx={{maxWidth: props.maxWidth || 150, maxHeight: props.maxHeight || 30, overflow: 'hidden'}}>
            <Tooltip title={ props.value }>
                <Typography component="div" variant="caption" sx={{lineBreak: 'anywhere'}}>
                    { props.value }
                </Typography>
            </Tooltip>
        </Box>
    )
}

export default ShortendDescription