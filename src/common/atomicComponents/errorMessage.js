import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import { useTheme } from '@mui/material'

const ErrorMessage = (props) => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                padding: '10px',
                marginTop: '10px',
                textAlign: 'center',
                background: theme.palette.secondary.main + '0a'
            }}>
            <ReportProblemIcon color='secondary' style={{ fontSize: 15, marginRight: 5 }} />
            <Typography variant='body1' component='span' color='secondary'>
                { props.children }
            </Typography>
        </Box>
    )
}

export default ErrorMessage