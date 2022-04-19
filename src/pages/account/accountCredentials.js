import Grid from '@mui/material/Grid'

// import AccountContext from '../../common/contexts/accountContext'
import AccountView from './components/accountCredentialsView'
import AccountEdit from './components/accountCredentialsEdit'

const AccountCredentials = (props) => {
    // const ctx = useContext(AccountContext)

    // const btnClicked = (e) => {
    //     ctx.setAccountContext({testVal: 'Home test value from context'})
    // }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {/* <Typography>Account Core Content</Typography> */}
                <AccountView />
                <AccountEdit />
            </Grid>
        </Grid>
    )
}

export default AccountCredentials