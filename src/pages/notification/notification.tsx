import React, {FC} from "react";
import moment from "moment";
import { Box, Grid, Typography, Button, Checkbox } from "@mui/material"
import Stack from '@mui/material/Stack';
import LaunchIcon from '@mui/icons-material/Launch';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Alert, { AlertColor } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Tooltip from '@mui/material/Tooltip';

import appComponentsHandler from '../../utils/appComponentsHandler'

interface INotificationRow {
    _id: string,
    type: string,
    title: string,
    message: string,
    link: string,
    seen: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    onSeen?: (val:boolean) => void,
    onViewLink?: (link:string) => void
}

const Notification = (props:INotificationRow) => {
    const created = moment(props.createdAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat)
    // const updated = moment(props.updatedAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat)

    return (
        <Alert variant={props.seen? 'outlined':'filled'} severity={props.type as AlertColor} style={{ marginBottom: '10px' }}>
            <AlertTitle>{ props.title }</AlertTitle>
            <Box style={{width: '100%'}}>
                <Typography variant='subtitle1'>{ props.message }</Typography>
                <Stack
                    direction="row"
                    spacing={4}
                    sx={{
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}>
                        <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}>
                        <AccessTimeIcon color="primary" />
                        <Typography color="primary" variant='caption'>{ created }</Typography>
                    </Stack>
                    <Button
                        endIcon={<LaunchIcon />}
                        variant='outlined'
                        size="small"
                        color="primary"
                        onClick={() => {
                            if (props.onViewLink) props.onViewLink(props.link)
                        }}>View Link</Button>
                    {/* <FormControlLabel color="primary" control={<Switch defaultChecked={props.seen} />} label="Seen" /> */}
                    <Tooltip title={ props.seen? 'Seen':'Not Seen' }>
                       <Checkbox
                        color="primary"
                        checked={props.seen}
                        icon={<VisibilityOffIcon />}
                        checkedIcon={<VisibilityIcon />}
                        onChange={() => {
                            if (props.onSeen) props.onSeen(!props.seen)
                        }}/>
                    </Tooltip>
                        
                </Stack>
            </Box>
        </Alert>
    );
};

export default Notification;