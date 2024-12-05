import React from 'react';
import moment from 'moment';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import KeyIcon from '@mui/icons-material/Key';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Paper, Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TernaryHeader from '../../components/headers/ternaryHeader';

import appComponentsHandler from '../../utils/appComponentsHandler';
import AuthService from './authService';

export interface ISignedAccount {
    nameId: string,
    status: 'active-token' | 'no-token' | 'expired-token',
    method: 'app-auth' | 'google-auth' | 'microsoft-auth'
    dateCreated?: Date,
    expirationDate?: Date,
    token?: string
}

interface IProps {
    accountInfo:ISignedAccount,
    onUpdate?: () => void
}

const centeredStyle:any = {textAlign: 'center', padding: 10}

const SignedAccountComponent = (props:IProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const sofRemove = async ():Promise<void> => {
        if (!props.accountInfo?.token) {
            // signout
            try {
                await AuthService.rawSignout(props.accountInfo!.token!)
            } catch (err) {
                console.log('Error while trying to signout account')
            }
        }
        // remove token from account info
        AuthService.saveSignedAccount({
            nameId: props.accountInfo?.nameId || '',
            status: 'no-token',
            method: 'app-auth',
            dateCreated: undefined,
            expirationDate: undefined,
            token: undefined
        })

        handleClose()
        if (props.onUpdate) props.onUpdate()
    }

    const hardRemove = async ():Promise<void> => {
        if (!props.accountInfo?.token) {
            // signout
            try {
                await AuthService.rawSignout(props.accountInfo!.token!)
            } catch (err) {
                console.log('Error while trying to signout account')
            }
        }
        // remove account info
        AuthService.removeSignedAccount({
            nameId: props.accountInfo?.nameId || '',
            status: 'no-token',
            method: 'app-auth',
            dateCreated: undefined,
            expirationDate: undefined,
            token: undefined
        })

        handleClose()
        if (props.onUpdate) props.onUpdate()
    }

    const useAccount = async ():Promise<void> => {
        // check token if still usable
        // set acc token to memory
        // check if the token is usable
        // if usable redirec to home
        // if not usable redirect to auth with parameter remember and nameId
        try {
            await AuthService.rawGetAccountCompleteInfo(props.accountInfo.token || '')
        } catch (err) {
            AuthService.saveSignedAccount({
                nameId: props.accountInfo?.nameId || '',
                status: 'no-token',
                method: 'app-auth',
                dateCreated: undefined,
                expirationDate: undefined,
                token: undefined
            })
            window.location.replace('/signin?remember=true&nameId=' + props.accountInfo.nameId)
            return
        }

        localStorage.setItem(appComponentsHandler.appConfig.TokenKey, props.accountInfo.token || '')
        if (props.accountInfo.status === 'active-token') {
            window.location.replace('/')
        } else {
            window.location.replace('/signin?remember=true&nameId=' + props.accountInfo.nameId)
        }

    }

    // const dispatch = useAppDispatch()
    // const token = useAppSelector(state => state.signedInAccount.token)
    // const isSignedIn = useAppSelector(state => state.signedInAccount.isSignedIn)
    const getStatusIcon = (status:string) => {
        switch(status) {
            case 'active-token':
                return KeyIcon
            case 'expired-token':
                return KeyOffIcon
            case 'no-token':
                return DoNotDisturbAltIcon
            default:
                return DoNotDisturbAltIcon
        }
    }

    return (
        <Grid item>
            <Paper style={{minWidth: '189px'}}>
                <Box style={{padding: 5}}>
                    <IconButton
                        aria-label="more"
                        id={ props.accountInfo.nameId + 'long-button'}
                        aria-controls={open ? props.accountInfo.nameId + 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id={ props.accountInfo.nameId + "long-menu" }
                        MenuListProps={{
                            'aria-labelledby': props.accountInfo.nameId + 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}>
                        <MenuItem onClick={sofRemove}>
                            <ListItemIcon>
                                <DeleteOutlinedIcon fontSize="small" color="secondary" />
                            </ListItemIcon>
                            <ListItemText><Typography color="secondary">Soft Remove</Typography></ListItemText>
                        </MenuItem>
                        <MenuItem onClick={hardRemove}>
                            <ListItemIcon>
                                <DeleteForeverOutlinedIcon color="secondary" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText><Typography color="secondary">Hard Remove</Typography></ListItemText>
                        </MenuItem>
                        <MenuItem onClick={useAccount}>
                            <ListItemIcon>
                                <CompareArrowsOutlinedIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText><Typography color="primary">Use Account</Typography></ListItemText>
                        </MenuItem>
                    </Menu>
                </Box>
                <Box style={centeredStyle}>
                    <TernaryHeader
                        Icon={getStatusIcon(props.accountInfo.status)}
                        title={props.accountInfo.nameId}
                        subtitle={props.accountInfo.method} />
                    <Divider />
                    <Box style={centeredStyle}>
                        <Typography style={{fontSize: 10}}>
                            {
                                props.accountInfo.expirationDate? moment(props.accountInfo.expirationDate).format(appComponentsHandler.appConfig.defaultDateTimeFormat): '--'
                            }
                        </Typography>
                        <Typography style={{fontSize: 10}} color="primary">Expiration</Typography>
                    </Box>
                    <Box style={centeredStyle}>
                        <Typography style={{fontSize: 10}}>
                            {
                                props.accountInfo.dateCreated? moment(props.accountInfo.dateCreated).format(appComponentsHandler.appConfig.defaultDateTimeFormat): '--'
                            }
                        </Typography>
                        <Typography style={{fontSize: 10}} color="primary">Created</Typography>
                    </Box>
                </Box>
            </Paper>
        </Grid>
    )
}

export default SignedAccountComponent