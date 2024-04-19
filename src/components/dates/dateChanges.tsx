import moment from 'moment'
import { Typography, Box, Stack, Divider } from '@mui/material'
import Config from '../../config'

export interface IChangeDate {
    createdAt?: Date,
    updatedAt?: Date
}

const DateChanges = (props:IChangeDate) => {
    return (
        <Box sx={{minWidth: 200}}>
            <Stack
                direction="column"
                divider={<Divider orientation="horizontal" flexItem />}
                spacing={1}>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}>
                    <Typography component="div" variant="caption">
                        CREATED
                    </Typography>
                    <Typography component="div" variant="caption" color="primary">
                        { props.createdAt? moment(props.createdAt).format(Config.defaultDateTimeFormat): '' }
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}>
                    <Typography component="div" variant="caption">
                        UPDATED
                    </Typography>
                    <Typography component="div" variant="caption" color="primary">
                        { props.updatedAt? moment(props.updatedAt).format(Config.defaultDateTimeFormat): '' }
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    )
}

export default DateChanges