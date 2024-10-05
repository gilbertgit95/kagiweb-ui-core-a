import React from 'react';
import moment from 'moment'
import { Typography, Box, Stack, Divider, Tooltip } from '@mui/material'
// import MoreTimeIcon from '@mui/icons-material/MoreTime';
// import UpdateIcon from '@mui/icons-material/Update';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
import appComponentsHandler from '../../utils/appComponentsHandler'

export interface IChangeDate {
    createdAt?: Date,
    updatedAt?: Date
}

const DateChanges = (props:IChangeDate) => {
    return (
        <Box sx={{width: 200}}>
            <Stack
                direction="column"
                // justifyContent="center"
                alignItems="center"
                divider={<Divider orientation="horizontal" flexItem />}
                spacing={1}>
                <Tooltip title="Created">
                    <Typography component="div" variant="caption">
                        { props.createdAt? moment(props.createdAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat): '' }
                    </Typography>
                </Tooltip>
                <Tooltip title="Updated">
                    <Typography component="div" variant="caption" color="primary">
                        { props.updatedAt? moment(props.updatedAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat): '' }
                    </Typography>
                </Tooltip>
            </Stack>
        </Box>
    )
}

export default DateChanges