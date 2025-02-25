import React, {FC} from "react";
import moment from "moment";
import { Box, Grid, Typography, Button } from "@mui/material"
import Stack from '@mui/material/Stack';
import LaunchIcon from '@mui/icons-material/Launch';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Alert, { AlertColor } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import appComponentsHandler from '../../utils/appComponentsHandler'
import { Link } from "react-router-dom";

interface INotificationRow {
    _id: string,
    type: string,
    title: string,
    message: string,
    link: string,
    seen: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

const Notification = (props:INotificationRow) => {
    const created = moment(props.createdAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat)
    // const updated = moment(props.updatedAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat)

    return (
        <Alert variant={props.seen? 'outlined':'filled'} severity={props.type as AlertColor}>
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
                    <Button endIcon={<LaunchIcon />} variant='outlined' size="small" color="primary">View Link</Button>
                    <FormControlLabel color="primary" control={<Switch defaultChecked={props.seen} />} label="Seen" />
                </Stack>
            </Box>
        </Alert>
    );
};

export default Notification;